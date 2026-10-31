import {
    TUTORIAL_PACKAGE_CACHE_PREFIX,
    TUTORIAL_PACKAGE_VERSION,
} from "../config/cache-policy.js";

const DATABASE_NAME = "hauy-conecta-offline";
const DATABASE_VERSION = 1;
const PACKAGE_STORE = "tutorial-packages";
const DOWNLOAD_CONCURRENCY = 3;

function getLocalImagePath(value) {
    if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
        return null;
    }

    const pathname = value.split(/[?#]/, 1)[0];

    return pathname || null;
}

/**
 * Reúne imagens e pôsteres do tutorial e inclui as variantes responsivas
 * geradas por generate-image-metadata.mjs. Vídeos e URLs externas ficam
 * fora do pacote offline.
 */
export function collectTutorialImageResources(steps, imageMetadata = { images: {} }) {
    const resources = new Set();

    function addImage(value) {
        const path = getLocalImagePath(value);

        if (!path) {
            return;
        }

        resources.add(path);

        const metadata = imageMetadata?.images?.["public" + path];
        const responsive = metadata?.responsive ?? [];

        for (const variant of responsive) {
            const responsivePath = getLocalImagePath(variant?.src);

            if (responsivePath) {
                resources.add(responsivePath);
            }
        }
    }

    for (const step of steps ?? []) {
        addImage(step?.image);
        addImage(step?.poster);

        for (const example of step?.examples ?? []) {
            addImage(example?.image);
            addImage(example?.poster);
        }
    }

    return [...resources].sort();
}

function ensureStorageSupport() {
    if (typeof indexedDB === "undefined" || typeof caches === "undefined") {
        throw new Error("O armazenamento offline não está disponível neste navegador.");
    }
}

function openDatabase() {
    ensureStorageSupport();

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

        request.onupgradeneeded = () => {
            const database = request.result;

            if (!database.objectStoreNames.contains(PACKAGE_STORE)) {
                database.createObjectStore(PACKAGE_STORE, {
                    keyPath: "tutorialId",
                });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(
            request.error ?? new Error("Não foi possível abrir o banco de dados offline."),
        );
        request.onblocked = () => reject(
            new Error("O banco de dados offline está bloqueado por outra aba."),
        );
    });
}

async function getStoredPackage(tutorialId) {
    const database = await openDatabase();

    try {
        return await new Promise((resolve, reject) => {
            const transaction = database.transaction(PACKAGE_STORE, "readonly");
            const request = transaction.objectStore(PACKAGE_STORE).get(tutorialId);

            request.onsuccess = () => resolve(request.result ?? null);
            request.onerror = () => reject(
                request.error ?? new Error("Não foi possível consultar o pacote offline."),
            );
        });
    } finally {
        database.close();
    }
}

async function putStoredPackage(record) {
    const database = await openDatabase();

    try {
        await new Promise((resolve, reject) => {
            const transaction = database.transaction(PACKAGE_STORE, "readwrite");

            transaction.objectStore(PACKAGE_STORE).put(record);

            transaction.oncomplete = resolve;
            transaction.onerror = () => reject(
                transaction.error ?? new Error("Não foi possível salvar os dados do pacote offline."),
            );
            transaction.onabort = () => reject(
                transaction.error ?? new Error("A gravação do pacote offline foi cancelada."),
            );
        });
    } finally {
        database.close();
    }
}

async function deleteStoredPackage(tutorialId) {
    const database = await openDatabase();

    try {
        await new Promise((resolve, reject) => {
            const transaction = database.transaction(PACKAGE_STORE, "readwrite");

            transaction.objectStore(PACKAGE_STORE).delete(tutorialId);

            transaction.oncomplete = resolve;
            transaction.onerror = () => reject(
                transaction.error ?? new Error("Não foi possível remover o pacote offline."),
            );
            transaction.onabort = () => reject(
                transaction.error ?? new Error("A remoção do pacote offline foi cancelada."),
            );
        });
    } finally {
        database.close();
    }
}

/**
 * Retorna o estado real do pacote. O registro do IndexedDB sozinho não
 * basta: os arquivos também precisam continuar no Cache Storage.
 */
export async function getTutorialOfflinePackage(tutorialId) {
    const record = await getStoredPackage(tutorialId);

    if (!record) {
        return null;
    }

    if (!(await caches.has(record.cacheName))) {
        return { ...record, status: "incomplete" };
    }

    const cache = await caches.open(record.cacheName);
    const missingResources = [];

    for (const resource of record.resources ?? []) {
        if (!(await cache.match(resource))) {
            missingResources.push(resource);
        }
    }

    return {
        ...record,
        status: missingResources.length === 0 ? "saved" : "incomplete",
        missingResources,
    };
}

function createPackageCacheName(tutorialId) {
    const safeId = String(tutorialId).replace(/[^a-zA-Z0-9_-]/g, "-");
    const uniqueId = typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()) + "-" + String(Math.random()).slice(2);

    return TUTORIAL_PACKAGE_CACHE_PREFIX + safeId + "-" + uniqueId;
}

