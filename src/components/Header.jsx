import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button, Sheet, SheetContent, SheetTrigger } from "./ui";

const links = [
    ["Início", "/"],
    ["Categorias", "/categorias"],
    ["Tutoriais", "/tutoriais"],
    ["FAQ", "/faq"],
    ["Sobre", "/sobre"],
];
const navClass = ({ isActive }) => `text-sm font-semibold transition-colors hover:text-ink ${isActive ? "text-ink" : "text-muted-ink"}`;

export function Header() {
    return (
        <header className="border-b border-line bg-paper/95">
            <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 lg:px-8">
                <Link to="/" className="flex items-center gap-2 text-sm font-bold text-ink">
                    <div className="grid h-10 w-10 place-items-center rounded-lg ">
                        <img src="/logo.png" alt="" />
                    </div>
                    <div className="leading-tight flex flex-col">
                        <span className="text-lg font-bold text-ink">Hauy Conecta</span>

                        <span className="text-xs text-muted-ink">Central de Ajuda Digital</span>
                    </div>
                </Link>
                <nav className="hidden items-center gap-6 md:flex">
                    {links.map(([label, to]) => (
                        <NavLink key={to} to={to} className={navClass}>
                            {label}
                        </NavLink>
                    ))}
                    <a href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                        <Button variant="coral">Precisa de ajuda?</Button>
                    </a>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="rounded-lg p-2 text-ink hover:bg-mist md:hidden" aria-label="Abrir menu">
                            <Menu className="h-6 w-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent>
                        <nav className="mt-8 flex flex-col gap-5">
                            {links.map(([label, to]) => (
                                <NavLink key={to} to={to} className={navClass}>
                                    {label}
                                </NavLink>
                            ))}
                            <a href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                                <Button variant="coral" className="mt-2 w-full">
                                    Precisa de ajuda?
                                </Button>
                            </a>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
