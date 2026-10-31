import {
    TUTORIAL_PACKAGE_CACHE_PREFIX,
    TUTORIAL_PACKAGE_VERSION,
} from "../config/cache-policy.js";

const DATABASE_NAME = "hauy-conecta-offline";
const DATABASE_VERSION = 1;
const PACKAGE_STORE = "tutorial-packages";
const DOWNLOAD_CONCURRENCY = 2;

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

/**
 * Reúne somente vídeos MP4 locais vinculados aos passos e exemplos.
 * URLs externas não são incluídas no pacote offline.
 */
export function collectTutorialVideoResources(steps) {
    const resources = new Set();

    function addVideo(value) {
        if (
            typeof value !== "string" ||
            !value.startsWith("/") ||
            value.startsWith("//")
        ) {
            return;
        }

        const pathname = value.split(/[?#]/, 1)[0];

        if (pathname.toLowerCase().endsWith(".mp4")) {
            resources.add(pathname);
        }
    }

    for (const step of steps ?? []) {
        addVideo(step?.video);

        for (const example of step?.examples ?? []) {
            addVideo(example?.video);
        }
    }

    return [...resources].sort();
}

/**
 * Soma os tamanhos conhecidos pelo catálogo de mídia gerado no build.
 */
export function estimateTutorialVideoSize(videoPaths, videoMetadata = {}) {
    return (videoPaths ?? []).reduce(
        (estimate, path) => {
            const size = videoMetadata?.[path]?.size;

            if (Number.isFinite(size) && size >= 0) {
                estimate.knownBytes += size;
            } else {
                estimate.unknownCount += 1;
            }

            return estimate;
        },
        { knownBytes: 0, unknownCount: 0 },
    );
}

export function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) {
        return "0 B";
    }

    const units = ["B", "KiB", "MiB", "GiB"];
    const unitIndex = Math.min(
        Math.floor(Math.log(bytes) / Math.log(1024)),
        units.length - 1,
    );
    const value = bytes / (1024 ** unitIndex);

    return new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 1,
    }).format(value) + " " + units[unitIndex];
}

function serializeVersionValue(value) {
    if (
        value === null ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
    ) {
        return JSON.stringify(value);
    }

    if (typeof value === "undefined" || typeof value === "function") {
        return "null";
    }

    if (Array.isArray(value)) {
        return "[" + value.map(serializeVersionValue).join(",") + "]";
    }

    if (typeof value === "object") {
        const keys = Object.keys(value)
            .filter((key) => typeof value[key] !== "function" && typeof value[key] !== "undefined")
            .sort();

        return "{" + keys.map((key) =>
            JSON.stringify(key) + ":" + serializeVersionValue(value[key]),
        ).join(",") + "}";
    }

    return JSON.stringify(String(value));
}

/**
 * Fingerprint determinístico para identificar alterações no conteúdo salvo.
 * Não é usado como mecanismo criptográfico de integridade.
 */
function createVersionFingerprint(value) {
    let hash = 0xcbf29ce484222325n;

    for (let index = 0; index < value.length; index += 1) {
        hash ^= BigInt(value.charCodeAt(index));
        hash = BigInt.asUintN(64, hash * 0x100000001b3n);
    }

    return hash.toString(16).padStart(16, "0");
}

/**
 * Calcula versões separadas para conteúdo/imagens e vídeos opcionais.
 * Assim, um vídeo novo não torna desatualizado um pacote que nunca incluiu vídeos.
 */
