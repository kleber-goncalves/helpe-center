import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className=" border-t border-line bg-[#f3f7f7]">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-3 lg:px-5">
                <div>
                    <p className="font-display text-base font-bold text-foreground">Hauy Conecta</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">Tutoriais simples para alunos, professores e funcionários resolverem suas dúvidas digitais no dia a dia da escola.</p>
                </div>
                <div className="flex flex-col md:px-12">
                    <p className="text-sm font-bold text-coral">Hauy Conecta</p>
                    <div className="mt-3 flex flex-col gap-2 text-sm text-muted-ink">
                        <Link to="/">Início</Link>
                        <Link to="/categorias">Categorias</Link>
                        <Link to="/tutoriais">Tutoriais</Link>
                        <Link to="/faq">FAQ</Link>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold text-coral">Projeto</p>
                    <div className="mt-3 flex flex-col gap-2 text-sm text-muted-ink">
                        <Link to="/sobre">Sobre</Link>
                        <a href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                            Enviar uma dúvida
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-line px-5 py-5 text-center text-xs text-muted-ink">
                <p>Hauy Conecta — Projeto Escolar de tecno e informatica 2026</p>
                <p className="mt-1">Desenvlovido por Kleber, Cirlene, Divina, Robertin e Carlos</p>
            </div>
        </footer>
    );
}
