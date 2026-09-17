import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="mt-16 border-t border-line bg-[#f3f7f7]">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-3 lg:px-8">
                <div>
                    <p className="font-bold text-ink">Central de Ajuda Digital</p>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-muted-ink">Tutoriais simples para resolver dúvidas digitais na escola.</p>
                </div>
                <div>
                    <p className="text-sm font-bold text-ink">Central de Ajuda</p>
                    <div className="mt-3 flex flex-col gap-2 text-sm text-muted-ink">
                        <Link to="/">Início</Link>
                        <Link to="/categorias">Categorias</Link>
                        <Link to="/tutoriais">Tutoriais</Link>
                        <Link to="/faq">FAQ</Link>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold text-ink">Projeto</p>
                    <div className="mt-3 flex flex-col gap-2 text-sm text-muted-ink">
                        <Link to="/sobre">Sobre</Link>
                        <a href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                            Enviar uma dúvida
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-line px-5 py-5 text-center text-xs text-muted-ink">
                <p>Central de Ajuda Digital — Projeto Escolar 2026</p>
                <p className="mt-1">Grupo: Kleber, Cirlene, Divina, Robertin e Carlos. Kleber é o líder do grupo e desenvolvedor da Central de Ajuda Digital.</p>
            </div>
        </footer>
    );
}
