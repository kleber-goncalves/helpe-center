import { useEffect, useRef, useState } from "react";

import { Accessibility, Contrast, Eye, RotateCcw, Type, Volume2, VolumeX } from "lucide-react";

import { AccessibilityFontSize } from "./AccessibilityFontSize";

import { cn } from "../lib/utils";

import { getStoredReducedMotion, setReducedMotionPreference, REDUCED_MOTION_EVENT } from "../lib/accessibilityMotion";

const CONTRAST_STORAGE_KEY = "hauy-conecta-high-contrast";

const READER_STORAGE_KEY = "hauy-conecta-reader-active";

const READER_EVENT = "hauy-conecta-reader-state";

const RESET_EVENT = "hauy-conecta-reset-accessibility";

const CONTRAST_EVENT = "hauy-conecta-contrast-change";


/*
 * =====================================================
 * FUNÇÕES DE PERSISTÊNCIA
 * =====================================================
 */

function getStoredBoolean(key) {
    try {
        return localStorage.getItem(key) === "true";
    } catch {
        return false;
    }
}

function setStoredBoolean(key, value) {
    try {
        localStorage.setItem(key, String(value));
    } catch {
        // localStorage indisponível.
    }
}

/*
 * =====================================================
 * ESTADO INICIAL DO LEITOR
 * =====================================================
 */

function getInitialReaderState() {
    const stored = getStoredBoolean(READER_STORAGE_KEY);

    /*
     * Não existe estado salvo.
     */
    if (!stored) {
        return false;
    }

    /*
     * Verifica se a leitura realmente
     * continua acontecendo.
     */
    if ("speechSynthesis" in window && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) {
        return true;
    }

    /*
     * O localStorage ficou com um estado antigo.
     * Limpa para evitar inconsistência.
     */
    setStoredBoolean(READER_STORAGE_KEY, false);

    return false;
}

/*
 * =====================================================
 * ESTADO GLOBAL DO LEITOR
 * =====================================================
 */

function setReaderState(active) {
    setStoredBoolean(READER_STORAGE_KEY, active);

    /*
     * Atualiza outros AccessibilityPanel
     * que estejam montados.
     */
    window.dispatchEvent(
        new CustomEvent(READER_EVENT, {
            detail: {
                active,
            },
        }),
    );
}

/*
 * =====================================================
 * CONTRASTE
 * =====================================================
 */

function applyContrast(enabled) {
    const root = document.documentElement;

    if (enabled) {
        root.dataset.accessibilityContrast = "high";
    } else {
        delete root.dataset.accessibilityContrast;
    }

    setStoredBoolean(CONTRAST_STORAGE_KEY, enabled);

    window.dispatchEvent(
        new CustomEvent(CONTRAST_EVENT, {
            detail: {
                enabled,
            },
        }),
    );
}

/*
 * =====================================================
 * PAINEL DE ACESSIBILIDADE
 * =====================================================
 */

