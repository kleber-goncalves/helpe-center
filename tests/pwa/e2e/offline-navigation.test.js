import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";
import { execPath } from "node:process";
import { fileURLToPath } from "node:url";
import { after, before, test } from "node:test";

import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const HOST = "127.0.0.1";
const PORT = 4187;
const BASE_URL = "http://" + HOST + ":" + PORT;
const RUNTIME_IMAGE_CACHE_NAME = "hauy-conecta-runtime-images-v1";
const TUTORIAL_PACKAGE_CACHE_PREFIX = "hauy-conecta-tutorial-package-v1-";
const EXCEL_TUTORIAL_IMAGE = "/tutoriais/excel/como-comecar-usar-excel/passo-1.webp";

let previewProcess;
let browser;

async function waitForPreview() {
    const deadline = Date.now() + 15_000;

    while (Date.now() < deadline) {
        try {
            const response = await fetch(BASE_URL);

            if (response.ok) {
                return;
            }
        } catch {
            // O servidor Vite ainda está iniciando.
        }

        await new Promise((resolve) => setTimeout(resolve, 250));
    }

    throw new Error("O servidor Vite Preview não iniciou em 15 segundos.");
}

async function waitForServiceWorkerControl(page) {
    await page.evaluate(async () => {
        await navigator.serviceWorker.ready;

        if (!navigator.serviceWorker.controller) {
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(
                    () => reject(new Error("Service Worker não controlou a página.")),
                    10_000,
                );

                navigator.serviceWorker.addEventListener(
                    "controllerchange",
                    () => {
                        clearTimeout(timeout);
                        resolve();
                    },
                    { once: true },
                );
            });
        }
    });
}



async function openExcelCompletion(page) {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await waitForServiceWorkerControl(page);
    await page.goto(BASE_URL + "/tutoriais/comecar-usar-excel", {
        waitUntil: "domcontentloaded",
    });

    await page.getByRole("heading", {
        name: "Como começar a usar o Excel",
    }).waitFor({ state: "visible", timeout: 15_000 });

    const lastStepButton = page
        .locator('nav[aria-label="Etapas do tutorial"] ol')
        .first()
        .getByRole("button")
        .last();

    await lastStepButton.click();

    await page.getByRole("heading", {
        name: "Salve a planilha",
    }).waitFor({ state: "visible", timeout: 15_000 });
}

async function readTutorialPackage(page, tutorialId) {
    return page.evaluate(async (id) => {
        const database = await new Promise((resolve, reject) => {
            const request = indexedDB.open("hauy-conecta-offline", 1);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        try {
            return await new Promise((resolve, reject) => {
                const request = database
                    .transaction("tutorial-packages", "readonly")
                    .objectStore("tutorial-packages")
                    .get(id);

                request.onsuccess = () => resolve(request.result ?? null);
                request.onerror = () => reject(request.error);
            });
        } finally {
            database.close();
        }
    }, tutorialId);
}

async function writeTutorialPackage(page, record) {
    return page.evaluate(async (packageRecord) => {
        const database = await new Promise((resolve, reject) => {
            const request = indexedDB.open("hauy-conecta-offline", 1);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        try {
            await new Promise((resolve, reject) => {
                const transaction = database.transaction("tutorial-packages", "readwrite");

                transaction.objectStore("tutorial-packages").put(packageRecord);
                transaction.oncomplete = resolve;
                transaction.onerror = () => reject(transaction.error);
                transaction.onabort = () => reject(transaction.error);
            });
        } finally {
            database.close();
        }
    }, record);
}

async function saveExcelPackage(page) {
    await page.getByRole("button", { name: "Salvar tutorial offline" }).click();

    await page.getByText(
        "Este tutorial está disponível offline neste dispositivo.",
        { exact: true },
    ).waitFor({ state: "visible", timeout: 30_000 });

    const record = await readTutorialPackage(page, "comecar-usar-excel");

    assert.ok(record?.cacheName, "O IndexedDB deve registrar o cache do pacote.");
    assert.ok(record.resources?.length > 0, "O pacote deve declarar seus recursos.");

    return record;
}

async function loadImageInPage(page, url) {
    return page.evaluate((imageUrl) => new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image.naturalWidth);
        image.onerror = () => reject(new Error("A imagem não carregou: " + imageUrl));

        image.src = imageUrl;
    }), url);
}

before(async () => {
    previewProcess = spawn(
        execPath,
        [
            path.join(ROOT, "node_modules/vite/bin/vite.js"),
            "preview",
            "--host",
            HOST,
            "--port",
            String(PORT),
            "--strictPort",
        ],
        {
            cwd: ROOT,
            stdio: "ignore",
        },
    );

    await waitForPreview();
    browser = await chromium.launch({ headless: true });
});

after(async () => {
    await browser?.close();

    if (previewProcess && previewProcess.exitCode === null) {
        previewProcess.kill("SIGTERM");
        await Promise.race([
            once(previewProcess, "exit"),
            new Promise((resolve) => setTimeout(resolve, 2_000)),
        ]);
    }
});

test("registra e ativa o Service Worker no build de produção", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();

    try {
        await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
        await waitForServiceWorkerControl(page);

        const registration = await page.evaluate(async () => {
            const activeRegistration = await navigator.serviceWorker.ready;

            return {
                activeState: activeRegistration.active?.state,
                controlled: Boolean(navigator.serviceWorker.controller),
            };
        });

        assert.equal(registration.activeState, "activated");
        assert.equal(registration.controlled, true);
    } finally {
        await context.close();
    }
});

