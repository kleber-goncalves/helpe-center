import { registerSW } from "virtual:pwa-register";

const subscribers = new Set();

let updateServiceWorker;
let registrationStarted = false;

function notifySubscribers(eventName) {
    for (const subscriber of subscribers) {
        subscriber(eventName);
    }
}

/**
 * Registra o Service Worker uma única vez e compartilha os eventos com
 * os componentes React interessados no estado do PWA.
 */
export function subscribeToPwaEvents(subscriber) {
    subscribers.add(subscriber);

    if (
        !registrationStarted &&
        import.meta.env.PROD &&
        typeof navigator !== "undefined" &&
        "serviceWorker" in navigator
    ) {
        registrationStarted = true;

        updateServiceWorker = registerSW({
            immediate: true,
            onOfflineReady() {
                notifySubscribers("offline-ready");
            },
            onNeedRefresh() {
                notifySubscribers("update-available");
            },
            onRegisterError(error) {
                console.error(
                    "[Hauy Conecta PWA] Não foi possível registrar o Service Worker.",
                    error,
                );
            },
        });
    }

    return () => {
        subscribers.delete(subscriber);
    };
}

export async function applyPwaUpdate() {
    if (typeof updateServiceWorker === "function") {
        await updateServiceWorker(true);
    }
}