export function createTutorialContentVersions({
    tutorial,
    steps,
    imageMetadata = { images: {} },
    videoMetadata = {},
}) {
    const contentSteps = (steps ?? []).map((step) => {
        const stepContent = { ...(step ?? {}) };

        delete stepContent.video;
        stepContent.examples = (stepContent.examples ?? []).map((example) => {
            const exampleContent = { ...(example ?? {}) };

            delete exampleContent.video;

            return exampleContent;
        });

        return stepContent;
    });
    const imagePaths = collectTutorialImageResources(steps, imageMetadata);
    const videoPaths = collectTutorialVideoResources(steps);
    const tutorialContent = { ...(tutorial ?? {}) };

    delete tutorialContent.icon;
    delete tutorialContent.steps;

    const imageDetails = imagePaths.map((path) => {
        const metadata = imageMetadata?.images?.["public" + path];

        return {
            path,
            size: metadata?.size ?? null,
            width: metadata?.width ?? null,
            height: metadata?.height ?? null,
            format: metadata?.format ?? null,
            responsive: (metadata?.responsive ?? []).map((variant) => ({
                src: variant?.src ?? null,
                width: variant?.width ?? null,
            })),
        };
    });

    const videoDetails = videoPaths.map((path) => ({
        path,
        size: videoMetadata?.[path]?.size ?? null,
    }));

    const contentVersion = createVersionFingerprint(
        serializeVersionValue({
            packageVersion: TUTORIAL_PACKAGE_VERSION,
            tutorial: tutorialContent,
            steps: contentSteps,
            images: imageDetails,
        }),
    );

    const videoContentVersion = createVersionFingerprint(
        serializeVersionValue({
            packageVersion: TUTORIAL_PACKAGE_VERSION,
            tutorialId: tutorial?.id ?? null,
            videos: videoDetails,
        }),
    );

    return { contentVersion, videoContentVersion };
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
/**
 * Confere o estado real do pacote. A existência do registro no IndexedDB
 * não basta: cada resposta também precisa continuar íntegra no Cache Storage.
 */
/**
 * Valida a resposta que representa um recurso salvo no Cache Storage.
 * Para vídeos, compara o Content-Length quando o navegador o disponibiliza.
 */
export function isValidCachedTutorialResource(
    response,
    details,
    resourceType = details?.type ?? "image",
) {
    if (!response || response.status !== 200 || !response.body) {
        return false;
    }

    const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
    const hasValidContentType = resourceType === "video"
        ? contentType.startsWith("video/") || contentType === "application/octet-stream"
        : contentType.startsWith("image/");

    if (!hasValidContentType) {
        return false;
    }

    if (details && (!Number.isFinite(details.size) || details.size <= 0)) {
        return false;
    }

    if (resourceType === "video" && details?.size) {
        const contentLengthHeader = response.headers.get("content-length");

        if (
            contentLengthHeader &&
            Number(contentLengthHeader) !== details.size
        ) {
            return false;
        }
    }

    return true;
}

export async function getTutorialOfflinePackage(tutorialId, contentVersions = {}) {
    const record = await getStoredPackage(tutorialId);

    if (!record) {
        return null;
    }

    const resources = record.resources ?? [];
    const missingResources = [];
    const invalidResources = [];
    const isContentOutdated = Boolean(contentVersions.contentVersion) &&
        record.contentVersion !== contentVersions.contentVersion;
    const isVideoContentOutdated = Boolean(record.videos?.length) &&
        Boolean(contentVersions.videoContentVersion) &&
        record.videoContentVersion !== contentVersions.videoContentVersion;
    const isOutdated = isContentOutdated || isVideoContentOutdated;

    if (!record.cacheName || !(await caches.has(record.cacheName))) {
        return {
            ...record,
            status: "incomplete",
            missingResources: [...resources],
            invalidResources,
            isOutdated,
        };
    }

    const cache = await caches.open(record.cacheName);
    const resourceDetails = new Map(
        (record.resourceDetails ?? []).map((resource) => [resource.url, resource]),
    );

    for (const resource of resources) {
        const response = await cache.match(resource);

        if (!response) {
            missingResources.push(resource);
            continue;
        }

        const details = resourceDetails.get(resource);
        const resourceType = details?.type ??
            (record.videos?.includes(resource) ? "video" : "image");
        if (!isValidCachedTutorialResource(response, details, resourceType)) {
            invalidResources.push(resource);
        }
    }

    const hasIntegrityProblems = missingResources.length > 0 || invalidResources.length > 0;

    return {
        ...record,
        status: hasIntegrityProblems
            ? "incomplete"
            : isOutdated
                ? "outdated"
                : "saved",
        missingResources,
        invalidResources,
        isOutdated,
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
 * Encaminha o corpo em streaming para o Cache Storage sem acumular o MP4
 * inteiro em um único ArrayBuffer na memória.
 */
function createTrackedResponse(response, onChunk) {
    if (!response.body || typeof ReadableStream === "undefined") {
        return response.clone();
    }

    const reader = response.body.getReader();
    const stream = new ReadableStream({
        async pull(controller) {
            try {
                const { done, value } = await reader.read();

                if (done) {
                    controller.close();
                    return;
                }

                onChunk?.(value.byteLength);
                controller.enqueue(value);
            } catch (error) {
                controller.error(error);
            }
        },
        cancel(reason) {
            return reader.cancel(reason);
        },
    });

    return new Response(stream, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
    });
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
    includeVideos = false,
    videoMetadata = {},
    contentVersion = null,
    videoContentVersion = null,
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

    const imagePaths = collectTutorialImageResources(steps, imageMetadata);
    const videoPaths = includeVideos ? collectTutorialVideoResources(steps) : [];
    const videoEstimate = estimateTutorialVideoSize(videoPaths, videoMetadata);
    const origin = window.location.origin;
    const imageResources = imagePaths.map((path) => ({
        path,
        type: "image",
        url: new URL(path, origin).href,
    }));
    const videoResources = videoPaths.map((path) => ({
        path,
        type: "video",
        url: new URL(path, origin).href,
        size: videoMetadata?.[path]?.size,
    }));
    const resourceEntries = [...imageResources, ...videoResources];
    const totalResources = resourceEntries.length;
    const resourceDetails = new Array(totalResources);

    const previousRecord = await getStoredPackage(tutorialId);
    const cacheName = createPackageCacheName(tutorialId);
    const packageCache = await caches.open(cacheName);
    const controller = new AbortController();
    let cancelledByCaller = Boolean(signal?.aborted);
    const abortFromCaller = () => {
        cancelledByCaller = true;
        controller.abort();
    };

    if (signal?.aborted) {
        controller.abort();
    } else {
        signal?.addEventListener("abort", abortFromCaller, { once: true });
    }

    let nextIndex = 0;
    let completed = 0;
    let bytesDownloaded = 0;
    let totalBytes = videoEstimate.knownBytes;
    let lastProgressUpdate = 0;
    let firstError = null;

    function reportProgress(force = false) {
        const now = Date.now();

        if (force || now - lastProgressUpdate >= 150) {
            lastProgressUpdate = now;
            onProgress?.({
                completed,
                total: totalResources,
                bytesDownloaded,
                totalBytes,
            });
        }
    }

    reportProgress(true);

    async function worker() {
        while (!firstError && !controller.signal.aborted) {
            const index = nextIndex;
            nextIndex += 1;

            if (index >= resourceEntries.length) {
                return;
            }

            const resource = resourceEntries[index];

            try {
                const response = await fetch(resource.url, {
                    cache: "reload",
                    signal: controller.signal,
                });

                const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
                const contentLength = Number(response.headers.get("content-length"));
                const isValidType = resource.type === "video"
                    ? contentType.startsWith("video/") || contentType === "application/octet-stream"
                    : contentType.startsWith("image/");

                if (response.status !== 200 || !isValidType) {
                    throw new Error(
                        resource.type === "video"
                            ? "Não foi possível baixar um vídeo completo do tutorial."
                            : "Não foi possível baixar uma imagem necessária do tutorial.",
                    );
                }

                const expectedSize = resource.size ?? (
                    Number.isFinite(contentLength) && contentLength > 0
                        ? contentLength
                        : null
                );

                if (resource.type === "video" && !resource.size && expectedSize) {
                    totalBytes += expectedSize;
                    reportProgress(true);
                }

                let transferredBytes = 0;
                const responseToCache = createTrackedResponse(response, (chunkBytes) => {
                    transferredBytes += chunkBytes;

                    if (resource.type === "video") {
                        bytesDownloaded += chunkBytes;
                        reportProgress();
                    }
                });

                await packageCache.put(resource.url, responseToCache);

                const cachedResponse = await packageCache.match(resource.url);
                const cachedContentType = (cachedResponse?.headers.get("content-type") ?? "").toLowerCase();
                const hasValidCachedType = resource.type === "video"
                    ? cachedContentType.startsWith("video/") || cachedContentType === "application/octet-stream"
                    : cachedContentType.startsWith("image/");

                if (
                    !cachedResponse ||
                    cachedResponse.status !== 200 ||
                    !cachedResponse.body ||
                    !hasValidCachedType
                ) {
                    throw new Error(
                        "Um arquivo do tutorial não foi armazenado corretamente. Tente baixar novamente.",
                    );
                }

                const wasStreamTracked = transferredBytes > 0;

                if (!wasStreamTracked) {
                    transferredBytes = (await cachedResponse.blob()).size;
                }

                if (transferredBytes <= 0) {
                    throw new Error("Um arquivo do tutorial foi recebido vazio. Tente baixar novamente.");
                }

                if (resource.type === "video" && expectedSize && transferredBytes !== expectedSize) {
                    throw new Error(
                        "O tamanho recebido de um vídeo não corresponde ao arquivo original. Tente novamente.",
                    );
                }

                if (resource.type === "video" && !wasStreamTracked) {
                    bytesDownloaded += transferredBytes;
                }

                resourceDetails[index] = {
                    url: resource.url,
                    type: resource.type,
                    size: transferredBytes,
                    contentType: cachedContentType.split(";")[0],
                };

                completed += 1;
                reportProgress(true);
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
            { length: Math.min(DOWNLOAD_CONCURRENCY, Math.max(resourceEntries.length, 1)) },
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
            resources: resourceEntries.map((resource) => resource.url),
            images: imageResources.map((resource) => resource.url),
            videos: videoResources.map((resource) => resource.url),
            totalVideoBytes: totalBytes,
            resourceDetails,
            contentVersion,
            videoContentVersion,
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

        if (cancelledByCaller && error?.name !== "AbortError") {
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