test("abre uma rota de tutorial sem rede usando os recursos precacheados", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();

    try {
        await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
        await waitForServiceWorkerControl(page);

        await context.setOffline(true);

        const response = await page.goto(
            BASE_URL + "/tutoriais/comecar-usar-excel",
            { waitUntil: "domcontentloaded" },
        );

        assert.ok(response, "A navegação offline deve receber uma resposta do Service Worker.");
        assert.equal(response.status(), 200);

        await page.getByRole("heading", { name: "Como começar a usar o Excel" }).waitFor({
            state: "visible",
            timeout: 15_000,
        });
    } finally {
        await context.setOffline(false);
        await context.close();
    }
});

test("armazena imagens locais no cache runtime e as entrega sem internet", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();

    try {
        await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
        await waitForServiceWorkerControl(page);

        const imageWidth = await loadImageInPage(page, EXCEL_TUTORIAL_IMAGE);

        assert.ok(imageWidth > 0, "A imagem deve carregar enquanto há conexão.");

        const isCached = await page.evaluate(async ({ cacheName, imagePath }) => {
            const cache = await caches.open(cacheName);
            const response = await cache.match(new URL(imagePath, location.origin).href);

            return Boolean(response);
        }, {
            cacheName: RUNTIME_IMAGE_CACHE_NAME,
            imagePath: EXCEL_TUTORIAL_IMAGE,
        });

        assert.equal(isCached, true, "A imagem acessada deve ficar no cache runtime.");

        await context.setOffline(true);

        const offlineImageWidth = await loadImageInPage(page, EXCEL_TUTORIAL_IMAGE);

        assert.ok(offlineImageWidth > 0, "A imagem deve continuar carregando sem internet.");
    } finally {
        await context.setOffline(false);
        await context.close();
    }
});

