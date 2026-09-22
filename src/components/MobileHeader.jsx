import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BookOpen, CircleHelp, Folder, House, Info } from "@sketchyicons/react";
import { Link, NavLink } from "react-router-dom";
import { Button, Sheet, SheetContent, SheetTrigger } from "./ui";
import { ThemeToggle } from "./ThemeToggle";

const links = [
    ["Início", "/", House],
    ["Categorias", "/categorias", Folder],
    ["Tutoriais", "/tutoriais", BookOpen],
    ["FAQ", "/faq", CircleHelp],
    ["Sobre", "/sobre", Info],
];

export function MobileHeader() {
    const [open, setOpen] = useState(false);

    const topBarRef = useRef(null);
    const middleBarRef = useRef(null);
    const bottomBarRef = useRef(null);

    const firstRenderRef = useRef(true);

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

    return (
        <>
            {/* Header fixo */}
            <header className={["fixed inset-x-0 top-0 z-[60]", "border-b", "transition-[background-color,border-color,box-shadow]", "duration-300 ease-out", open ? "border-line bg-paper backdrop-blur-none shadow-none" : "border-line/70 bg-paper/65 backdrop-blur-sm backdrop-saturate-150 shadow-[0_8px_32px_rgb(0_0_0_/_0.08)]"].join(" ")}>
                <div className={["pointer-events-none absolute inset-x-0 bottom-0 h-px", "transition-opacity duration-300", open ? "opacity-0" : "opacity-60", "bg-foreground/10"].join(" ")} />
                <div className="mx-auto flex h-16 items-center justify-between px-5">
                    {/* Logo */}
                    <Link to="/" className={["flex items-center gap-2", "rounded-lg", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2"].join(" ")}>
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg">
                            <img src="/logo.png" fetchPriority="high" draggable="false" decoding="async" className="h-full w-full object-contain" />
                        </div>

                        <div className="flex flex-col leading-tight">
                            <span className="text-base font-bold text-ink">Hauy Conecta</span>

                            <span className="text-[11px] text-muted-ink">Central de Ajuda Digital</span>
                        </div>
                    </Link>

                    <div></div>
                    <div className=" flex flex-row items-center justify-center  px-3 py-2 gap-2">
                        <ThemeToggle iconClassName="h-6 w-6" />

                        {/* Menu */}
                        <Sheet open={open} onOpenChange={setOpen}>
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

                            {/* Sidebar */}
                            <SheetContent side="right" className={["top-16", "h-[calc(100dvh-4rem)]", "w-[min(88vw,380px)]", "border-l border-line", "bg-paper", "p-0", "[&>button]:hidden"].join(" ")}>
                                <div className="flex h-full flex-col">
                                    {/* Navegação */}
                                    <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto px-4 py-5">
                                        <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-ink">Navegação</p>

                                        <div className="flex flex-col gap-1">
                                            {links.map(([label, to, Icon]) => (
                                                <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => ["group relative flex items-center gap-3", "rounded-lg px-3 py-3", "text-sm font-semibold", "transition-colors duration-200", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2", isActive ? "bg-mist3 text-ink" : "text-muted-ink hover:bg-mist hover:text-ink"].join(" ")}>
                                                    {({ isActive }) => (
                                                        <>
                                                            {/* Indicador ativo */}
                                                            <span className={["absolute left-0 top-1/2", "h-6 w-[3px]", "-translate-y-1/2", "rounded-full bg-coral", "transition-opacity duration-200", isActive ? "opacity-100" : "opacity-0"].join(" ")} aria-hidden="true" />

                                                            <Icon className={["h-5 w-5 shrink-0", "transition-colors duration-200", isActive ? "text-coral" : "text-muted-ink group-hover:text-ink"].join(" ")} strokeWidth={1.8} aria-hidden="true" />

                                                            <span>{label}</span>
                                                        </>
                                                    )}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </nav>

                                    {/* Rodapé */}
                                    <div className="border-t border-line p-5">
                                        <a href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                                            <Button variant="coral" className="w-full">
                                                Precisa de ajuda?
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* Espaço reservado para o header fixo */}
            <div className="h-16" aria-hidden="true" />
        </>
    );
}
