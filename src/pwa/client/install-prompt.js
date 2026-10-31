/**
 * Gerencia o prompt de instalação do PWA sem acoplar a lógica à interface.
 *
 * O listener é inicializado no entrypoint da aplicação para capturar
 * beforeinstallprompt mesmo que a página Home ainda esteja em lazy loading.
 */
export function createPwaInstallManager(target) {
    let deferredPrompt = null;
    let installedByEvent = false;
    let initialized = false;

    const subscribers = new Set();

    function isStandalone() {
        if (!target) {
            return false;
        }

        const displayMode = target.matchMedia?.("(display-mode: standalone)");

        return Boolean(
            displayMode?.matches ||
            target.navigator?.standalone === true,
        );
    }

    function getSnapshot() {
        return {
            canPrompt: Boolean(deferredPrompt),
            isInstalled: installedByEvent || isStandalone(),
        };
    }

    function notify() {
        const snapshot = getSnapshot();

        for (const subscriber of subscribers) {
            subscriber(snapshot);
        }
    }

    function handleBeforeInstallPrompt(event) {
        if (typeof event?.prompt !== "function" || getSnapshot().isInstalled) {
            return;
        }

        event.preventDefault?.();
        deferredPrompt = event;
        notify();
    }

    function handleAppInstalled() {
        deferredPrompt = null;
        installedByEvent = true;
        notify();
    }

    function initialize() {
        if (initialized || typeof target?.addEventListener !== "function") {
            return;
        }

        initialized = true;
        target.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        target.addEventListener("appinstalled", handleAppInstalled);
    }

    function subscribe(subscriber) {
        subscribers.add(subscriber);

        return () => {
            subscribers.delete(subscriber);
        };
    }

    async function promptInstall() {
        if (!deferredPrompt) {
            return "unavailable";
        }

        const installEvent = deferredPrompt;
        deferredPrompt = null;
        notify();

        await installEvent.prompt();

        const choice = await installEvent.userChoice;
        const outcome = choice?.outcome ?? "unknown";

        if (outcome === "accepted") {
            installedByEvent = true;
        }

        notify();

        return outcome;
    }

    return {
        initialize,
        getSnapshot,
        subscribe,
        promptInstall,
    };
}

const pwaInstallManager = createPwaInstallManager(
    typeof window === "undefined" ? null : window,
);

export function initializePwaInstall() {
    pwaInstallManager.initialize();
}

export function getPwaInstallSnapshot() {
    return pwaInstallManager.getSnapshot();
}

export function subscribeToPwaInstall(subscriber) {
    return pwaInstallManager.subscribe(subscriber);
}

export function promptPwaInstall() {
    return pwaInstallManager.promptInstall();
}

/**
 * Instruções manuais para navegadores que não oferecem beforeinstallprompt,
 * como o Safari no iOS. A interface não promete um prompt nativo nesses casos.
 */
export function getPwaInstallInstructions(
    userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent,
    platform = typeof navigator === "undefined" ? "" : navigator.platform,
    maxTouchPoints = typeof navigator === "undefined" ? 0 : navigator.maxTouchPoints ?? 0,
) {
    const isAppleMobile =
        /iPhone|iPad|iPod/i.test(userAgent) ||
        (platform === "MacIntel" && maxTouchPoints > 1);

    if (isAppleMobile) {
        return {
            title: "No iPhone ou iPad",
            steps: [
                "Abra o Hauy Conecta no Safari.",
                "Toque em Compartilhar.",
                "Selecione Adicionar à Tela de Início. Ative Abrir como App da Web, se essa opção aparecer, e toque em Adicionar.",
            ],
        };
    }

    if (/Android/i.test(userAgent)) {
        return {
            title: "No Android",
            steps: [
                "Abra o menu do navegador (⋮).",
                "Procure Instalar app ou Adicionar à tela inicial.",
                "Confirme a instalação para criar o atalho do Hauy Conecta.",
            ],
        };
    }

    return {
        title: "No computador",
        steps: [
            "Procure o ícone de instalação na barra de endereço do navegador.",
            "Se ele não aparecer, abra o menu do navegador e procure Instalar Hauy Conecta ou Instalar página como app.",
            "Confirme a instalação quando o navegador apresentar a opção.",
        ],
    };
}
