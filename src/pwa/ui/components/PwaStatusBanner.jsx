import { usePwaStatus } from "../hooks/usePwaStatus.js";

const baseClasses =
    "fixed inset-x-4 bottom-4 z-[10000] mx-auto flex max-w-xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-background px-4 py-3 text-sm text-foreground shadow-xl";

export function PwaStatusBanner() {
    const {
        isOnline,
        offlineReady,
        needRefresh,
        refreshApp,
        dismissOfflineReady,
        dismissUpdate,
    } = usePwaStatus();

    if (needRefresh) {
        return (
            <aside className={baseClasses} role="status" aria-live="polite">
                <p className="min-w-0 flex-1">
                    Uma nova versão do Hauy Conecta está disponível.
                </p>

                <div className="flex shrink-0 items-center gap-2">
                    <button
                        type="button"
                        className="rounded-full px-3 py-2 font-semibold text-muted-foreground transition hover:bg-mist"
                        onClick={dismissUpdate}
                    >
                        Depois
                    </button>
                    <button
                        type="button"
                        className="rounded-full bg-coral-button px-4 py-2 font-semibold text-white transition hover:bg-coral-button-hover"
                        onClick={refreshApp}
                    >
                        Atualizar agora
                    </button>
                </div>
            </aside>
        );
    }

    if (!isOnline) {
        return (
            <aside className={baseClasses} role="status" aria-live="polite">
                <p className="flex-1">
                    Você está sem conexão. O conteúdo básico disponível neste
                    dispositivo pode continuar sendo consultado.
                </p>
            </aside>
        );
    }

    if (offlineReady) {
        return (
            <aside className={baseClasses} role="status" aria-live="polite">
                <p className="flex-1">
                    O Hauy Conecta está pronto para uso básico offline neste
                    dispositivo.
                </p>
                <button
                    type="button"
                    className="rounded-full px-3 py-2 font-semibold text-muted-foreground transition hover:bg-mist"
                    onClick={dismissOfflineReady}
                >
                    Entendi
                </button>
            </aside>
        );
    }

    return null;
}