function createAbortError() {
    return new DOMException("O download do tutorial foi cancelado.", "AbortError");
}

/**
 * Baixa todas as imagens/pôsteres do pacote com concorrência limitada.
 * O pacote só é marcado como salvo depois que todos os recursos e os
 * metadados forem persistidos. Falhas removem o cache temporário.
 */
export async function saveTutorialOffline({
    tutorialId,
    title,
    steps,
    imageMetadata,
    onProgress,
    signal,
}) {
    if (!tutorialId) {
        throw new Error("O identificador do tutorial é obrigatório.");
    }

    if (typeof window === "undefined" || !window.location?.origin) {
        throw new Error("O download offline precisa ser iniciado em uma página do aplicativo.");
    }

    if (!navigator.onLine) {
        throw new Error("Conecte-se à internet para salvar este tutorial.");
    }

    ensureStorageSupport();

    const resourcePaths = collectTutorialImageResources(steps, imageMetadata);
    const origin = window.location.origin;
    const resources = resourcePaths.map((path) => new URL(path, origin).href);

    const previousRecord = await getStoredPackage(tutorialId);
    const cacheName = createPackageCacheName(tutorialId);
    const packageCache = await caches.open(cacheName);
    const controller = new AbortController();
    const abortFromCaller = () => controller.abort();

    if (signal?.aborted) {
        controller.abort();
    } else {
        signal?.addEventListener("abort", abortFromCaller, { once: true });
    }

    let nextIndex = 0;
    let completed = 0;
    let firstError = null;

    onProgress?.({ completed, total: resources.length });

    async function worker() {
        while (!firstError && !controller.signal.aborted) {
            const index = nextIndex;
            nextIndex += 1;

            if (index >= resources.length) {
                return;
            }

            const resource = resources[index];

            try {
                const response = await fetch(resource, {
                    cache: "reload",
                    signal: controller.signal,
                });

                const contentType = response.headers.get("content-type") ?? "";

                if (!response.ok || !contentType.toLowerCase().startsWith("image/")) {
                    throw new Error("Não foi possível baixar uma imagem necessária do tutorial.");
                }

                await packageCache.put(resource, response.clone());

                completed += 1;
                onProgress?.({ completed, total: resources.length });
            } catch (error) {
                if (!firstError) {
                    firstError = error;
                }

                controller.abort();
                return;
            }
        }
    }

    try {
        const workers = Array.from(
            { length: Math.min(DOWNLOAD_CONCURRENCY, Math.max(resources.length, 1)) },
            () => worker(),
        );

        await Promise.allSettled(workers);

        if (firstError) {
            throw firstError;
        }

        if (controller.signal.aborted) {
            throw createAbortError();
        }

        const record = {
            tutorialId,
            title,
            cacheName,
            resources,
            version: TUTORIAL_PACKAGE_VERSION,
            savedAt: Date.now(),
        };

        await putStoredPackage(record);

        if (previousRecord?.cacheName && previousRecord.cacheName !== cacheName) {
            await caches.delete(previousRecord.cacheName).catch(() => false);
        }

        return record;
    } catch (error) {
        await caches.delete(cacheName);

        if (controller.signal.aborted && error?.name !== "AbortError") {
            throw createAbortError();
        }

        throw error;
    } finally {
        signal?.removeEventListener("abort", abortFromCaller);
    }
}

export async function removeTutorialOffline(tutorialId) {
    const record = await getStoredPackage(tutorialId);

    if (record?.cacheName) {
        await caches.delete(record.cacheName);
    }

    await deleteStoredPackage(tutorialId);
}
