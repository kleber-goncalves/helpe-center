import process from "node:process";

import { questionSchema } from "../src/schemas/questionSchema.js";

const MAX_BODY_BYTES = 10000;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const RATE_LIMIT_MAX_REQUESTS = 20;

/*
 * Rate limit de melhor esforço.
 *
 * Em funções serverless, a memória pode ser
 * reiniciada entre execuções ou variar por instância.
 *
 * Portanto isso não substitui um rate limiter
 * distribuído, mas adiciona uma camada útil.
 */
const rateLimitStore = new Map();

/* =========================================================
   JSON RESPONSE
========================================================= */

function jsonResponse(body, status = 200) {
    return Response.json(body, {
        status,
        headers: {
            "Cache-Control": "no-store",

            "X-Content-Type-Options": "nosniff",
        },
    });
}

/* =========================================================
   IP
========================================================= */

function getClientIp(request) {
    const forwarded = request.headers.get("x-forwarded-for");

    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    return request.headers.get("x-real-ip") || "unknown";
}

/* =========================================================
   RATE LIMIT
========================================================= */

function cleanupRateLimitStore() {
    const now = Date.now();

    for (const [ip, entry] of rateLimitStore) {
        if (now >= entry.resetAt) {
            rateLimitStore.delete(ip);
        }
    }
}

function isRateLimited(ip) {
    const now = Date.now();

    const current = rateLimitStore.get(ip);

    if (!current) {
        rateLimitStore.set(ip, {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW_MS,
        });

        return false;
    }

    if (now >= current.resetAt) {
        rateLimitStore.set(ip, {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW_MS,
        });

        return false;
    }

    if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
        return true;
    }

    current.count += 1;

    return false;
}

/* =========================================================
   ORIGIN
========================================================= */

function isAllowedOrigin(request) {
    const origin = request.headers.get("origin");

    /*
     * Alguns clientes podem não enviar Origin.
     */
    if (!origin) {
        return true;
    }

    const requestOrigin = new URL(request.url).origin;

    return origin === requestOrigin;
}

/* =========================================================
   POST
========================================================= */

export async function POST(request) {
    cleanupRateLimitStore();

    /* =====================================================
       ORIGIN
    ====================================================== */

    if (!isAllowedOrigin(request)) {
        return jsonResponse(
            {
                ok: false,

                message: "Origem da requisição não autorizada.",
            },
            403,
        );
    }

    /* =====================================================
       ENV
    ====================================================== */

    const appsScriptEndpoint = process.env.SUPPORT_APPS_SCRIPT_ENDPOINT;

    if (!appsScriptEndpoint) {
        console.error("[Hauy Conecta] SUPPORT_APPS_SCRIPT_ENDPOINT não configurado.");

        return jsonResponse(
            {
                ok: false,

                message: "O serviço de atendimento não está configurado.",
            },
            500,
        );
    }

    /* =====================================================
       BODY
    ====================================================== */

    let rawBody;

    try {
        rawBody = await request.text();
    } catch {
        return jsonResponse(
            {
                ok: false,

                message: "Não foi possível ler os dados enviados.",
            },
            400,
        );
    }

    const bodyBytes = new TextEncoder().encode(rawBody).byteLength;

    if (bodyBytes > MAX_BODY_BYTES) {
        return jsonResponse(
            {
                ok: false,

                message: "A requisição excede o tamanho permitido.",
            },
            413,
        );
    }

    /* =====================================================
       FORM DATA
    ====================================================== */

    const params = new URLSearchParams(rawBody);

    /* =====================================================
       HONEYPOT
    ====================================================== */

    const website = params.get("website")?.trim() || "";

    if (website) {
        return jsonResponse({
            ok: true,
        });
    }

    /* =====================================================
       DATA
    ====================================================== */

    const formData = {
        category: params.get("category") || "",

        message: params.get("message") || "",

        name: params.get("name") || "",

        contact: params.get("contact") || "",

        device: params.get("device") || "",
    };

    /* =====================================================
       ZOD
    ====================================================== */

    const result = questionSchema.safeParse(formData);

    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;

        return jsonResponse(
            {
                ok: false,

                message: "Confira os campos preenchidos.",

                fieldErrors,
            },
            400,
        );
    }

    const validData = result.data;

    /* =====================================================
       RATE LIMIT
    ====================================================== */

    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
        return jsonResponse(
            {
                ok: false,

                message: "Muitas tentativas de envio. Aguarde alguns minutos e tente novamente.",
            },
            429,
        );
    }

    /* =====================================================
       APPS SCRIPT BODY
    ====================================================== */

    const appsScriptBody = new URLSearchParams();

    appsScriptBody.set("category", validData.category);

    appsScriptBody.set("message", validData.message);

    appsScriptBody.set("name", validData.name);

    appsScriptBody.set("contact", validData.contact);

    appsScriptBody.set("device", validData.device);

    /*
     * Honeypot vazio.
     */
    appsScriptBody.set("website", "");

    /* =====================================================
       APPS SCRIPT REQUEST
    ====================================================== */

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 10000);

    let appsScriptResponse;

    try {
        appsScriptResponse = await fetch(appsScriptEndpoint, {
            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",

                Accept: "text/plain",
            },

            body: appsScriptBody.toString(),

            redirect: "follow",

            signal: controller.signal,
        });
    } catch (error) {
        if (error?.name === "AbortError") {
            return jsonResponse(
                {
                    ok: false,

                    message: "O serviço de atendimento demorou mais que o esperado.",
                },
                504,
            );
        }

        console.error("[Hauy Conecta] Erro ao comunicar com Apps Script:", error?.message);

        return jsonResponse(
            {
                ok: false,

                message: "Não foi possível comunicar com o serviço de atendimento.",
            },
            502,
        );
    } finally {
        clearTimeout(timeoutId);
    }

    /* =====================================================
       APPS SCRIPT RESPONSE
    ====================================================== */

    let responseText;

    try {
        responseText = (await appsScriptResponse.text()).trim();
    } catch {
        return jsonResponse(
            {
                ok: false,

                message: "O serviço de atendimento retornou uma resposta inválida.",
            },
            502,
        );
    }

    /* =====================================================
       CONFIRM SUCCESS
    ====================================================== */

    const accepted = appsScriptResponse.ok && (responseText === "Dúvida gravada com sucesso." || responseText === "OK");

    if (!accepted) {
        console.error("[Hauy Conecta] Apps Script rejeitou a solicitação.", {
            status: appsScriptResponse.status,
        });

        return jsonResponse(
            {
                ok: false,

                message: "Não foi possível registrar sua dúvida. Tente novamente.",
            },
            502,
        );
    }

    /* =====================================================
       SUCCESS
    ====================================================== */

    return jsonResponse({
        ok: true,
    });
}
