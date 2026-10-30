import { BotMessageSquare } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";

import { HauyAssistant } from "./HauyAssistant";

/*
 * =========================================================
 * ELEMENTOS FOCÁVEIS
 * =========================================================
 */

function getFocusableElements(container) {
    if (!container) {
        return [];
    }

    return Array.from(
        container.querySelectorAll(
            [
                "a[href]",
                "button:not([disabled])",
                "textarea:not([disabled])",
                "input:not([disabled])",
                "select:not([disabled])",
                "[tabindex]:not([tabindex='-1'])",
            ].join(","),
        ),
    );
}

/*
 * =========================================================
 * COMPONENTE
 * =========================================================
 */

export function HauyAssistantWidget() {
    const [open, setOpen] = useState(false);

    const dialogRef = useRef(null);

    const triggerRef = useRef(null);

    const inputRef = useRef(null);

    const previousBodyOverflow = useRef("");

    /*
     * =========================================================
     * ABRIR
     * =========================================================
     */

    function openAssistant() {
        setOpen(true);
    }

    /*
     * =========================================================
     * FECHAR
     * =========================================================
     */

    function closeAssistant() {
        setOpen(false);

        requestAnimationFrame(() => {
            triggerRef.current?.focus();
        });
    }

    /*
     * =========================================================
     * TECLADO + FOCO + SCROLL
     * =========================================================
     */

    useEffect(() => {
        if (!open) {
            return;
        }

        const dialog = dialogRef.current;

        if (!dialog) {
            return;
        }

        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        /*
         * =====================================================
         * TECLADO
         * =====================================================
         */

        function handleKeyDown(event) {
            /*
             * ESC
             */

            if (event.key === "Escape") {
                event.preventDefault();

                closeAssistant();

                return;
            }

            /*
             * Desktop não funciona como modal.
             */

            if (event.key !== "Tab" || !isMobile) {
                return;
            }

            /*
             * =================================================
             * TRAP DE FOCO MOBILE
             * =================================================
             */

            const focusable = getFocusableElements(dialog);

            if (focusable.length === 0) {
                event.preventDefault();

                return;
            }

            const first = focusable[0];

            const last = focusable[focusable.length - 1];

            /*
             * Shift + Tab
             */

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();

                last.focus();

                return;
            }

            /*
             * Tab
             */

            if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();

                first.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        /*
         * =====================================================
         * BLOQUEAR SCROLL DO BODY
         * =====================================================
         *
         * Somente no mobile.
         *
         * A conversa dentro do assistente será responsável
         * pelo próprio scroll.
         */

        if (isMobile) {
            previousBodyOverflow.current = document.body.style.overflow;

            document.body.style.overflow = "hidden";
        }

        /*
         * =====================================================
         * VISUAL VIEWPORT
         * =====================================================
         *
         * O Android/Chrome altera o visual viewport quando
         * o teclado virtual aparece.
         *
         * Em vez de deixar o navegador reposicionar todo o
         * conteúdo, ajustamos a altura do painel.
         */

        const visualViewport = window.visualViewport;

        function updateViewport() {
            if (!visualViewport || !dialog) {
                return;
            }

            /*
             * Altura real atualmente visível.
             */

            const height = visualViewport.height;

            /*
             * Offset vertical do viewport visual.
             *
             * Em alguns navegadores Android esse valor pode
             * mudar quando o teclado aparece.
             */

            const offsetTop = visualViewport.offsetTop;

            dialog.style.height = `${height}px`;

            dialog.style.top = `${offsetTop}px`;
            dialog.style.bottom = "auto";
        }

        if (isMobile && visualViewport) {
            updateViewport();

            visualViewport.addEventListener("resize", updateViewport);

            visualViewport.addEventListener("scroll", updateViewport);
        }

        /*
         * =====================================================
         * FOCO INICIAL
         * =====================================================
         *
         * O foco é aplicado uma única vez.
         *
         * preventScroll evita que o navegador tente mover
         * a página para revelar o textarea.
         */

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                inputRef.current?.focus({
                    preventScroll: true,
                });
            });
        });

        /*
         * =====================================================
         * CLEANUP
         * =====================================================
         */

        return () => {
            document.removeEventListener("keydown", handleKeyDown);

            if (isMobile) {
                document.body.style.overflow =
                    previousBodyOverflow.current;
            }

            if (visualViewport) {
                visualViewport.removeEventListener(
                    "resize",
                    updateViewport,
                );

                visualViewport.removeEventListener(
                    "scroll",
                    updateViewport,
                );
            }

            /*
             * Limpa os estilos inline adicionados ao painel.
             */

            if (dialog) {
                dialog.style.height = "";
                dialog.style.top = "";
                dialog.style.bottom = "";
            }
        };
    }, [open]);

    /*
     * =========================================================
     * AMBIENTE SEM DOCUMENT
     * =========================================================
     */

    if (typeof document === "undefined") {
        return null;
    }

    /*
     * =========================================================
     * PORTAL
     * =========================================================
     */

    return createPortal(
        <>
            {/* ==================================================
                PAINEL
            ================================================== */}

            {open && (
                <>
                    {/* =========================================
                        BACKDROP MOBILE
                    ========================================= */}

                    <div
                        className="
                            fixed
                            inset-0
                            z-[220]
                            cursor-pointer
                            bg-ink/35
                            backdrop-blur-[2px]
                            md:hidden
                        "
                        aria-hidden="true"
                        onPointerDown={closeAssistant}
                    />

                    {/* =========================================
                        DIÁLOGO
                    ========================================= */}

                    <div
                        ref={dialogRef}
                        id="hauy-assistant-dialog"
                        role="dialog"
                        aria-modal={window.matchMedia("(max-width: 767px)").matches ? "true" : "false"}
                        aria-labelledby="hauy-assistant-title"
                        className="
                            fixed
                            inset-0
                            z-[230]

                            flex
                            min-h-0
                            w-full
                            flex-col

                            overflow-hidden

                            bg-background

                            md:inset-auto
                            md:bottom-6
                            md:left-6
                            md:h-[min(720px,calc(100dvh-96px))]
                            md:w-[min(420px,calc(100vw-32px))]

                            md:rounded-2xl
                            md:border
                            md:border-line
                            md:shadow-[0_18px_60px_rgb(0_0_0_/_0.18)]
                        "
                    >
                        <span id="hauy-assistant-title" className="sr-only">
                            Assistente Hauy
                        </span>

                        <HauyAssistant compact onClose={closeAssistant} inputRef={inputRef} />
                    </div>
                </>
            )}

            {/* ==================================================
                BOTÃO FLUTUANTE
            ================================================== */}

            {!open && (
                <button
                    ref={triggerRef}
                    type="button"
                    onClick={openAssistant}
                    aria-label="Abrir Assistente Hauy"
                    aria-controls="hauy-assistant-dialog"
                    aria-expanded={false}
                    className="
                        fixed
                        z-50

                        inline-flex
                        min-h-12
                        cursor-pointer
                        items-center
                        gap-2

                        rounded-xl
                        border
                        border-line
                        bg-paper
                        px-4

                        text-sm
                        font-bold
                        text-ink

                        shadow-[0_8px_28px_rgb(0_0_0_/_0.12)]

                        transition-[background-color,border-color,box-shadow,transform]
                        duration-200

                        hover:border-coral
                        hover:bg-mist

                        active:scale-[0.98]

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-coral
                        focus-visible:ring-offset-2

                        /* MOBILE */

                        bottom-[calc(1rem+env(safe-area-inset-bottom))]
                        left-4
                        right-auto

                        /* DESKTOP */

                        md:bottom-6
                        md:left-6
                        md:right-auto
                    "
                >
                    <BotMessageSquare
                        className="
                            size-7
                            text-coral
                        "
                        aria-hidden="true"
                    />

                    <span>Assistente Hauy</span>
                </button>
            )}
        </>,
        document.body,
    );
}