test("salva um tutorial, preserva as imagens offline e permite consultá-las sem rede", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();

    try {
        await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
        await waitForServiceWorkerControl(page);

        await page.goto(
            BASE_URL + "/tutoriais/comecar-usar-excel",
            { waitUntil: "domcontentloaded" },
        );

        await page.getByRole("heading", { name: "Como começar a usar o Excel" }).waitFor({
            state: "visible",
            timeout: 15_000,
        });

        const lastStepButton = page
            .locator('nav[aria-label="Etapas do tutorial"] ol')
            .first()
            .getByRole("button")
            .last();

        await lastStepButton.click();

        await page.getByRole("heading", { name: "Salve a planilha" }).waitFor({
            state: "visible",
            timeout: 15_000,
        });

        await page.getByRole("button", { name: "Salvar tutorial offline" }).click();

        await page.getByText(
            "Este tutorial está disponível offline neste dispositivo.",
            { exact: true },
        ).waitFor({
            state: "visible",
            timeout: 30_000,
        });

        const packageResource = await page.evaluate(async (cachePrefix) => {
            const cacheNames = (await caches.keys()).filter((name) =>
                name.startsWith(cachePrefix),
            );

            for (const cacheName of cacheNames) {
                const cache = await caches.open(cacheName);
                const requests = await cache.keys();

                if (requests.length > 0) {
                    return requests[0].url;
                }
            }

            return null;
        }, TUTORIAL_PACKAGE_CACHE_PREFIX);

        assert.ok(packageResource, "O pacote do tutorial deve armazenar pelo menos uma imagem.");

        await context.setOffline(true);

        const offlineImageWidth = await loadImageInPage(page, packageResource);

        assert.ok(offlineImageWidth > 0, "Uma imagem do pacote deve abrir mesmo sem internet.");
    } finally {
        await context.setOffline(false);
        await context.close();
    }
});


test("baixa vídeos opcionais e reproduz/avança no MP4 sem internet", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();
    const excelVideo = "/tutoriais/excel/como-comecar-usar-excel/passo-6-N.mp4";

    try {
        await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
        await waitForServiceWorkerControl(page);

        await page.goto(
            BASE_URL + "/tutoriais/comecar-usar-excel",
            { waitUntil: "domcontentloaded" },
        );

        await page.getByRole("heading", { name: "Como começar a usar o Excel" }).waitFor({
            state: "visible",
            timeout: 15_000,
        });

        const lastStepButton = page
            .locator('nav[aria-label="Etapas do tutorial"] ol')
            .first()
            .getByRole("button")
            .last();

        await lastStepButton.click();

        await page.getByRole("heading", { name: "Salve a planilha" }).waitFor({
            state: "visible",
            timeout: 15_000,
        });

        await page.getByRole("checkbox", {
            name: "Incluir vídeos para assistir sem internet",
        }).check();

        await page.getByRole("button", { name: "Salvar tutorial offline" }).click();

        await page.getByText(
            "Este tutorial e seus vídeos estão disponíveis offline neste dispositivo.",
            { exact: true },
        ).waitFor({
            state: "visible",
            timeout: 120_000,
        });

        const cachedVideo = await page.evaluate(async ({ cachePrefix, videoPath }) => {
            const cacheNames = (await caches.keys()).filter((name) =>
                name.startsWith(cachePrefix),
            );

            for (const cacheName of cacheNames) {
                const cache = await caches.open(cacheName);
                const response = await cache.match(new URL(videoPath, location.origin).href);

                if (response) {
                    return {
                        status: response.status,
                        contentType: response.headers.get("content-type"),
                        contentLength: Number(response.headers.get("content-length")),
                    };
                }
            }

            return null;
        }, {
            cachePrefix: TUTORIAL_PACKAGE_CACHE_PREFIX,
            videoPath: excelVideo,
        });

        assert.ok(cachedVideo, "O MP4 deve estar dentro do cache do pacote.");
        assert.equal(cachedVideo.status, 200);
        assert.match(cachedVideo.contentType ?? "", /video\/mp4/i);
        assert.ok(cachedVideo.contentLength > 0, "O arquivo MP4 deve estar completo.");

        await context.setOffline(true);

        const rangeResponsePromise = page.waitForResponse(
            (response) => response.url().endsWith(".mp4") && response.status() === 206,
            { timeout: 20_000 },
        ).catch(() => null);

        const playback = await page.evaluate(async (videoPath) => {
            const video = document.createElement("video");
            video.muted = true;
            video.playsInline = true;
            video.preload = "metadata";
            video.src = videoPath;
            document.body.append(video);

            await new Promise((resolve, reject) => {
                const timeout = setTimeout(
                    () => reject(new Error("O vídeo não carregou os metadados offline.")),
                    20_000,
                );

                video.addEventListener("loadedmetadata", () => {
                    clearTimeout(timeout);
                    resolve();
                }, { once: true });

                video.addEventListener("error", () => {
                    clearTimeout(timeout);
                    reject(new Error("O vídeo falhou ao abrir offline."));
                }, { once: true });

                video.load();
            });

            const seekTarget = Math.min(1, video.duration / 2);

            if (seekTarget > 0) {
                await new Promise((resolve, reject) => {
                    const timeout = setTimeout(
                        () => reject(new Error("O player não concluiu a busca no vídeo offline.")),
                        10_000,
                    );

                    video.addEventListener("seeked", () => {
                        clearTimeout(timeout);
                        resolve();
                    }, { once: true });

                    video.currentTime = seekTarget;
                });
            }

            const result = {
                duration: video.duration,
                currentTime: video.currentTime,
                readyState: video.readyState,
            };

            video.remove();
            return result;
        }, excelVideo);

        const rangeResponse = await rangeResponsePromise;

        assert.ok(Number.isFinite(playback.duration) && playback.duration > 0);
        assert.ok(playback.readyState >= 1, "Os metadados do vídeo devem estar disponíveis.");
        assert.ok(playback.currentTime > 0, "A busca dentro do vídeo deve funcionar offline.");
        assert.ok(rangeResponse, "O Service Worker deve responder a uma requisição HTTP Range.");
    } finally {
        await context.setOffline(false);
        await context.close();
    }
});


