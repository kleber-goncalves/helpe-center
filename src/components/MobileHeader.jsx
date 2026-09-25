import { useLayoutEffect, useRef, useState } from "react";

import { gsap } from "gsap";

import { BookOpen, CircleHelp, Folder, House, Info, MessageCircleQuestion } from "@sketchyicons/react";

import { Accessibility, ChevronLeft, ChevronRight } from "lucide-react";

import { Link, NavLink } from "react-router-dom";

import { Button, Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui";

import { ThemeToggle } from "./ThemeToggle";
import { AccessibilityPanel } from "./AccessibilityMenu";

const links = [
    ["Início", "/", House],
    ["Categorias", "/categorias", Folder],
    ["Tutoriais", "/tutoriais", BookOpen],
    ["FAQ", "/faq", CircleHelp],
    ["Assistente", "/assistente", MessageCircleQuestion],
    ["Sobre", "/sobre", Info],
];

export function MobileHeader() {
    const [open, setOpen] = useState(false);

    /*
     * navigation = menu principal
     * accessibility = painel de acessibilidade
     */
    const [menuView, setMenuView] = useState("navigation");

    const accessibilityButtonRef = useRef(null);

    const backButtonRef = useRef(null);

    const topBarRef = useRef(null);

    const middleBarRef = useRef(null);

    const bottomBarRef = useRef(null);

    const firstRenderRef = useRef(true);

    /*
     * ==========================================
     * ANIMAÇÃO DO MENU
     * ==========================================
     */
    useLayoutEffect(() => {
        const topBar = topBarRef.current;

        const middleBar = middleBarRef.current;

        const bottomBar = bottomBarRef.current;

        if (!topBar || !middleBar || !bottomBar) {
            return;
        }

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (firstRenderRef.current) {
            gsap.set(topBar, {
                y: open ? 8 : 0,
                rotation: open ? 45 : 0,
                transformOrigin: "center center",
            });

            gsap.set(middleBar, {
                scaleX: open ? 0 : 1,
                autoAlpha: open ? 0 : 1,
                transformOrigin: "center center",
            });

            gsap.set(bottomBar, {
                y: open ? -8 : 0,
                rotation: open ? -45 : 0,
                transformOrigin: "center center",
            });

            firstRenderRef.current = false;

            return;
        }

        const timeline = gsap.timeline({
            defaults: {
                duration: reduceMotion ? 0.01 : 0.4,
                ease: "power3.inOut",
            },
        });

        if (open) {
            // ☰ → ✕
            timeline
                .to(
                    topBar,
                    {
                        y: 8,
                        rotation: 45,
                    },
                    0,
                )
                .to(
                    middleBar,
                    {
                        scaleX: 0,
                        autoAlpha: 0,
                        duration: reduceMotion ? 0.01 : 0.18,
                        ease: "power2.out",
                    },
                    0,
                )
                .to(
                    bottomBar,
                    {
                        y: -8,
                        rotation: -45,
                    },
                    0,
                );
        } else {
            // ✕ → ☰
            timeline
                .to(
                    topBar,
                    {
                        y: 0,
                        rotation: 0,
                    },
                    0,
                )
                .to(
                    bottomBar,
                    {
                        y: 0,
                        rotation: 0,
                    },
                    0,
                )
                .to(
                    middleBar,
                    {
                        scaleX: 1,
                        autoAlpha: 1,
                        duration: reduceMotion ? 0.01 : 0.2,
                        ease: "power2.out",
                    },
                    0.08,
                );
        }

        return () => {
            timeline.kill();
        };
    }, [open]);

    /*
     * ==========================================
     * CONTROLE DE ABERTURA/FECHAMENTO
     * ==========================================
     *
     * Quando o Sheet fecha, voltamos para
     * navigation sem precisar de useEffect.
     */
    function handleSheetOpenChange(nextOpen) {
        setOpen(nextOpen);

        if (!nextOpen) {
            setMenuView("navigation");
        }
    }

    /*
     * ==========================================
     * ABRIR ACESSIBILIDADE
     * ==========================================
     */
    function openAccessibility() {
        setMenuView("accessibility");

        /*
         * O botão de voltar só existe depois
         * que React renderiza accessibility.
         */
        requestAnimationFrame(() => {
            backButtonRef.current?.focus();
        });
    }

    function closeAccessibilityMenu() {
        setOpen(false);
    }

    /*
     * ==========================================
     * VOLTAR PARA NAVEGAÇÃO
     * ==========================================
     */
    function backToNavigation() {
        setMenuView("navigation");

        requestAnimationFrame(() => {
            accessibilityButtonRef.current?.focus();
        });
    }

    return (
        <>
            {/* ========================================
                HEADER FIXO
            ======================================== */}
            <header className={["fixed inset-x-0 top-0 z-[60]", "border-b", "transition-[background-color,border-color,box-shadow]", "duration-300 ease-out", open ? "border-line bg-paper backdrop-blur-none shadow-none" : "border-line/70 bg-paper/65 backdrop-blur-sm backdrop-saturate-150 shadow-[0_8px_32px_rgb(0_0_0_/_0.08)]"].join(" ")}>
                <div className={["pointer-events-none absolute inset-x-0 bottom-0 h-px", "transition-opacity duration-300", open ? "opacity-0" : "opacity-60", "bg-foreground/10"].join(" ")} />

                <div className="mx-auto flex h-16 items-center justify-between px-5">
                    {/* =================================
                        LOGO
                    ================================= */}
                    <Link to="/" className={["flex items-center gap-2", "rounded-lg", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2"].join(" ")}>
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg">
                            <img src="/logo.png" alt="Hauy Conecta" fetchPriority="high" draggable="false" decoding="async" className="h-full w-full object-contain" />
                        </div>

                        <div className="flex flex-col leading-tight">
                            <span className="text-base font-bold text-ink">Hauy Conecta</span>

                            <span className="text-[11px] text-muted-ink">Central de Ajuda Digital</span>
                        </div>
                    </Link>

                    <div />

                    <div className="flex flex-row items-center justify-center gap-2 px-3 py-2">
                        <ThemeToggle iconClassName="h-6 w-6" />

                        {/* =================================
                            MENU
                        ================================= */}
                        <Sheet open={open} onOpenChange={handleSheetOpenChange}>
                            <SheetTrigger asChild>
                                <button type="button" aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"} aria-expanded={open} className={["relative z-[70]", "inline-flex h-10 w-10", "items-center justify-center", "rounded-lg border border-line", "bg-paper text-ink", "shadow-sm", "transition-[background-color,border-color,transform]", "duration-200", "hover:border-coral/50", "hover:bg-mist", "active:scale-95", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2"].join(" ")}>
                                    <span className="relative flex h-[18px] w-[18px]" aria-hidden="true">
                                        {/* Top */}
                                        <span ref={topBarRef} className={["absolute left-0 top-0", "h-[1.75px] w-full", "rounded-full bg-current", "will-change-transform"].join(" ")} />

                                        {/* Middle */}
                                        <span ref={middleBarRef} className={["absolute left-0 top-1/2", "h-[1.75px] w-full", "-translate-y-1/2", "rounded-full bg-current", "will-change-transform"].join(" ")} />

                                        {/* Bottom */}
                                        <span ref={bottomBarRef} className={["absolute bottom-0 left-0", "h-[1.75px] w-full", "rounded-full bg-current", "will-change-transform"].join(" ")} />
                                    </span>
                                </button>
                            </SheetTrigger>

                            {/* =================================
                                SIDEBAR
                            ================================= */}
                            <SheetContent side="right" className={["top-16", "h-[calc(100dvh-4rem)]", "w-[min(88vw,380px)]", "border-l border-line", "bg-paper", "p-0", "overflow-hidden", "[&>button]:hidden"].join(" ")}>
                                <div className="flex h-full min-h-0 flex-col">
                                    {/* =================================
                                        CABEÇALHO
                                    ================================= */}
                                    <div className="shrink-0 border-b border-line px-4 py-4">
                                        <div className="flex min-h-8 items-center justify-between gap-3">
                                            <div className="flex  flex-row w-full items-center  gap-2">
                                                {menuView === "accessibility" && (
                                                    <button ref={backButtonRef} type="button" onClick={backToNavigation} aria-label="Voltar ao menu de navegação" className={["inline-flex shrink-0", "cursor-pointer", "items-center gap-1", "rounded-md", "px-1.5 py-1", "text-sm font-semibold", "text-muted-ink", "transition-colors", "hover:bg-mist", "hover:text-ink", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40"].join(" ")}>
                                                        <ChevronLeft className="size-4" strokeWidth={2} aria-hidden="true" />

                                                        <span>Voltar</span>
                                                    </button>
                                                )}

                                                {menuView === "accessibility" && <span className="font-bold text-muted-ink">|</span>}

                                                <SheetTitle className="truncate font-display text-base font-bold text-ink">{menuView === "accessibility" ? "Acessibilidade" : "Menu"}</SheetTitle>
                                            </div>
                                        </div>

                                        <SheetDescription className="mt-4 text-xs leading-5 text-muted-ink">{menuView === "accessibility" ? "Ajuste a experiência do site às suas necessidades." : "Navegação principal do Hauy Conecta."}</SheetDescription>
                                    </div>

                                    {/* =================================
                                        MENU PRINCIPAL
                                    ================================= */}
                                    {menuView === "navigation" && (
                                        <>
                                            <nav aria-label="Navegação principal" className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
                                                <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-ink">Navegação</p>

                                                <div className="flex flex-col gap-1">
                                                    {links.map(([label, to, Icon]) => (
                                                        <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => ["group relative flex items-center gap-3", "rounded-lg px-3 py-3", "text-sm font-semibold", "transition-colors duration-200", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2", isActive ? "bg-mist3 text-ink" : "text-muted-ink hover:bg-mist hover:text-ink"].join(" ")}>
                                                            {({ isActive }) => (
                                                                <>
                                                                    <span className={["absolute left-0 top-1/2", "h-6 w-[3px]", "-translate-y-1/2", "rounded-full bg-coral", "transition-opacity duration-200", isActive ? "opacity-100" : "opacity-0"].join(" ")} aria-hidden="true" />

                                                                    <Icon className={["h-5 w-5 shrink-0", "transition-colors duration-200", isActive ? "text-coral" : "text-muted-ink group-hover:text-ink"].join(" ")} strokeWidth={1.8} aria-hidden="true" />

                                                                    <span>{label}</span>
                                                                </>
                                                            )}
                                                        </NavLink>
                                                    ))}
                                                </div>

                                                {/* =================================
                                                    ACESSIBILIDADE
                                                ================================= */}
                                                <div className="mt-5 border-t border-line pt-5">
                                                    <button ref={accessibilityButtonRef} type="button" onClick={openAccessibility} aria-haspopup="dialog" className={["group flex w-full", "cursor-pointer items-center", "justify-between gap-3", "rounded-lg px-3 py-3", "text-sm font-semibold", "text-muted-ink", "transition-colors", "hover:bg-mist", "hover:text-ink", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2"].join(" ")}>
                                                        <span className="flex items-center gap-3">
                                                            <Accessibility className="size-5 text-coral" strokeWidth={1.9} aria-hidden="true" />

                                                            <span>Acessibilidade</span>
                                                        </span>

                                                        <ChevronRight className="size-4 text-muted-ink transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.9} aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </nav>

                                            {/* =================================
                                                RODAPÉ
                                            ================================= */}
                                            <div className="shrink-0 border-t border-line p-5">
                                                <Link to="/enviar-duvida" onClick={() => setOpen(false)}>
                                                    <Button variant="coral" className="w-full">
                                                        Precisa de ajuda?
                                                    </Button>
                                                </Link>
                                            </div>
                                        </>
                                    )}

                                    {/* =================================
                                        ACESSIBILIDADE
                                    ================================= */}
                                    {menuView === "accessibility" && (
                                        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
                                            <AccessibilityPanel onClose={closeAccessibilityMenu} />
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* Espaço reservado para header fixo */}
            <div className="h-16" aria-hidden="true" />
        </>
    );
}
