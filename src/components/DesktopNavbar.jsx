import { BookOpen, CircleHelp, Folder, House, Info } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui";
import { ThemeToggle } from "./ThemeToggle";

const links = [
    ["Início", "/", House],
    ["Categorias", "/categorias", Folder],
    ["Tutoriais", "/tutoriais", BookOpen],
    ["FAQ", "/faq", CircleHelp],
    ["Sobre", "/sobre", Info],
];

const navClass = ({ isActive }) => ["relative inline-block pb-1.5 text-sm font-semibold", "text-muted-ink transition-colors duration-200 hover:text-ink", "after:absolute after:bottom-0 after:left-0", "after:h-[2px] after:w-full", "after:origin-left", "after:bg-coral", "after:transition-transform after:duration-300 after:ease-out", isActive ? "text-ink after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2"].join(" ");

export function DesktopNavbar() {
    return (
        <header className="border-b border-line bg-paper/95">
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

                {/* Navegação */}
                <nav aria-label="Navegação principal" className="flex items-center gap-6">
                    {links.map(([label, to]) => {
                        return (
                            <NavLink key={to} to={to} end={to === "/"} className={navClass}>
                                {label}
                            </NavLink>
                        );
                    })}

                    <ThemeToggle />

                    <a href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                        <Button variant="coral">Precisa de ajuda?</Button>
                    </a>
                </nav>
            </div>
        </header>
    );
}
