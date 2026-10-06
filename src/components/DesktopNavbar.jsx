import { useEffect, useRef, useState } from "react";
import { BookOpen, CircleHelp, Folder, House, Info, MessageCircleQuestion } from "@sketchyicons/react";
import { ChevronDown } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

// GSAP
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Componentes
import { Button } from "./ui";
import { ThemeToggle } from "./ThemeToggle";

// Hooks
import { useReducedMotion } from "../hooks/useReducedMotion";

import { cn } from "../lib/utils";
import { Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const links = [
    ["Início", "/", House],
    ["Tutoriais", "/tutoriais", BookOpen],
    ["Categorias", "/categorias", Folder],
    ["Assistente", "/assistente", MessageCircleQuestion],
    ["Ferramentas", "/ferramentas", Wrench],
    ["FAQ", "/faq", CircleHelp],
    ["Sobre", "/sobre", Info],
];

const primaryLinks = links.slice(0, 5);
const secondaryLinks = links.slice(5);

const navClass = ({ isActive }) =>
    cn(
        "relative inline-block whitespace-nowrap pb-1.5 text-sm font-semibold",
        "!text-muted-ink transition-colors duration-200 hover:text-ink!",

        /* Linha inferior */
        "after:absolute after:bottom-0 after:left-0",
        "after:h-[2px] after:w-full",
        "after:origin-left",
        "after:bg-coral",
        "after:transition-transform after:duration-300",
        "after:ease-out",

        isActive
            ? "!text-coral hover:!text-coral after:scale-x-100"
            : "after:scale-x-0 hover:after:scale-x-100",

        /* Acessibilidade */
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-coral/40",
        "focus-visible:ring-offset-2",
    );

const compactNavClass = ({ isActive }) =>
    cn(
        "relative inline-block whitespace-nowrap pb-1.5  text-[13px] font-semibold",
        "!text-muted-ink transition-colors duration-200 hover:text-ink!",

        /* Linha inferior */
        "after:absolute after:bottom-0 after:left-0",
        "after:h-[2px] after:w-full",
        "after:origin-left",
        "after:bg-coral",
        "after:transition-transform after:duration-300",
        "after:ease-out",

        isActive
            ? "!text-coral hover:text-coral! after:scale-x-100"
            : "after:scale-x-0 hover:after:scale-x-100",

        /* Acessibilidade */
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-coral/40",
        "focus-visible:ring-offset-2",
    );

function MoreMenu({ isActive }) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        function handlePointerDown(event) {
            if (!rootRef.current?.contains(event.target)) {
                setOpen(false);
            }
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setOpen(false);
                triggerRef.current?.focus();
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <div ref={rootRef} className="relative">
            <button
                ref={triggerRef}
                type="button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((current) => !current)}
                className={cn(
                    "inline-flex min-h-10 items-center gap-1",
                    "whitespace-nowrap rounded-lg px-2",
                    "text-[13px] font-semibold",
                    "transition-colors duration-200",
                    "hover:bg-mist hover:text-ink",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-coral/40",
                    "focus-visible:ring-offset-2",
                    isActive ? "text-coral" : "text-muted-ink",
                )}
            >
                <span>Mais</span>
                <ChevronDown
                    className={cn(
                        "size-4 transition-transform duration-200",
                        open && "rotate-180",
                    )}
                    strokeWidth={1.9}
                    aria-hidden="true"
                />
            </button>

            {open && (
                <div className="absolute right-0 top-full z-[80] mt-2 w-52 rounded-xl border border-line bg-paper p-1.5 shadow-lift">
                    {secondaryLinks.map(([label, to, Icon]) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            onClick={() => setOpen(false)}
                            className={({ isActive: itemActive }) =>
                                cn(
                                    "flex min-h-10 items-center gap-3 rounded-lg px-3 py-2",
                                    "text-sm font-semibold",
                                    "transition-colors duration-200",
                                    "focus-visible:outline-none",
                                    "focus-visible:ring-2",
                                    "focus-visible:ring-coral/40",
                                    "focus-visible:ring-inset",
                                    itemActive
                                        ? "bg-mist3 text-ink"
                                        : "text-muted-ink hover:bg-mist hover:text-ink",
                                )
                            }
                        >
                            {({ isActive: itemActive }) => (
                                <>
                                    <Icon
                                        className={cn(
                                            "size-4 shrink-0",
                                            itemActive ? "text-coral" : "text-muted-ink",
                                        )}
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                    <span>{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
}

export function DesktopNavbar() {
    const headerRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const location = useLocation();

    const moreIsActive = secondaryLinks.some(([label, to]) => {
        void label;
        return location.pathname === to || location.pathname.startsWith(`${to}/`);
    });

    useGSAP(
        () => {
            const header = headerRef.current;

            if (!header) {
                return;
            }

            /*
             * Estado normal
             */
            const docked = {
                top: 0,
                left: "0%",
                xPercent: 0,
                width: "100%",
                maxWidth: "none",
                borderRadius: 0,

                backgroundColor: "color-mix(in srgb, var(--color-paper) 95%, transparent)",

                backdropFilter: "blur(4px)",

                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            };

            /*
             * Estado flutuante
             */
            const floating = {
                top: 16,
                left: "50%",
                xPercent: -50,
                width: "calc(100% - 32px)",
                maxWidth: 1100,
                borderRadius: 16,

                backgroundColor: "color-mix(in srgb, var(--color-paper) 76%, transparent)",

                backdropFilter: "blur(14px)",

                boxShadow: "0 10px 35px rgba(0, 0, 0, 0.10)",
            };

            /*
             * Estado inicial
             */
            gsap.set(header, docked);

            /*
             * Respeita acessibilidade
             * de movimento reduzido.
             */
            if (reduceMotion) {
                return;
            }

            /*
             * Transforma o navbar
             * em uma ilha flutuante.
             */
            const setFloating = () => {
                gsap.to(header, {
                    ...floating,

                    duration: 0.5,

                    ease: "power3.out",

                    overwrite: "auto",
                });
            };

            /*
             * Devolve o navbar
             * ao estado normal.
             */
            const setDocked = () => {
                gsap.to(header, {
                    ...docked,

                    duration: 0.45,

                    ease: "power3.out",

                    overwrite: "auto",
                });
            };

            /*
             * Ativa quando o usuário
             * ultrapassa aproximadamente 200px.
             */
            const trigger = ScrollTrigger.create({
                start: "top -200px",

                onEnter: setFloating,

                onLeaveBack: setDocked,
            });

            return () => {
                trigger.kill();

                gsap.killTweensOf(header);

                gsap.set(header, docked);
            };
        },
        {
            scope: headerRef,
            dependencies: [reduceMotion],
            revertOnUpdate: true,
        },
    );

    return (
        <>
            {/* Navbar */}
            <header
                ref={headerRef}
                className={cn(
                    "fixed left-0 top-0 z-[60]",
                    "border-b border-line",
                    "bg-paper/95",
                    "backdrop-blur-sm",
                    "will-change-[top,left,width,transform,border-radius,background-color,backdrop-filter,box-shadow]",
                )}
            >
                <div
                    className={cn(
                        "mx-auto flex h-21 max-w-6xl items-center justify-between gap-4",
                        "px-5 lg:px-8",
                    )}
                >
                    {/* Identidade */}
                    <Link
                        to="/"
                        className={cn(
                            "flex min-w-0 shrink-0 items-center gap-2",
                            "rounded-lg",
                            "text-sm font-bold text-ink",
                            "focus-visible:outline-none",
                            "focus-visible:ring-2",
                            "focus-visible:ring-coral/40",
                            "focus-visible:ring-offset-2",
                        )}
                    >
                        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white/30 xl:h-17 xl:w-17">
                            <img
                                src="/logo.svg"
                                alt="Hauy Conecta"
                                fetchPriority="high"
                                draggable="false"
                                decoding="async"
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div className="min-w-0 leading-none">
                            <span className="hidden truncate text-sm font-bold text-muted-ink xl:block">
                                E.E.Hauy Petruceli Mayrink
                            </span>

                            <div className="mt-1 flex min-w-0 flex-col gap-y-1">
                                <span className="whitespace-nowrap text-base font-bold leading-none text-ink xl:text-lg">
                                    Hauy Conecta
                                </span>

                                <span className=" whitespace-nowrap text-[10px] leading-none text-muted-ink xl:text-xs">
                                    Central de Ajuda Digital
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Navegação completa: telas grandes */}
                    <nav
                        aria-label="Navegação principal"
                        className="hidden shrink-0 items-center gap-6 xl:flex"
                    >
                        {links.map(([label, to]) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/"}
                                className={navClass}
                            >
                                {label}
                            </NavLink>
                        ))}

                        <ThemeToggle />

                        <Link to="/enviar-duvida">
                            <Button variant="coral" className="whitespace-nowrap">
                                Precisa de ajuda?
                            </Button>
                        </Link>
                    </nav>

                    {/* Navegação compacta: tablets / notebooks menores */}
                    <nav
                        aria-label="Navegação principal compacta"
                        className="flex min-w-0 shrink-0 items-center gap-1.5 md:gap-2 xl:hidden"
                    >
                        {primaryLinks.map(([label, to]) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/"}
                                className={compactNavClass}
                            >
                                {label}
                            </NavLink>
                        ))}

                        <MoreMenu isActive={moreIsActive} />

                        <ThemeToggle iconClassName="h-5 w-5" />

                        <Link to="/enviar-duvida">
                            <Button
                                variant="coral"
                                className="min-h-10 whitespace-nowrap px-3 text-xs"
                            >
                                <span className="hidden lg:inline">Precisa de ajuda?</span>
                                <span className="lg:hidden">Ajuda</span>
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Espaço reservado para o navbar fixo */}
            <div className="h-18" aria-hidden="true" />
        </>
    );
}
