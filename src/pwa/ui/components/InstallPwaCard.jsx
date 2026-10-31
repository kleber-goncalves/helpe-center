import { useState } from "react";
import { ChevronDown, Download, Smartphone } from "lucide-react";

import {
    getPwaInstallInstructions,
} from "../../client/install-prompt.js";
import { usePwaInstall } from "../hooks/usePwaInstall.js";

export function InstallPwaCard() {
    const { canPrompt, isInstalled, requestInstall } = usePwaInstall();
    const [showInstructions, setShowInstructions] = useState(false);
    const [isPrompting, setIsPrompting] = useState(false);
    const [feedback, setFeedback] = useState("");

    const instructions = getPwaInstallInstructions();

    if (isInstalled) {
        return null;
    }

    async function handleInstallAction() {
        setFeedback("");

        if (!canPrompt) {
            setShowInstructions((current) => !current);
            return;
        }

        setIsPrompting(true);

        try {
            const outcome = await requestInstall();

            if (outcome === "dismissed") {
                setFeedback("A instalação não foi concluída. Você pode seguir as instruções abaixo ou tentar novamente pelo navegador.");
                setShowInstructions(true);
            } else if (outcome === "unavailable") {
                setShowInstructions(true);
            }
        } catch {
            setFeedback("O navegador não conseguiu abrir a instalação. Use as instruções manuais abaixo.");
            setShowInstructions(true);
        } finally {
            setIsPrompting(false);
        }
    }

    return (
        <section
            aria-label="Instalação do Hauy Conecta"
            className="mt-6 rounded-xl border border-line bg-background/80 p-4 shadow-sm sm:p-5"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-coral-soft text-coral">
                        <Smartphone className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>

                    <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-coral">
                            Acesso rápido
                        </p>

                        <h2 className="mt-1 text-sm font-bold text-foreground">
                            Tenha o Hauy Conecta no seu dispositivo
                        </h2>

                        <p className="mt-1 text-sm leading-5 text-muted-foreground">
                            Instale para abrir a Central de Ajuda diretamente pela tela inicial.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleInstallAction}
                    disabled={isPrompting}
                    aria-expanded={showInstructions}
                    aria-controls="pwa-install-instructions"
                    className="inline-flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-coral-button px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-button-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                >
                    <Download className="size-4" aria-hidden="true" />
                    <span>
                        {isPrompting
                            ? "Abrindo instalação..."
                            : canPrompt
                                ? "Instalar aplicativo"
                                : "Como instalar?"}
                    </span>
                    {!canPrompt && (
                        <ChevronDown
                            className={`size-4 transition-transform duration-200 ${showInstructions ? "rotate-180" : ""}`}
                            aria-hidden="true"
                        />
                    )}
                </button>
            </div>

            {feedback && (
                <p className="mt-3 text-sm leading-5 text-muted-foreground" role="status">
                    {feedback}
                </p>
            )}

            {showInstructions && (
                <div
                    id="pwa-install-instructions"
                    className="mt-4 rounded-lg border border-line bg-mist3 p-4"
                    role="region"
                    aria-live="polite"
                    aria-labelledby="pwa-install-instructions-title"
                >
                    <h3
                        id="pwa-install-instructions-title"
                        className="text-sm font-bold text-foreground"
                    >
                        {instructions.title}
                    </h3>

                    <ol className="mt-3 flex flex-col gap-2.5">
                        {instructions.steps.map((step, index) => (
                            <li key={step} className="flex items-start gap-3 text-sm leading-5 text-muted-foreground">
                                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-coral-soft text-[11px] font-bold text-coral">
                                    {index + 1}
                                </span>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ol>

                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                        Os nomes e a disponibilidade das opções podem variar conforme o navegador.
                    </p>
                </div>
            )}
        </section>
    );
}
