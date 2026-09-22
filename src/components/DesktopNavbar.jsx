import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BookOpen, CircleHelp, Folder, House, Info } from "@sketchyicons/react";
import { Link, NavLink } from "react-router-dom";

import { Button } from "./ui";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

const links = [
    ["Início", "/", House],
    ["Categorias", "/categorias", Folder],
    ["Tutoriais", "/tutoriais", BookOpen],
    ["FAQ", "/faq", CircleHelp],
    ["Sobre", "/sobre", Info],
];

const navClass = ({ isActive }) =>
    cn(
        "relative inline-block  pb-1.5 text-sm font-semibold",
        "!text-muted-ink transition-colors duration-200 hover:text-ink!",

        // Linha inferior
        "after:absolute after:bottom-0 after:left-0",
        "after:h-[2px] after:w-full",
        "after:origin-left",
        "after:bg-coral",
        "after:transition-transform after:duration-300",
        "after:ease-out",

        isActive ? "!text-coral hover:!text-coral after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",

        // Acessibilidade
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-coral/40",
        "focus-visible:ring-offset-2",
    );

export function DesktopNavbar() {
    const headerRef = useRef(null);

    useGSAP(
        () => {
            const header = headerRef.current;

            if (!header) return;

            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
             * Respeita acessibilidade de movimento reduzido
             */
            if (reduceMotion) {
                return;
            }

            /*
             * Função para transformar
             * o navbar em uma ilha flutuante.
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
             * Função para devolver
             * o navbar ao estado normal.
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
        },
    );

    return (
        <>
            {/* Navbar */}
            <header ref={headerRef} className={cn("fixed left-0 top-0 z-[60]", "border-b border-line", "bg-paper/95", "backdrop-blur-sm", "will-change-[top,left,width,transform,border-radius,background-color,backdrop-filter,box-shadow]")}>
                <div className={cn("mx-auto flex h-18 max-w-6xl", "items-center justify-between", "px-5 lg:px-8")}>
                    {/* Logo */}
                    <Link to="/" className={cn("flex items-center gap-2", "rounded-lg", "text-sm font-bold text-ink", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2")}>
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg">
                            <img src="/logo.png" fetchPriority="high" draggable="false" decoding="async" className="h-full w-full object-contain" />
                        </div>

                        <div className="flex flex-col leading-tight">
                            <span className="text-lg font-bold text-ink">Hauy Conecta</span>

                            <span className="text-xs text-muted-ink">Central de Ajuda Digital</span>
                        </div>
                    </Link>

                    {/* Navegação */}
                    <nav aria-label="Navegação principal" className="flex items-center gap-6">
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
                </div>
            </header>

            {/* Espaço reservado para o navbar fixo */}
            <div className="h-18" aria-hidden="true" />
        </>
    );
}
