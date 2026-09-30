import { useEffect, useState } from "react";

const STORAGE_KEY = "hauy-conecta-font-scale";

const RESET_EVENT = "hauy-conecta-reset-accessibility";

const FONT_SCALES = {
    small: 1,
    medium: 1.15,
    large: 1.3,
};

const DEFAULT_SCALE = "small";

const SCALE_LABELS = {
    small: "Tamanho de texto padrão.",
    medium: "Tamanho de texto aumentado.",
    large: "Tamanho de texto ampliado.",
};

function getInitialScale() {
    try {
        const savedScale = localStorage.getItem(STORAGE_KEY);

        if (savedScale && Object.prototype.hasOwnProperty.call(FONT_SCALES, savedScale)) {
            return savedScale;
        }
    } catch {
        // localStorage indisponível.
    }

    return DEFAULT_SCALE;
}

export function AccessibilityFontSize() {
    const [scale, setScale] = useState(getInitialScale);

    /*
     * Aplica a escala no elemento <html>
     * e salva a preferência do usuário.
     */
    useEffect(() => {
        const root = document.documentElement;

        const value = FONT_SCALES[scale] ?? FONT_SCALES[DEFAULT_SCALE];

        root.style.setProperty("--accessibility-font-scale", String(value));

        try {
            localStorage.setItem(STORAGE_KEY, scale);
        } catch {
            // localStorage indisponível.
        }
    }, [scale]);

    /*
     * Escuta o comando global para restaurar
     * todas as configurações de acessibilidade.
     *
     * Esse evento é disparado pelo AccessibilityMenu.
     */
    useEffect(() => {
        function handleReset() {
            setScale(DEFAULT_SCALE);
        }

        window.addEventListener(RESET_EVENT, handleReset);

        return () => {
            window.removeEventListener(RESET_EVENT, handleReset);
        };
    }, []);

    /*
     * Diminui um nível.
     */
    function decrease() {
        setScale((current) => {
            if (current === "large") {
                return "medium";
            }

            if (current === "medium") {
                return "small";
            }

            return "small";
        });
    }

    /*
     * Volta ao tamanho padrão.
     */
    function reset() {
        setScale(DEFAULT_SCALE);
    }

    /*
     * Aumenta um nível.
     */
    function increase() {
        setScale((current) => {
            if (current === "small") {
                return "medium";
            }

            if (current === "medium") {
                return "large";
            }

            return "large";
        });
    }

    const isSmall = scale === "small";

    const isMedium = scale === "medium";

    const isLarge = scale === "large";

    const baseButtonClasses = ["cursor-pointer inline-flex size-9", "items-center justify-center", "rounded-md", "border border-line", "text-foreground", "transition-colors", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/50", "focus-visible:ring-offset-2"].join(" ");

    const activeButtonClasses = "border-coral bg-coral-soft text-coral";

    const inactiveButtonClasses = "hover:bg-mist hover:text-coral";

    const disabledButtonClasses = "disabled:cursor-not-allowed disabled:opacity-35";

    return (
        <div className="flex items-center justify-center gap-1" aria-label="Tamanho do texto">
            {/* A− */}
            <button type="button" onClick={decrease} disabled={isSmall} aria-label="Diminuir tamanho do texto" title="Diminuir texto" className={[baseButtonClasses, inactiveButtonClasses, disabledButtonClasses, "text-sm font-bold"].join(" ")}>
                A−
            </button>

            {/* Tamanho padrão */}
            <button type="button" onClick={reset} aria-label="Restaurar tamanho padrão do texto" aria-pressed={isSmall} title="Tamanho padrão" className={[baseButtonClasses, isSmall ? activeButtonClasses : inactiveButtonClasses, "text-xs font-bold"].join(" ")}>
                A
            </button>

            {/* A+ */}
            <button type="button" onClick={increase} disabled={isLarge} aria-label="Aumentar tamanho do texto" title="Aumentar texto" className={[baseButtonClasses, inactiveButtonClasses, disabledButtonClasses, "text-base font-extrabold"].join(" ")}>
                A+
            </button>

            {/* Estado atual para tecnologias assistivas */}
            <span className="sr-only" aria-live="polite">
                {SCALE_LABELS[scale]}
            </span>

            {/* Estado atual adicional para tecnologias assistivas */}
            <span className="sr-only">
                {isMedium && "O tamanho médio está selecionado."}

                {isLarge && "O tamanho grande está selecionado."}
            </span>
        </div>
    );
}
