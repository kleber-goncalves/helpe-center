import { setCacheNameDetails } from "workbox-core";
import {
    matchPrecache,
    precacheAndRoute,
} from "workbox-precaching";
import { registerRoute } from "workbox-routing";

import {
    APP_SHELL_CACHE_VERSION,
    MAX_RUNTIME_IMAGE_CACHE_ENTRIES,
    RUNTIME_IMAGE_CACHE_NAME,
    TUTORIAL_PACKAGE_CACHE_PREFIX,
} from "../config/cache-policy.js";
import { cleanupOldAppShellCaches } from "./cache-cleanup.js";

setCacheNameDetails({
    prefix: "hauy-conecta",
    precache: "app-shell",
    runtime: "runtime",
    suffix: APP_SHELL_CACHE_VERSION,
});

/**
 * O Workbox injeta aqui os arquivos JS, CSS, HTML e ícones selecionados
 * pelo vite-plugin-pwa durante o build.
 */
precacheAndRoute(self.__WB_MANIFEST);

/*
 * =========================================================
 * CACHE DE IMAGENS GERAIS
 * =========================================================
 *
 * Imagens locais são armazenadas na primeira solicitação. Em visitas
 * seguintes, o cache permite continuar exibindo o recurso offline.
 * Recursos de pacotes de tutoriais têm prioridade sobre esse cache.
 */

async function findTutorialPackageResource(request) {
    const cacheNames = (await caches.keys()).filter((cacheName) =>
        cacheName.startsWith(TUTORIAL_PACKAGE_CACHE_PREFIX),
    );

    for (const cacheName of cacheNames) {
        const packageCache = await caches.open(cacheName);
        const cachedResponse = await packageCache.match(request.url);

        if (cachedResponse) {
            return cachedResponse;
        }
    }

    return null;
}

/**
 * Interpreta uma faixa de bytes única, incluindo sufixos (bytes=-N).
 * Intervalos inválidos ou fora do arquivo são tratados como não satisfatíveis.
 */
function parseByteRange(rangeHeader, size) {
    const match = /^bytes=(\d*)-(\d*)$/i.exec(rangeHeader ?? "");

    if (!match || size <= 0 || (!match[1] && !match[2])) {
        return null;
    }

    let start;
    let end;

    if (!match[1]) {
        const suffixLength = Number(match[2]);

        if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) {
            return null;
        }

        start = Math.max(size - suffixLength, 0);
        end = size - 1;
    } else {
        start = Number(match[1]);
        end = match[2] ? Number(match[2]) : size - 1;

        if (
            !Number.isSafeInteger(start) ||
            !Number.isSafeInteger(end) ||
            start < 0 ||
            end < start ||
            start >= size
        ) {
            return null;
        }

        end = Math.min(end, size - 1);
    }

    return { start, end };
}

/**
 * Entrega a resposta MP4 completa ou reconstrói HTTP 206 para Range.
 * Cache Storage guarda o arquivo completo; o player recebe apenas a faixa pedida.
 */
async function createVideoResponse(request, cachedResponse) {
    const headers = new Headers(cachedResponse.headers);
    headers.set("Accept-Ranges", "bytes");

    if (request.method === "HEAD") {
        return new Response(null, {
            status: cachedResponse.status,
            statusText: cachedResponse.statusText,
            headers,
        });
    }

    const rangeHeader = request.headers.get("range");

    if (!rangeHeader) {
        return new Response(cachedResponse.body, {
            status: cachedResponse.status,
            statusText: cachedResponse.statusText,
            headers,
        });
    }

    const blob = await cachedResponse.blob();
    const range = parseByteRange(rangeHeader, blob.size);

    if (!range) {
        headers.set("Content-Range", "bytes */" + blob.size);
        headers.set("Content-Length", "0");

        return new Response(null, { status: 416, headers });
    }

    const { start, end } = range;
    const partialBody = blob.slice(start, end + 1, blob.type);

    headers.set("Content-Length", String(partialBody.size));
    headers.set("Content-Range", "bytes " + start + "-" + end + "/" + blob.size);

    return new Response(partialBody, {
        status: 206,
        statusText: "Partial Content",
        headers,
    });
}

