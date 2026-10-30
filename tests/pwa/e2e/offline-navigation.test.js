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
