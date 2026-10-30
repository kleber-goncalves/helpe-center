import { setCacheNameDetails } from "workbox-core";
import {
    matchPrecache,
    precacheAndRoute,
} from "workbox-precaching";
import { registerRoute } from "workbox-routing";

import { APP_SHELL_CACHE_VERSION } from "../config/cache-policy.js";

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