async function trimRuntimeImageCache(cache) {
    const requests = await cache.keys();
    const excess = requests.length - MAX_RUNTIME_IMAGE_CACHE_ENTRIES;

    if (excess <= 0) {
        return;
    }

    await Promise.all(
        requests
            .slice(0, excess)
            .map((request) => cache.delete(request)),
    );
}

async function storeRuntimeImage(cache, request, response) {
    if (!response?.ok) {
        return;
    }

    try {
        await cache.put(request, response.clone());
        await trimRuntimeImageCache(cache);
    } catch {
        // Falha de armazenamento não deve impedir a exibição da imagem.
    }
}

async function handleImageRequest({ request, event }) {
    const isExplicitDownload = request.cache === "reload";

    if (!isExplicitDownload) {
        const packageResponse = await findTutorialPackageResource(request);

        if (packageResponse) {
            return packageResponse;
        }

        const runtimeCache = await caches.open(RUNTIME_IMAGE_CACHE_NAME);
        const cachedResponse = await runtimeCache.match(request);

        if (cachedResponse) {
            event.waitUntil(
                fetch(request)
                    .then((response) =>
                        storeRuntimeImage(runtimeCache, request, response),
                    )
                    .catch(() => undefined),
            );

            return cachedResponse;
        }
    }

    try {
        const response = await fetch(request);

        if (!isExplicitDownload && response.ok) {
            const runtimeCache = await caches.open(RUNTIME_IMAGE_CACHE_NAME);
            await storeRuntimeImage(runtimeCache, request, response);
        }

        return response;
    } catch {
        if (isExplicitDownload) {
            return Response.error();
        }

        const runtimeCache = await caches.open(RUNTIME_IMAGE_CACHE_NAME);
        const cachedResponse = await runtimeCache.match(request);

        return cachedResponse ?? Response.error();
    }
}

registerRoute(
    ({ request, url }) =>
        request.destination === "image" &&
        url.origin === self.location.origin,
    handleImageRequest,
);

/*
 * =========================================================
 * VÍDEOS MP4 DOS PACOTES OFFLINE
 * =========================================================
 *
 * Somente arquivos explicitamente baixados são entregues pelo Cache Storage.
 * Downloads explícitos (cache: "reload") ignoram o pacote anterior.
 */

async function handleVideoRequest({ request }) {
    const isExplicitDownload = request.cache === "reload";

    if (!isExplicitDownload) {
        const packageResponse = await findTutorialPackageResource(request);

        if (packageResponse) {
            return createVideoResponse(request, packageResponse);
        }
    }

    try {
        return await fetch(request);
    } catch {
        return Response.error();
    }
}

registerRoute(
    ({ request, url }) =>
        (request.method === "GET" || request.method === "HEAD") &&
        url.origin === self.location.origin &&
        url.pathname.toLowerCase().endsWith(".mp4"),
    handleVideoRequest,
);

/*
 * =========================================================
 * NAVEGAÇÃO OFFLINE
 * =========================================================
 */

/**
 * Mantém as páginas pré-renderizadas quando existe internet.
 * Quando a rede falha, usa o app shell precacheado para o React Router
 * resolver a rota localmente. O fallback estático é a última alternativa.
 */
async function handleNavigation({ request }) {
    try {
        return await fetch(request);
    } catch {
        const appShell = await matchPrecache("/index.html");

        if (appShell) {
            return appShell;
        }

        const offlineFallback = await matchPrecache("/offline.html");

        return offlineFallback ?? Response.error();
    }
}

registerRoute(
    ({ request, url }) =>
        request.mode === "navigate" &&
        url.origin === self.location.origin &&
        !url.pathname.startsWith("/api/"),
    handleNavigation,
);

/**
 * O modo de atualização é prompt: só ativa a versão nova quando a pessoa
 * confirma a atualização na interface.
 */
self.addEventListener("message", (event) => {
    if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

const CURRENT_PRECACHE_CACHE_NAME = [
    "hauy-conecta",
    "app-shell",
    APP_SHELL_CACHE_VERSION,
].join("-");

self.addEventListener("activate", (event) => {
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            cleanupOldAppShellCaches(caches, CURRENT_PRECACHE_CACHE_NAME),
        ]),
    );
});
