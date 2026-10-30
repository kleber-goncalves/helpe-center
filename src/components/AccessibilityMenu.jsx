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
 * CONTROLE GLOBAL DO LEITOR
 * =====================================================
 *
 * O AccessibilityPanel existe tanto no desktop
 * quanto no mobile.
 *
 * No mobile, o painel pode ser desmontado quando
 * o menu é fechado.
 *
 * Por isso, a fila da leitura fica fora do componente.
 */

let readerSessionId = 0;

let readerChunks = [];

let readerChunkIndex = 0;

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
 * PREPARAR TEXTO PARA FALA
 * =====================================================
 *
 * O texto visual do site NÃO é alterado.
 *
 * Exemplo:
 *
 * Na tela:
 *     Hauy Conecta
 *
 * Para a voz:
 *     Aui Conecta
 *
 * Isso resolve a pronúncia automática de "Hauy"
 * em algumas vozes brasileiras.
 */

function prepareSpeechText(text) {
    return (
        text
            /*
             * Primeiro trata "Hauy Conecta".
             */
            .replace(/\bHauy\s+Conecta\b/gi, "Aui Conecta")

            /*
             * Depois trata "Hauy" sozinho.
             */
            .replace(/\bHauy\b/gi, "Aui")

            /*
             * Pronúncia da sigla da escola.
             *
             * Visualmente continua:
             * E.E. Hauy Petruceli Mayrink
             *
             * Para a voz:
             * Escola Estadual Aui Petruceli Mayrink
             */
            .replace(/\bE\.E\.?\b/gi, "Escola Estadual")
    );
}

/*
 * =====================================================
 * DIVIDIR TEXTO EM BLOCOS
 * =====================================================
 *
 * Evita mandar uma página inteira como um único
 * SpeechSynthesisUtterance.
 */

function splitText(text, maxLength = 220) {
    const normalizedText = text.replace(/\s+/g, " ").trim();

    if (!normalizedText) {
        return [];
    }

    /*
     * Divide primeiro por frases.
     */
    const sentences = normalizedText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [normalizedText];

    const chunks = [];

    let currentChunk = "";

    for (const sentence of sentences) {
        const cleanSentence = sentence.trim();

        if (!cleanSentence) {
            continue;
        }

        /*
         * Se a frase ultrapassar o limite,
         * divide por palavras.
         */
        if (cleanSentence.length > maxLength) {
            if (currentChunk) {
                chunks.push(currentChunk);

                currentChunk = "";
            }

            const words = cleanSentence.split(/\s+/);

            let wordChunk = "";

            for (const word of words) {
                const nextWordChunk = wordChunk ? `${wordChunk} ${word}` : word;

                if (nextWordChunk.length > maxLength && wordChunk) {
                    chunks.push(wordChunk);

                    wordChunk = word;
                } else {
                    wordChunk = nextWordChunk;
                }
            }

            if (wordChunk) {
                chunks.push(wordChunk);
            }

            continue;
        }

        /*
         * Tenta agrupar frases pequenas.
         */
        const nextChunk = currentChunk ? `${currentChunk} ${cleanSentence}` : cleanSentence;

        if (nextChunk.length > maxLength && currentChunk) {
            chunks.push(currentChunk);

            currentChunk = cleanSentence;
        } else {
            currentChunk = nextChunk;
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk);
    }

    return chunks;
}

/*
 * =====================================================
 * ENCONTRAR VOZ BRASILEIRA
 * =====================================================
 *
 * A API fornece as vozes disponíveis no dispositivo.
 *
 * O código tenta:
 *
 * 1. Voz explicitamente pt-BR.
 * 2. Voz cujo nome indique Brasil / português do Brasil.
 * 3. Outra voz pt-BR.
 * 4. Outra voz em português.
 *
 * Não existe garantia de sotaque mineiro na Web Speech API.
 */

function getBrazilianVoice() {
    if (!("speechSynthesis" in window)) {
        return null;
    }

    const voices = window.speechSynthesis.getVoices();

    if (!voices.length) {
        return null;
    }

    /*
     * ==========================================
     * VOZES EXPLICITAMENTE pt-BR
     * ==========================================
     */

    const brazilianVoices = voices.filter((voice) => voice.lang?.toLowerCase() === "pt-br");

    if (brazilianVoices.length > 0) {
        /*
         * Prioriza nomes que normalmente identificam
         * vozes brasileiras.
         */
        const preferredVoice = brazilianVoices.find((voice) => {
            const name = voice.name?.toLowerCase() || "";

            return name.includes("brasil") || name.includes("brazil") || name.includes("português do brasil") || name.includes("portuguese (brazil)");
        });

        if (preferredVoice) {
            return preferredVoice;
        }

        /*
         * Caso exista uma voz default pt-BR,
         * ela é uma boa segunda opção.
         */
        const defaultVoice = brazilianVoices.find((voice) => voice.default);

        if (defaultVoice) {
            return defaultVoice;
        }

        /*
         * Qualquer pt-BR disponível.
         */
        return brazilianVoices[0];
    }

    /*
     * ==========================================
     * FALLBACK PARA OUTRAS VARIAÇÕES DE PT
     * ==========================================
     */

    const portugueseVoice = voices.find((voice) => voice.lang?.toLowerCase().startsWith("pt"));

    return portugueseVoice || null;
}

/*
 * =====================================================
 * CRIAR UTTERANCE
 * =====================================================
 */

