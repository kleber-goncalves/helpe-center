/**
 * Remove somente caches antigos do app shell.
 *
 * Os caches de pacotes dos tutoriais e o cache runtime possuem namespaces
 * diferentes e nunca devem ser removidos durante a ativação do Service Worker.
 */
export async function cleanupOldAppShellCaches(
    cacheStorage,
    currentCacheName,
    cachePrefix = "hauy-conecta-app-shell-",
) {
    let cacheNames;

    try {
        cacheNames = await cacheStorage.keys();
    } catch {
        // Uma falha de limpeza não deve impedir a ativação da nova versão.
        return [];
    }

    const oldAppShellCaches = cacheNames.filter(
        (cacheName) =>
            cacheName.startsWith(cachePrefix) &&
            cacheName !== currentCacheName,
    );

    const results = await Promise.allSettled(
        oldAppShellCaches.map((cacheName) => cacheStorage.delete(cacheName)),
    );

    return oldAppShellCaches.filter((_, index) =>
        results[index].status === "fulfilled" && results[index].value,
    );
}
