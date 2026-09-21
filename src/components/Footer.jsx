import { Link } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const mainLinks = [
    ["Início", "/"],
    ["Categorias", "/categorias"],
    ["Tutoriais", "/tutoriais"],
    ["FAQ", "/faq"],
];

const projectLinks = [["Sobre o projeto", "/sobre"]];

function FooterLink({ to, children, external = false }) {
    const linkRef = useRef(null);
    const lineRef = useRef(null);

    useLayoutEffect(() => {
        // Garante que todos os links começam no estado correto
        gsap.set(linkRef.current, {
            x: 0,
            opacity: 1,
        });

        gsap.set(lineRef.current, {
            width: "0%",
        });
    }, []);

    function animateIn() {
        gsap.to(linkRef.current, {
            x: 4,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
        });

        gsap.to(lineRef.current, {
            width: "100%",
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
        });
    }

    function animateOut() {
        gsap.to(linkRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
        });

        gsap.to(lineRef.current, {
            width: "0%",
            duration: 0.25,
            ease: "power2.inOut",
            overwrite: true,
        });
    }

    const className = ["inline-flex flex-col items-start", "text-sm font-medium !text-muted-ink hover:text-foreground! ", "will-change-transform", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2"].join(" ");

    const content = (
        <>
            <span>{children}</span>

            <span ref={lineRef} className="mt-1 block h-0.5 w-0 bg-coral" aria-hidden="true" />
        </>
    );

    if (external) {
        return (
            <a ref={linkRef} href={to} target="_blank" rel="noreferrer" className={className} onMouseEnter={animateIn} onMouseLeave={animateOut} onFocus={animateIn} onBlur={animateOut}>
                {content}
            </a>
        );
    }

    return (
        <Link ref={linkRef} to={to} className={className} onMouseEnter={animateIn} onMouseLeave={animateOut} onFocus={animateIn} onBlur={animateOut}>
            {content}
        </Link>
    );
}

export function Footer() {
    return (
        <footer className="border-t border-line bg-mist3">
            <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-16">
                <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr] lg:gap-20">
                    {/* Identidade */}
                    <div className="max-w-md">
                        <Link to="/" className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 focus-visible:ring-offset-2">
                            <div className="grid h-11 w-11 shrink-0 place-items-center">
                                <img src="/logo.png" alt="" className="h-full w-full object-contain" />
                            </div>

                            <div className="flex flex-col leading-none">
                                <span className="font-display text-lg font-bold text-foreground">Hauy Conecta</span>

                                <span className="mt-1 text-xs text-muted-ink">Central de Ajuda Digital</span>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-sm text-[15px] leading-7 text-muted-foreground">Tutoriais simples para alunos, professores e funcionários resolverem suas dúvidas digitais no dia a dia da escola.</p>
                    </div>

                    {/* Navegação */}
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.1em] text-coral">Navegação</p>

                        <nav aria-label="Navegação do rodapé" className="mt-5 flex flex-col items-start gap-3  ">
                            {mainLinks.map(([label, to]) => (
                                <FooterLink key={to} to={to}>
                                    {label}
                                </FooterLink>
                            ))}
                        </nav>
                    </div>

                    {/* Projeto */}
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.1em] text-coral">Projeto</p>

                        <div className="mt-5 flex flex-col items-start gap-3">
                            {projectLinks.map(([label, to]) => (
                                <FooterLink key={to} to={to}>
                                    {label}
                                </FooterLink>
                            ))}

                            <FooterLink to="https://forms.gle/9LSAz3PdBqa899KW8" external>
                                Enviar uma dúvida
                            </FooterLink>
                        </div>
                    </div>
                </div>

                {/* Rodapé inferior */}
                <div className="flex flex-col gap-3 md:flex-row items-center justify-between mt-12 border-t border-line pt-6">
                    <div className="flex flex-col gap-3 text-xs text-muted-ink sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-5 text-muted-ink">© 2026 Hauy Conecta — Projeto Escolar de Tecnologia e Informática</p>
                    </div>

                    <div className="flex flex-col items-center md:flex-row  md:gap-1 text-xs text-muted-ink ">
                        <p className="text-xs leading-5 text-muted-ink">Projeto desenvolvido em equipe, integrantes -</p>
                        <p className="text-xs leading-5 text-muted-ink">Kleber | Cirlene | Divina | Robertin | Carlos</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
