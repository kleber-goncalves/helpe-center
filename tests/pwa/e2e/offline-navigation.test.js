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
