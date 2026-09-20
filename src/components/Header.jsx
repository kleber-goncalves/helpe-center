import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BookOpen, CircleHelp, Folder, House, Info } from "lucide-react";
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

const navClass = ({ isActive }) => ["relative inline-block pb-1.5 text-sm font-semibold", "text-muted-ink transition-colors duration-200 hover:text-ink", "after:absolute after:bottom-0 after:left-0", "after:h-[2px] after:w-full", "after:origin-left", "after:bg-coral", "after:transition-transform after:duration-300 after:ease-out", isActive ? "text-ink after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2"].join(" ");

export function Header() {
    const [open, setOpen] = useState(false);

    const topBarRef = useRef(null);
    const middleBarRef = useRef(null);
    const bottomBarRef = useRef(null);
    const panelRef = useRef(null);

    const firstRenderRef = useRef(true);

    useLayoutEffect(() => {
        const topBar = topBarRef.current;
        const middleBar = middleBarRef.current;
        const bottomBar = bottomBarRef.current;
        const panel = panelRef.current;

        if (!topBar || !middleBar || !bottomBar) {
            return;
        }

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const duration = reduceMotion ? 0.01 : 0.4;

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

            if (panel) {
                gsap.set(panel, {
                    xPercent: open ? 0 : 100,
                });
            }

            firstRenderRef.current = false;

            return;
        }

        const menuTimeline = gsap.timeline({
            defaults: {
                duration,
                ease: "power3.inOut",
            },
        });

        if (open) {
            // HAMBURGER → X

            menuTimeline
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

            if (panel) {
                gsap.to(panel, {
                    xPercent: 0,
                    duration: 0.48,
                    ease: "power3.out",
                });
            }
        } else {
            // X → HAMBURGER

            menuTimeline
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

            if (panel) {
                gsap.to(panel, {
                    xPercent: 100,
                    duration:  0.38,
                    ease: "power3.in",
                });
            }
        }

        return () => {
            menuTimeline.kill();

            gsap.killTweensOf([topBar, middleBar, bottomBar]);

            if (panel) {
                gsap.killTweensOf(panel);
            }
        };
    }, [open]);

    return (
        <header className="relative  border-b border-line bg-paper/95">
            <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 lg:px-8">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-sm font-bold text-ink">
                    <div className="grid h-10 w-10 place-items-center rounded-lg">
                        <img src="/logo.png" alt="" className="h-full w-full object-contain" />
                    </div>

                    <div className="flex flex-col leading-tight">
                        <span className="text-lg font-bold text-ink">Hauy Conecta</span>

                        <span className="text-xs text-muted-ink">Central de Ajuda Digital</span>
                    </div>
                </Link>

                {/* Desktop */}
                <nav aria-label="Navegação principal" className="hidden items-center gap-6 md:flex">
                    {links.map(([label, to]) => (
                        <NavLink key={to} to={to} end={to === "/"} className={navClass}>
                            {label}
                        </NavLink>
                    ))}

                    <ThemeToggle />

                    <a href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                        <Button variant="coral">Precisa de ajuda?</Button>
                    </a>
                </nav>

                {/* Mobile */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <button
                            type="button"
                            aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                            aria-expanded={open}
                            className="
                                fixed right-5 top-4 z-[100]
                                inline-flex h-10 w-10
                                items-center justify-center
                                rounded-lg
                                border border-line
                                bg-paper
                                text-ink
                                shadow-sm
                                transition-[background-color,border-color,transform]
                                duration-200
                                hover:border-coral/50
                                hover:bg-mist
                                active:scale-95
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-coral/40
                                focus-visible:ring-offset-2
                                md:hidden
                            "
                        >
                            <span className="relative flex h-[18px] w-[18px] items-center justify-center" aria-hidden="true">
                                {/* Linha superior */}
                                {/* Linha superior */}
                                <span
                                    ref={topBarRef}
                                    className="
                                        absolute left-0 top-0
                                        h-[1.75px] w-full
                                        rounded-full
                                        bg-current
                                        will-change-transform
                                    "
                                />

                                {/* Linha central */}
                                <span
                                    ref={middleBarRef}
                                    className="
                                    absolute left-0 top-1/2
                                    h-[1.75px] w-full
                                    -translate-y-1/2
                                    rounded-full
                                    bg-current
                                    will-change-transform
                                "
                                />

                                {/* Linha inferior */}
                                <span
                                    ref={bottomBarRef}
                                    className="
                                        absolute bottom-0 left-0
                                        h-[1.75px] w-full
                                        rounded-full
                                        bg-current
                                        will-change-transform
                                    "
                                />
                            </span>
                        </button>
                    </SheetTrigger>

                    <SheetContent
                        forceMount
                        side="right"
                        className="
                            w-[min(88vw,380px)]
                            border-l border-line
                            bg-paper
                            p-0
                            !animate-none
                            !transition-none
                            will-change-transform
                            [&>button]:hidden
                        "
                    >
                        <div ref={panelRef} className="flex h-full flex-col">
                            {/* Cabeçalho */}
                            <div className="border-b border-line px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-mist3">
                                        <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-base font-bold leading-tight text-ink">Hauy Conecta</p>

                                        <p className="mt-0.5 text-xs text-muted-ink">Central de Ajuda Digital</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navegação */}
                            <nav aria-label="Navegação principal" className="flex-1 px-4 py-5">
                                <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-ink">Navegação</p>

                                <div className="flex flex-col gap-1">
                                    {links.map(([label, to, Icon]) => (
                                        <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => ["group relative flex items-center gap-3", "rounded-lg px-3 py-3", "text-sm font-semibold", "transition-colors duration-200", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2", isActive ? "bg-mist3 text-ink" : "text-muted-ink hover:bg-mist hover:text-ink"].join(" ")}>
                                            {({ isActive }) => (
                                                <>
                                                    <span className={["absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-coral", "transition-opacity duration-200", isActive ? "opacity-100" : "opacity-0"].join(" ")} aria-hidden="true" />

                                                    <Icon className={["h-5 w-5 shrink-0 transition-colors duration-200", isActive ? "text-coral" : "text-muted-ink group-hover:text-ink"].join(" ")} strokeWidth={1.8} aria-hidden="true" />

                                                    <span>{label}</span>
                                                </>
                                            )}
                                        </NavLink>
                                    ))}
                                </div>
                            </nav>

                            {/* Rodapé */}
                            <div className="border-t border-line p-5">
                                <div className="mb-4 flex items-center justify-between rounded-lg bg-mist3 px-3 py-2">
                                    <span className="text-sm font-semibold text-ink">Tema</span>

                                    <ThemeToggle />
                                </div>

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
        </header>
    );
}