test("identifica pacote incompleto quando o Cache Storage é removido", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();

    try {
        await openExcelCompletion(page);
        const record = await saveExcelPackage(page);

        const removed = await page.evaluate(async (cacheName) => caches.delete(cacheName), record.cacheName);
        assert.equal(removed, true, "O cache do pacote deve ser removido no cenário simulado.");

        await page.reload({ waitUntil: "domcontentloaded" });
        await page.getByRole("heading", {
            name: "Como começar a usar o Excel",
        }).waitFor({ state: "visible", timeout: 15_000 });

        const lastStepButton = page
            .locator('nav[aria-label="Etapas do tutorial"] ol')
            .first()
            .getByRole("button")
            .last();

        await lastStepButton.click();

        await page.getByRole("button", { name: "Reparar pacote" }).waitFor({
            state: "visible",
            timeout: 15_000,
        });

        await page.getByText(
            "Parte dos arquivos não está mais disponível no armazenamento. Repare o pacote enquanto estiver conectado ou remova-o.",
            { exact: true },
        ).waitFor({ state: "visible" });

        await page.getByText(
            "Este tutorial está disponível offline neste dispositivo.",
            { exact: true },
        ).waitFor({ state: "hidden" });
    } finally {
        await context.close();
    }
});

test("identifica pacote desatualizado sem apagar o conteúdo anteriormente salvo", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();

    try {
        await openExcelCompletion(page);
        const record = await saveExcelPackage(page);
        const originalCacheName = record.cacheName;

        await writeTutorialPackage(page, {
            ...record,
            contentVersion: "fingerprint-obsoleto-simulado",
        });

        await page.reload({ waitUntil: "domcontentloaded" });
        await page.getByRole("heading", {
            name: "Como começar a usar o Excel",
        }).waitFor({ state: "visible", timeout: 15_000 });

        const lastStepButton = page
            .locator('nav[aria-label="Etapas do tutorial"] ol')
            .first()
            .getByRole("button")
            .last();

        await lastStepButton.click();

        await page.getByRole("button", {
            name: "Atualizar pacote desatualizado",
        }).waitFor({ state: "visible", timeout: 15_000 });

        await page.getByText(
            "O conteúdo deste tutorial mudou desde o último download. A versão salva continua no dispositivo, mas precisa ser atualizada para corresponder ao portal.",
            { exact: true },
        ).waitFor({ state: "visible" });

        const previousCacheStillExists = await page.evaluate(
            async (cacheName) => caches.has(cacheName),
            originalCacheName,
        );

        assert.equal(previousCacheStillExists, true);
    } finally {
        await context.close();
    }
});

