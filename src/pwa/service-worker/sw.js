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

async function findTutorialPackageImage(request) {
    const cacheNames = (await caches.keys()).filter((cacheName) =>
        cacheName.startsWith(TUTORIAL_PACKAGE_CACHE_PREFIX),
    );

    for (const cacheName of cacheNames) {
        const packageCache = await caches.open(cacheName);
        const cachedResponse = await packageCache.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }
    }

    return null;
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
        const packageResponse = await findTutorialPackageImage(request);

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

async function cleanupOldAppShellCaches() {
    const cacheNames = await caches.keys();

    await Promise.all(
        cacheNames
            .filter(
                (cacheName) =>
                    cacheName.startsWith("hauy-conecta-app-shell-") &&
                    cacheName !== CURRENT_PRECACHE_CACHE_NAME,
            )
            .map((cacheName) => caches.delete(cacheName)),
    );
}

self.addEventListener("activate", (event) => {
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            cleanupOldAppShellCaches(),
        ]),
    );
});