export function AccessibilityPanel({ onClose }) {
    /*
     * ==========================================
     * CONTRASTE
     * ==========================================
     */
    const [highContrast, setHighContrast] = useState(() => getStoredBoolean(CONTRAST_STORAGE_KEY));

    /*
     * ==========================================
     * REDUÇÃO DE MOVIMENTO
     * ==========================================
     *
     * O valor inicial vem diretamente do
     * localStorage.
     */
    const [reducedMotion, setReducedMotion] = useState(() => getStoredReducedMotion());

    /*
     * ==========================================
     * LEITOR
     * ==========================================
     */
    const [isSpeaking, setIsSpeaking] = useState(getInitialReaderState);

    /*
     * ==========================================
     * SINCRONIZA CONTRASTE
     * ==========================================
     */
    useEffect(() => {
        applyContrast(highContrast);
    }, [highContrast]);

    /*
     * ==========================================
     * ESCUTA MUDANÇAS DE MOVIMENTO
     * ==========================================
     *
     * IMPORTANTE:
     *
     * Aqui NÃO fazemos setReducedMotion()
     * imediatamente dentro do effect.
     *
     * O effect apenas registra o listener.
     *
     * O setState acontece depois, quando
     * o evento externo realmente ocorrer.
     */
    useEffect(() => {
        function handleMotionChange(event) {
            const enabled = event.detail?.enabled;

            if (typeof enabled === "boolean") {
                setReducedMotion(enabled);
            }
        }

        window.addEventListener(REDUCED_MOTION_EVENT, handleMotionChange);

        return () => {
            window.removeEventListener(REDUCED_MOTION_EVENT, handleMotionChange);
        };
    }, []);

    /*
     * ==========================================
     * ESCUTA ESTADO DO LEITOR
     * ==========================================
     */
    useEffect(() => {
        function handleReaderState(event) {
            const active = event.detail?.active;

            setIsSpeaking(Boolean(active));
        }

        window.addEventListener(READER_EVENT, handleReaderState);

        return () => {
            window.removeEventListener(READER_EVENT, handleReaderState);
        };
    }, []);

    /*
     * ==========================================
     * ALTO CONTRASTE
     * ==========================================
     */
    function toggleContrast() {
        const nextValue = !highContrast;

        /*
         * Atualiza o estado visual.
         */
        setHighContrast(nextValue);

        /*
         * Aplica imediatamente.
         */
        applyContrast(nextValue);

        /*
         * No mobile fecha.
         * No desktop não faz nada.
         */
        onClose?.();
    }

    /*
     * ==========================================
     * REDUZIR MOVIMENTO
     * ==========================================
     */
    function toggleMotion() {
        const nextValue = !reducedMotion;

        setReducedMotionPreference(nextValue);

        window.location.reload();
    }

    /*
     * ==========================================
     * LEITOR DE PÁGINA
     * ==========================================
     */
    function handleReader() {
        /*
         * Verifica suporte.
         */
        if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
            return;
        }

        /*
         * ======================================
         * PARAR LEITURA
         * ======================================
         */
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending || isSpeaking) {
            window.speechSynthesis.cancel();

            setReaderState(false);

            onClose?.();

            return;
        }

        /*
         * ======================================
         * PEGAR CONTEÚDO
         * ======================================
         */
        const main = document.querySelector("main");

        const text = (main?.innerText || document.body.innerText || "").replace(/\s+/g, " ").trim();

        if (!text) {
            return;
        }

        /*
         * ======================================
         * CRIAR UTTERANCE
         * ======================================
         */
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "pt-BR";

        utterance.rate = 0.95;

        utterance.pitch = 1;

        utterance.volume = 1;

        /*
         * ======================================
         * EVENTOS DA LEITURA
         * ======================================
         */

        utterance.onstart = () => {
            setReaderState(true);
        };

        utterance.onend = () => {
            setReaderState(false);
        };

        utterance.onerror = () => {
            setReaderState(false);
        };

        /*
         * Cancela qualquer leitura anterior.
         */
        window.speechSynthesis.cancel();

        /*
         * Salva o estado ANTES de fechar
         * o painel.
         */
        setReaderState(true);

        /*
         * Inicia a leitura.
         */
        window.speechSynthesis.speak(utterance);

        /*
         * Fecha o painel no mobile.
         *
         * A leitura continua porque não existe
         * cleanup cancelando speechSynthesis.
         */
        onClose?.();
    }

    /*
     * ==========================================
     * RESTAURAR
     * ==========================================
     */
    function resetAccessibility() {
        /*
         * CONTRASTE
         */
        setHighContrast(false);

        applyContrast(false);

        /*
         * MOVIMENTO
         */
        setReducedMotionPreference(false);

        /*
         * LEITURA
         */
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }

        setReaderState(false);

        /*
         * TAMANHO DO TEXTO
         */
        window.dispatchEvent(new CustomEvent(RESET_EVENT));

        /*
         * Recarrega toda a aplicação.
         */
        window.location.reload();
    }

    /*
     * ==========================================
     * CLASSES DOS BOTÕES
     * ==========================================
     */
    const panelButtonClasses = cn("flex w-full cursor-pointer", "items-center justify-between gap-3", "rounded-lg border border-line", "bg-background px-3 py-3", "text-left text-sm font-semibold", "text-foreground", "transition-colors", "hover:bg-mist hover:text-coral", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/50", "focus-visible:ring-offset-2");

    return (
        <div className="flex flex-col gap-5">
            {/* ====================================
                TAMANHO DO TEXTO
            ==================================== */}
            <section>
                <div className="mb-2.5 flex items-center gap-2">
                    <Type className="size-4 text-petrol-soft" strokeWidth={1.9} aria-hidden="true" />

                    <h3 className="text-sm font-bold text-foreground">Tamanho do texto</h3>
                </div>

                <div className="rounded-lg border border-line bg-mist/60 p-2">
                    <AccessibilityFontSize />
                </div>
            </section>

            {/* ====================================
                ALTO CONTRASTE
            ==================================== */}
            <section>
                <div className="mb-2.5 flex items-center gap-2">
                    <Contrast className="size-4 text-petrol-soft" strokeWidth={1.9} aria-hidden="true" />

                    <div>
                        <h3 className="text-sm font-bold text-foreground">Alto contraste</h3>

                        <p className="text-xs text-muted-foreground">Aumenta o contraste dos elementos.</p>
                    </div>
                </div>

                <button type="button" onClick={toggleContrast} aria-pressed={highContrast} className={cn(panelButtonClasses, highContrast && "border-coral bg-coral-soft text-coral")}>
                    <span>{highContrast ? "Alto contraste ativado" : "Ativar alto contraste"}</span>

                    <span aria-hidden="true" className={cn("flex size-5 items-center justify-center", "rounded-full border", highContrast ? "border-coral bg-coral" : "border-line")}>
                        {highContrast && <span className="size-2 rounded-full bg-white" />}
                    </span>
                </button>
            </section>

            {/* ====================================
                MOVIMENTO
            ==================================== */}
            <section>
                <div className="mb-2.5 flex items-center gap-2">
                    <Eye className="size-4 text-petrol-soft" strokeWidth={1.9} aria-hidden="true" />

                    <div>
                        <h3 className="text-sm font-bold text-foreground">Movimento</h3>

                        <p className="text-xs text-muted-foreground">Reduz animações e transições.</p>
                    </div>
                </div>

                <button type="button" onClick={toggleMotion} aria-pressed={reducedMotion} className={cn(panelButtonClasses, reducedMotion && "border-coral bg-coral-soft text-coral")}>
                    <span>{reducedMotion ? "Animações reduzidas" : "Reduzir animações"}</span>

                    <span aria-hidden="true" className={cn("flex size-5 items-center justify-center", "rounded-full border", reducedMotion ? "border-coral bg-coral" : "border-line")}>
                        {reducedMotion && <span className="size-2 rounded-full bg-white" />}
                    </span>
                </button>
            </section>

            {/* ====================================
                LEITURA
            ==================================== */}
            <section>
                <div className="mb-2.5 flex items-center gap-2">
                    {isSpeaking ? <VolumeX className="size-4 text-petrol-soft" strokeWidth={1.9} aria-hidden="true" /> : <Volume2 className="size-4 text-petrol-soft" strokeWidth={1.9} aria-hidden="true" />}

                    <div>
                        <h3 className="text-sm font-bold text-foreground">Leitura da página</h3>

                        <p className="text-xs text-muted-foreground">Leia o conteúdo em voz alta.</p>
                    </div>
                </div>

                <button type="button" onClick={handleReader} aria-pressed={isSpeaking} className={cn(panelButtonClasses, isSpeaking && "border-coral bg-coral-soft text-coral")}>
                    <span>{isSpeaking ? "Parar leitura" : "Ler página em voz alta"}</span>

                    {isSpeaking ? <VolumeX className="size-4 shrink-0" aria-hidden="true" /> : <Volume2 className="size-4 shrink-0" aria-hidden="true" />}
                </button>
            </section>

            {/* ====================================
                RESTAURAR
            ==================================== */}
            <div className="border-t border-line pt-4">
                <button type="button" onClick={resetAccessibility} className={cn("flex min-h-10 w-full", "cursor-pointer items-center", "justify-center gap-2", "rounded-lg px-3", "text-sm font-semibold", "text-muted-ink", "transition-colors", "hover:bg-mist hover:text-coral", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/50")}>
                    <RotateCcw className="size-4" aria-hidden="true" />
                    Restaurar configurações
                </button>
            </div>
        </div>
    );
}

/*
 * =====================================================
 * MENU DE ACESSIBILIDADE DESKTOP
 * =====================================================
 */

export function AccessibilityMenu() {
    const [open, setOpen] = useState(false);

    const containerRef = useRef(null);

    const buttonRef = useRef(null);

    /*
     * ==========================================
     * FECHAR CLICANDO FORA
     * ==========================================
     */
    useEffect(() => {
        if (!open) {
            return;
        }

        function handlePointerDown(event) {
            if (!containerRef.current?.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [open]);

    /*
     * ==========================================
     * ESC
     * ==========================================
     */
    useEffect(() => {
        if (!open) {
            return;
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setOpen(false);

                requestAnimationFrame(() => {
                    buttonRef.current?.focus();
                });
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    function toggleMenu() {
        setOpen((current) => !current);
    }

    return (
        <div ref={containerRef} className="fixed bottom-4 right-4 z-[200] hidden md:block md:bottom-20">
            {/* =================================
                PAINEL
            ================================= */}
            {open && (
                <div id="accessibility-menu" role="dialog" aria-modal="false" aria-label="Opções de acessibilidade" className={cn("fixed bottom-24 right-4", "z-30", "w-[min(calc(100vw-2rem),360px)]", "overflow-hidden", "rounded-xl", "border border-line", "bg-background", "shadow-[0_18px_45px_rgb(0_0_0_/_0.14)]")}>
                    {/* Cabeçalho */}
                    <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <Accessibility className="size-5 text-coral" strokeWidth={1.9} aria-hidden="true" />

                                <h2 className="font-display text-base font-bold text-foreground">Acessibilidade</h2>
                            </div>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">Ajuste a experiência do site às suas necessidades.</p>
                        </div>

                        <button type="button" onClick={toggleMenu} aria-label="Fechar opções de acessibilidade" title="Fechar" className={cn("inline-flex size-8 shrink-0", "cursor-pointer items-center justify-center", "rounded-md", "text-muted-foreground", "transition-colors", "hover:bg-mist", "hover:text-foreground", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/50")}>
                            <span className="sr-only">Fechar</span>

                            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                                <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Conteúdo */}
                    <div className="max-h-[70vh] overflow-y-auto p-4">
                        <AccessibilityPanel />
                    </div>
                </div>
            )}

            {/* =================================
                BOTÃO FIXO
            ================================= */}
            <button ref={buttonRef} type="button" onClick={toggleMenu} aria-haspopup="dialog" aria-expanded={open} aria-controls="accessibility-menu" aria-label="Abrir opções de acessibilidade" title="Acessibilidade" className={cn("group relative z-10 flex", "size-14 cursor-pointer", "items-center justify-center", "rounded-xl", "border border-line", "bg-background", "text-foreground", "shadow-[0_8px_25px_rgb(0_0_0_/_0.12)]", "transition-colors duration-200", "hover:bg-mist", "hover:text-coral", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/50", "focus-visible:ring-offset-2", open && "border-coral bg-coral-soft text-coral")}>
                <Accessibility className="size-8 transition-transform duration-200 group-hover:scale-105" strokeWidth={1.9} aria-hidden="true" />
            </button>
        </div>
    );
}
