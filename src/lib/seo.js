/**
 * Funções reutilizáveis para controlar o SEO das páginas
 * em uma aplicação React com React Router.
 *
 * O arquivo permite:
 * - alterar o <title>
 * - alterar/criar meta description
 * - alterar/criar Open Graph
 * - alterar/criar Twitter Cards
 * - alterar/criar canonical
 * - alterar/criar JSON-LD
 *
 * As funções também preservam o valor original do index.html
 * para que ele possa ser restaurado quando a página desmontar.
 */

export const SITE_NAME = "Hauy Conecta";
export const SITE_URL = "https://hauy-conecta.vercel.app";
export const DEFAULT_DESCRIPTION = "Hauy Conecta — Central de Ajuda Digital da Escola Estadual Hauy Petrucely Mayrink.";


const ORIGINAL_VALUES = new Map();

/* ---------------------------------------------------------
 * TITLE
 * --------------------------------------------------------- */

let originalTitle = null;

export function setPageTitle(title) {
    if (originalTitle === null) {
        originalTitle = document.title;
    }

    document.title = title;
}

export function removePageTitle() {
    if (originalTitle !== null) {
        document.title = originalTitle;
        originalTitle = null;
    }
}

/* ---------------------------------------------------------
 * META TAG
 * --------------------------------------------------------- */

/**
 * Cria ou atualiza:
 *
 * <meta name="..." content="..." />
 */
export function setMetaTag(name, content) {
    if (!name) return;

    const key = `meta:name:${name}`;

    let meta = document.querySelector(`meta[name="${escapeSelector(name)}"]`);

    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);

        ORIGINAL_VALUES.set(key, {
            element: meta,
            existed: false,
            content: null,
        });
    } else {
        if (!ORIGINAL_VALUES.has(key)) {
            ORIGINAL_VALUES.set(key, {
                element: meta,
                existed: true,
                content: meta.getAttribute("content"),
            });
        }
    }

    meta.setAttribute("content", content ?? "");
}

/**
 * Restaura o meta tag original.
 */
export function removeMetaTag(name) {
    if (!name) return;

    const key = `meta:name:${name}`;
    const original = ORIGINAL_VALUES.get(key);

    if (!original) return;

    if (!original.existed) {
        original.element?.remove();
    } else {
        original.element?.setAttribute("content", original.content ?? "");
    }

    ORIGINAL_VALUES.delete(key);
}

/* ---------------------------------------------------------
 * META PROPERTY
 * --------------------------------------------------------- */

/**
 * Cria ou atualiza:
 *
 * <meta property="og:title" content="..." />
 */
export function setMetaProperty(property, content) {
    if (!property) return;

    const key = `meta:property:${property}`;

    let meta = document.querySelector(`meta[property="${escapeSelector(property)}"]`);

    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);

        ORIGINAL_VALUES.set(key, {
            element: meta,
            existed: false,
            content: null,
        });
    } else {
        if (!ORIGINAL_VALUES.has(key)) {
            ORIGINAL_VALUES.set(key, {
                element: meta,
                existed: true,
                content: meta.getAttribute("content"),
            });
        }
    }

    meta.setAttribute("content", content ?? "");
}

/**
 * Restaura o meta property original.
 */
export function removeMetaProperty(property) {
    if (!property) return;

    const key = `meta:property:${property}`;
    const original = ORIGINAL_VALUES.get(key);

    if (!original) return;

    if (!original.existed) {
        original.element?.remove();
    } else {
        original.element?.setAttribute("content", original.content ?? "");
    }

    ORIGINAL_VALUES.delete(key);
}

/* ---------------------------------------------------------
 * CANONICAL
 * --------------------------------------------------------- */

/**
 * Cria ou atualiza:
 *
 * <link rel="canonical" href="..." />
 */
export function setCanonical(url) {
    const key = "link:canonical";

    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);

        ORIGINAL_VALUES.set(key, {
            element: canonical,
            existed: false,
            href: null,
        });
    } else {
        if (!ORIGINAL_VALUES.has(key)) {
            ORIGINAL_VALUES.set(key, {
                element: canonical,
                existed: true,
                href: canonical.getAttribute("href"),
            });
        }
    }

    canonical.setAttribute("href", url ?? "");
}

/**
 * Restaura o canonical original.
 */
export function removeCanonical() {
    const key = "link:canonical";
    const original = ORIGINAL_VALUES.get(key);

    if (!original) return;

    if (!original.existed) {
        original.element?.remove();
    } else {
        original.element?.setAttribute("href", original.href ?? "");
    }

    ORIGINAL_VALUES.delete(key);
}

/* ---------------------------------------------------------
 * JSON-LD
 * --------------------------------------------------------- */

const JSON_LD_ID = "hauy-conecta-seo-jsonld";

/**
 * Cria ou atualiza um JSON-LD do Schema.org.
 */
export function setJsonLd(data) {
    if (!data) return;

    const key = "script:jsonld";

    let script = document.getElementById(JSON_LD_ID);

    if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = JSON_LD_ID;

        document.head.appendChild(script);

        ORIGINAL_VALUES.set(key, {
            element: script,
            existed: false,
            textContent: null,
            type: null,
            id: null,
        });
    } else {
        if (!ORIGINAL_VALUES.has(key)) {
            ORIGINAL_VALUES.set(key, {
                element: script,
                existed: true,
                textContent: script.textContent,
                type: script.getAttribute("type"),
                id: script.getAttribute("id"),
            });
        }
    }

    script.textContent = JSON.stringify(data);
}

/**
 * Restaura o JSON-LD original.
 */
export function removeJsonLd() {
    const key = "script:jsonld";
    const original = ORIGINAL_VALUES.get(key);

    if (!original) return;

    if (!original.existed) {
        original.element?.remove();
    } else {
        original.element?.setAttribute("type", original.type ?? "application/ld+json");

        original.element?.setAttribute("id", original.id ?? JSON_LD_ID);

        original.element.textContent = original.textContent ?? "";
    }

    ORIGINAL_VALUES.delete(key);
}

/* ---------------------------------------------------------
 * UTILITÁRIO
 * --------------------------------------------------------- */

/**
 * Evita problemas ao montar seletores CSS com valores
 * contendo caracteres especiais.
 */
function escapeSelector(value) {
    if (typeof CSS !== "undefined" && CSS.escape) {
        return CSS.escape(value);
    }

    return String(value).replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1");
}