function createUtterance(text) {
    const utterance = new SpeechSynthesisUtterance(text);

    const voice = getBrazilianVoice();

    /*
     * Sempre pede português brasileiro.
     *
     * Se houver uma voz pt-BR disponível,
     * ela também será atribuída diretamente.
     */
    utterance.lang = "pt-BR";

    if (voice) {
        utterance.voice = voice;
    }

    /*
     * Velocidade natural para leitura.
     */
    utterance.rate = 0.92;

    /*
     * Pitch neutro.
     */
    utterance.pitch = 1;

    /*
     * Volume máximo.
     */
    utterance.volume = 1;

    return utterance;
}

/*
 * =====================================================
 * PARAR LEITOR
 * =====================================================
 */

function stopReader() {
    /*
     * Invalida imediatamente qualquer fila anterior.
     */
    readerSessionId += 1;

    readerChunks = [];

    readerChunkIndex = 0;

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    setReaderState(false);
}

/*
 * =====================================================
 * LER PRÓXIMO BLOCO
 * =====================================================
 */

function speakNextChunk(sessionId) {
    if (!("speechSynthesis" in window)) {
        setReaderState(false);

        return;
    }

    /*
     * Verifica se esta sessão ainda é válida.
     */
    if (sessionId !== readerSessionId) {
        return;
    }

    /*
     * Não existem mais blocos.
     */
    if (readerChunkIndex >= readerChunks.length) {
        readerChunks = [];

        readerChunkIndex = 0;

        setReaderState(false);

        return;
    }

    const text = readerChunks[readerChunkIndex];

    if (!text) {
        readerChunkIndex += 1;

        speakNextChunk(sessionId);

        return;
    }

    const utterance = createUtterance(text);

    /*
     * =================================================
     * COMEÇOU
     * =================================================
     */

    utterance.onstart = () => {
        if (sessionId !== readerSessionId) {
            return;
        }

        /*
         * Aqui o navegador realmente iniciou a voz.
         */
        setReaderState(true);
    };

    /*
     * =================================================
     * TERMINOU UM BLOCO
     * =================================================
     */

    utterance.onend = () => {
        if (sessionId !== readerSessionId) {
            return;
        }

        readerChunkIndex += 1;

        /*
         * Continua com o próximo bloco.
         */
        if (readerChunkIndex < readerChunks.length) {
            window.setTimeout(() => {
                speakNextChunk(sessionId);
            }, 0);

            return;
        }

        /*
         * Terminou a página inteira.
         */
        readerChunks = [];

        readerChunkIndex = 0;

        setReaderState(false);
    };

    /*
     * =================================================
     * ERRO
     * =================================================
     */

    utterance.onerror = (event) => {
        /*
         * Ignore erros causados pelo cancelamento
         * de uma sessão antiga.
         */
        if (sessionId !== readerSessionId) {
            return;
        }

        /*
         * Cancelamentos também podem gerar
         * eventos de erro em alguns navegadores.
         */
        if (event?.error === "canceled" || event?.error === "interrupted") {
            return;
        }

        readerChunks = [];

        readerChunkIndex = 0;

        setReaderState(false);
    };

    /*
     * =================================================
     * INICIAR
     * =================================================
     */

    window.speechSynthesis.speak(utterance);
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
     * PREPARA AS VOZES
     * ==========================================
     *
     * Em alguns navegadores a lista de vozes
     * não está disponível imediatamente.
     */

    useEffect(() => {
        if (!("speechSynthesis" in window)) {
            return;
        }

        /*
         * Primeira consulta.
         */
        window.speechSynthesis.getVoices();

        function handleVoicesChanged() {
            /*
             * Atualiza a lista interna de vozes
             * do navegador.
             */
            window.speechSynthesis.getVoices();
        }

        window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);

        return () => {
            window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
        };
    }, []);

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
     * ESCUTA MOVIMENTO
     * ==========================================
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

        setHighContrast(nextValue);

        applyContrast(nextValue);

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
         * ======================================
         * SUPORTE
         * ======================================
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
            stopReader();

            onClose?.();

            return;
        }

        /*
         * ======================================
         * LOCALIZAR CONTEÚDO
         * ======================================
         *
         * Primeiro procura uma região específica
         * marcada para leitura.
         *
         * Caso ela não exista, usa o main.
         */

        const readerTarget = document.querySelector("[data-reader-content]");

        const main = readerTarget || document.querySelector("main");

        /*
         * ======================================
         * EXTRAIR TEXTO
         * ======================================
         */

        let text = (main?.innerText || document.body.innerText || "").replace(/\s+/g, " ").trim();

        /*
         * ======================================
         * CORRIGIR PRONÚNCIA
         * ======================================
         *
         * O texto visual continua sendo "Hauy".
         *
         * A alteração existe somente no texto
         * que será enviado para a síntese.
         */

        text = prepareSpeechText(text);

        /*
         * ======================================
         * VALIDAR
         * ======================================
         */

        if (!text) {
            return;
        }

        /*
         * ======================================
         * DIVIDIR TEXTO
         * ======================================
         */

        const chunks = splitText(text, 220);

        if (!chunks.length) {
            return;
        }

        /*
         * ======================================
         * NOVA SESSÃO
         * ======================================
         */

        readerSessionId += 1;

        const currentSessionId = readerSessionId;

        readerChunks = chunks;

        readerChunkIndex = 0;

        /*
         * ======================================
         * INICIAR
         * ======================================
         */

        speakNextChunk(currentSessionId);

        /*
         * ======================================
         * FECHAR MENU
         * ======================================
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
        stopReader();

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

    /*
     * ==========================================
     * TOGGLE
     * ==========================================
     */

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