test("não oferece pacote salvo depois que os dados do site são apagados", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();

    try {
        await openExcelCompletion(page);
        const record = await saveExcelPackage(page);

        await page.evaluate(async (cacheName) => {
            await caches.delete(cacheName);

            await new Promise((resolve, reject) => {
                const request = indexedDB.deleteDatabase("hauy-conecta-offline");

                request.onsuccess = resolve;
                request.onerror = () => reject(request.error);
                request.onblocked = () => reject(
                    new Error("O banco offline ficou bloqueado durante a simulação."),
                );
            });
        }, record.cacheName);

        await page.reload({ waitUntil: "domcontentloaded" });
        await page.getByRole("heading", {
            name: "Como começar a usar o Excel",
        }).waitFor({ state: "visible", timeout: 15_000 });

        const lastStepButton = page
            .locator('nav[aria-label="Etapas do tutorial"] ol')
            .first()
            .getByRole("button")
            .last();

        await lastStepButton.click();

        await page.getByRole("button", { name: "Salvar tutorial offline" }).waitFor({
            state: "visible",
            timeout: 15_000,
        });

        const falselyMarkedAsSaved = await page.getByText(
            "Este tutorial está disponível offline neste dispositivo.",
            { exact: true },
        ).count();

        assert.equal(falselyMarkedAsSaved, 0);

        const packageCacheWasRemoved = await page.evaluate(
            async (cacheName) => caches.has(cacheName),
            record.cacheName,
        );

        assert.equal(packageCacheWasRemoved, false);
    } finally {
        await context.close();
    }
});

test("preserva o pacote anterior quando uma atualização falha por quota", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();

    try {
        await openExcelCompletion(page);
        const record = await saveExcelPackage(page);

        await page.evaluate((previousCacheName) => {
            const originalPut = Cache.prototype.put;

            Cache.prototype.put = function (request, response) {
                if (
                    this.name.startsWith("hauy-conecta-tutorial-package-v1-") &&
                    this.name !== previousCacheName
                ) {
                    return Promise.reject(
                        new DOMException("Quota exceeded", "QuotaExceededError"),
                    );
                }

                return originalPut.call(this, request, response);
            };
        }, record.cacheName);

        await page.getByRole("button", { name: "Atualizar pacote" }).click();

        await page.getByText(
            "O armazenamento deste dispositivo está cheio. Libere espaço e tente novamente. A versão anterior do pacote foi preservada.",
            { exact: true },
        ).waitFor({ state: "visible", timeout: 20_000 });

        const previousCacheStillExists = await page.evaluate(
            async (cacheName) => caches.has(cacheName),
            record.cacheName,
        );

        const storedRecord = await readTutorialPackage(page, "comecar-usar-excel");

        assert.equal(previousCacheStillExists, true);
        assert.equal(storedRecord.cacheName, record.cacheName);
    } finally {
        await context.close();
    }
});

test("reconhece como incompleto um arquivo substituído por resposta HTML no cache", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();

    try {
        await openExcelCompletion(page);
        const record = await saveExcelPackage(page);
        const targetResource = record.images?.[0];

        assert.ok(targetResource, "O pacote deve conter ao menos uma imagem.");

        await page.evaluate(async ({ cacheName, resourceUrl }) => {
            const cache = await caches.open(cacheName);

            await cache.put(resourceUrl, new Response("<html>not found</html>", {
                status: 200,
                headers: { "content-type": "text/html" },
            }));
        }, {
            cacheName: record.cacheName,
            resourceUrl: targetResource,
        });

        await page.reload({ waitUntil: "domcontentloaded" });
        await page.getByRole("heading", {
            name: "Como começar a usar o Excel",
        }).waitFor({ state: "visible", timeout: 15_000 });

        const lastStepButton = page
            .locator('nav[aria-label="Etapas do tutorial"] ol')
            .first()
            .getByRole("button")
            .last();

        await lastStepButton.click();

        await page.getByRole("button", { name: "Reparar pacote" }).waitFor({
            state: "visible",
            timeout: 15_000,
        });

        await page.getByText(
            "Este tutorial está disponível offline neste dispositivo.",
            { exact: true },
        ).waitFor({ state: "hidden" });
    } finally {
        await context.close();
    }
});


