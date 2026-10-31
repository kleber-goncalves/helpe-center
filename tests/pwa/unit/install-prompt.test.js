import assert from "node:assert/strict";
import test from "node:test";

import {
    createPwaInstallManager,
    getPwaInstallInstructions,
} from "../../../src/pwa/client/install-prompt.js";

function createFakeWindow() {
    const listeners = new Map();

    return {
        navigator: { standalone: false },
        standaloneDisplayMode: false,
        addEventListener(eventName, listener) {
            const eventListeners = listeners.get(eventName) ?? [];
            eventListeners.push(listener);
            listeners.set(eventName, eventListeners);
        },
        matchMedia() {
            return { matches: this.standaloneDisplayMode };
        },
        dispatch(eventName, event = {}) {
            for (const listener of listeners.get(eventName) ?? []) {
                listener(event);
            }
        },
    };
}

test("mantém a mesma referência do snapshot enquanto o estado não muda", () => {
    const manager = createPwaInstallManager(createFakeWindow());
    const initialSnapshot = manager.getSnapshot();

    assert.equal(manager.getSnapshot(), initialSnapshot);
});

test("captura beforeinstallprompt e publica a disponibilidade para a interface", () => {
    const fakeWindow = createFakeWindow();
    const manager = createPwaInstallManager(fakeWindow);
    let prevented = false;
    const snapshots = [];

    manager.subscribe((snapshot) => snapshots.push(snapshot));
    manager.initialize();

    fakeWindow.dispatch("beforeinstallprompt", {
        preventDefault() {
            prevented = true;
        },
        async prompt() {},
        userChoice: Promise.resolve({ outcome: "dismissed" }),
    });

    assert.equal(prevented, true);
    assert.equal(manager.getSnapshot().canPrompt, true);
    assert.equal(manager.getSnapshot().isInstalled, false);
    assert.equal(snapshots.length, 1);
});

test("prompt aceito marca o aplicativo como instalado e consome o evento", async () => {
    const fakeWindow = createFakeWindow();
    const manager = createPwaInstallManager(fakeWindow);
    let promptCalled = false;

    manager.initialize();
    fakeWindow.dispatch("beforeinstallprompt", {
        preventDefault() {},
        async prompt() {
            promptCalled = true;
        },
        userChoice: Promise.resolve({ outcome: "accepted" }),
    });

    const outcome = await manager.promptInstall();

    assert.equal(promptCalled, true);
    assert.equal(outcome, "accepted");
    assert.deepEqual(manager.getSnapshot(), {
        canPrompt: false,
        isInstalled: true,
    });
});

test("prompt dispensado não é reutilizado", async () => {
    const fakeWindow = createFakeWindow();
    const manager = createPwaInstallManager(fakeWindow);

    manager.initialize();
    fakeWindow.dispatch("beforeinstallprompt", {
        preventDefault() {},
        async prompt() {},
        userChoice: Promise.resolve({ outcome: "dismissed" }),
    });

    assert.equal(await manager.promptInstall(), "dismissed");
    assert.equal(await manager.promptInstall(), "unavailable");
    assert.equal(manager.getSnapshot().isInstalled, false);
});

test("appinstalled limpa o prompt e atualiza o estado", () => {
    const fakeWindow = createFakeWindow();
    const manager = createPwaInstallManager(fakeWindow);

    manager.initialize();
    fakeWindow.dispatch("beforeinstallprompt", {
        preventDefault() {},
        async prompt() {},
        userChoice: Promise.resolve({ outcome: "dismissed" }),
    });
    fakeWindow.dispatch("appinstalled");

    assert.deepEqual(manager.getSnapshot(), {
        canPrompt: false,
        isInstalled: true,
    });
});

test("detecta instalação pelo modo standalone", () => {
    const fakeWindow = createFakeWindow();
    const manager = createPwaInstallManager(fakeWindow);

    fakeWindow.standaloneDisplayMode = true;

    assert.equal(manager.getSnapshot().isInstalled, true);
});

test("gera instruções específicas para iPhone e iPad", () => {
    const instructions = getPwaInstallInstructions(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)",
        "iPhone",
        5,
    );

    assert.equal(instructions.title, "No iPhone ou iPad");
    assert.match(instructions.steps[1], /Compartilhar/);
    assert.match(instructions.steps[2], /Adicionar à Tela de Início/);
});

test("gera instruções para Android", () => {
    const instructions = getPwaInstallInstructions(
        "Mozilla/5.0 (Linux; Android 15)",
        "Linux armv8l",
        5,
    );

    assert.equal(instructions.title, "No Android");
    assert.match(instructions.steps[1], /Instalar app/);
});

test("usa instruções genéricas de instalação no computador", () => {
    const instructions = getPwaInstallInstructions(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130",
        "Win32",
        0,
    );

    assert.equal(instructions.title, "No computador");
    assert.match(instructions.steps[0], /barra de endereço/);
});