test("preserva o pacote anterior e remove o cache temporário após cancelar uma atualização", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();

    try {
        await openExcelCompletion(page);
        const previousRecord = await saveExcelPackage(page);

        await page.evaluate((previousCacheName) => {
            const originalPut = Cache.prototype.put;
            window.__tutorialPackagePutStarted = false;

            Cache.prototype.put = function (request, response) {
                if (
                    this.name.startsWith("hauy-conecta-tutorial-package-v1-") &&
                    this.name !== previousCacheName
                ) {
                    window.__tutorialPackagePutStarted = true;

                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            originalPut.call(this, request, response).then(resolve, reject);
                        }, 2_000);
                    });
                }

                return originalPut.call(this, request, response);
            };
        }, previousRecord.cacheName);

        await page.getByRole("button", { name: "Atualizar pacote" }).click();

        await page.waitForFunction(
            () => window.__tutorialPackagePutStarted === true,
            null,
            { timeout: 15_000 },
        );

        await page.getByRole("button", { name: "Cancelar download" }).click();

        await page.getByText(
            "Download cancelado. A versão anterior do pacote foi preservada.",
            { exact: true },
        ).waitFor({ state: "visible", timeout: 15_000 });

        const result = await page.evaluate(async () => {
            const database = await new Promise((resolve, reject) => {
                const request = indexedDB.open("hauy-conecta-offline", 1);

                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });

            let record;

            try {
                record = await new Promise((resolve, reject) => {
                    const request = database
                        .transaction("tutorial-packages", "readonly")
                        .objectStore("tutorial-packages")
                        .get("comecar-usar-excel");

                    request.onsuccess = () => resolve(request.result ?? null);
                    request.onerror = () => reject(request.error);
                });
            } finally {
                database.close();
            }

            const packageCaches = (await caches.keys()).filter((name) =>
                name.startsWith("hauy-conecta-tutorial-package-v1-"),
            );

            return { record: record ?? null, packageCaches };
        });

        assert.equal(result.record?.cacheName, previousRecord.cacheName);
        assert.ok(result.packageCaches.includes(previousRecord.cacheName));
        assert.equal(result.packageCaches.length, 1);
    } finally {
        await context.close();
    }
});


test("não declara pacote disponível quando um arquivo necessário está indisponível", async () => {
    const context = await browser.newContext({ serviceWorkers: "allow" });
    const page = await context.newPage();

    try {
        await openExcelCompletion(page);

        await page.evaluate((unavailablePath) => {
            const originalFetch = window.fetch.bind(window);

            window.fetch = (input, init) => {
                const requestUrl = typeof input === "string" || input instanceof URL
                    ? new URL(input, location.origin)
                    : new URL(input.url);

                if (requestUrl.pathname === unavailablePath) {
                    return Promise.resolve(new Response("recurso indisponível", {
                        status: 404,
                        headers: { "content-type": "text/plain" },
                    }));
                }

                return originalFetch(input, init);
            };
        }, EXCEL_TUTORIAL_IMAGE);

        await page.getByRole("button", { name: "Salvar tutorial offline" }).click();

        await page.getByText(
            "Não foi possível baixar uma imagem necessária do tutorial.",
            { exact: true },
        ).waitFor({ state: "visible", timeout: 20_000 });

        const result = await page.evaluate(async () => {
            const database = await new Promise((resolve, reject) => {
                const request = indexedDB.open("hauy-conecta-offline", 1);

                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });

            let record;

            try {
                record = await new Promise((resolve, reject) => {
                    const request = database
                        .transaction("tutorial-packages", "readonly")
                        .objectStore("tutorial-packages")
                        .get("comecar-usar-excel");

                    request.onsuccess = () => resolve(request.result ?? null);
                    request.onerror = () => reject(request.error);
                });
            } finally {
                database.close();
            }

            const packageCaches = (await caches.keys()).filter((name) =>
                name.startsWith("hauy-conecta-tutorial-package-v1-"),
            );

            return { record: record ?? null, packageCaches };
        });

        assert.equal(result.record, null);
        assert.deepEqual(result.packageCaches, []);
        await page.getByText(
            "Este tutorial está disponível offline neste dispositivo.",
            { exact: true },
        ).waitFor({ state: "hidden" });
    } finally {
        await context.close();
    }
});
