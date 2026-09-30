import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Home, SearchX } from "@sketchyicons/react";
import { Link, useNavigate } from "react-router-dom";

// GSAP
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// SEO
import { SITE_NAME, setPageTitle, setMetaTag, setMetaProperty, removePageTitle, removeMetaTag, removeMetaProperty } from "../lib/seo";

export function NotFound() {
    const navigate = useNavigate();

    const sectionRef = useRef(null);
    const codeRef = useRef(null);
    const iconRef = useRef(null);
    const contentRef = useRef(null);
    const actionsRef = useRef(null);

    /*
     * =========================================================
     * SEO DA PÁGINA 404
     * =========================================================
     *
     * A página 404 não deve ser indexada.
     *
     * Os links internos continuam podendo ser seguidos
     * através de "noindex, follow".
     *
     */
    useEffect(() => {
        const pageTitle = `Página não encontrada | ${SITE_NAME}`;

        const description = `A página que você está procurando não foi encontrada no ${SITE_NAME}. ` + "Encontre ajuda em nossos tutoriais e categorias.";

        setPageTitle(pageTitle);

        setMetaTag("description", description);

        setMetaTag("robots", "noindex, follow");

        setMetaProperty("og:title", pageTitle);
        setMetaProperty("og:description", description);
        setMetaProperty("og:type", "website");

        setMetaProperty("twitter:card", "summary");
        setMetaProperty("twitter:title", pageTitle);
        setMetaProperty("twitter:description", description);

        return () => {
            removePageTitle();

            removeMetaTag("description");
            removeMetaTag("robots");

            removeMetaProperty("og:title");
            removeMetaProperty("og:description");
            removeMetaProperty("og:type");

            removeMetaProperty("twitter:card");
            removeMetaProperty("twitter:title");
            removeMetaProperty("twitter:description");
        };
    }, []);

    /*
     * =========================================================
     * ANIMAÇÃO DA PÁGINA
     * =========================================================
     */
    useGSAP(
        () => {
            const section = sectionRef.current;
            const code = codeRef.current;
            const icon = iconRef.current;
            const content = contentRef.current;
            const actions = actionsRef.current;

            if (!section || !code || !icon || !content || !actions) {
                return;
            }

            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            /*
             * Sem animação para usuários que
             * preferem movimento reduzido.
             */
            if (reduceMotion) {
                gsap.set([code, icon, content, actions], {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                });

                return;
            }

            gsap.set(code, {
                autoAlpha: 0,
                y: 24,
                scale: 0.96,
            });

            gsap.set(icon, {
                autoAlpha: 0,
                y: 14,
                scale: 0.9,
            });

            gsap.set(content, {
                autoAlpha: 0,
                y: 20,
            });

            gsap.set(actions, {
                autoAlpha: 0,
                y: 14,
            });

            const timeline = gsap.timeline();

            timeline
                .to(code, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power3.out",
                })
                .to(
                    icon,
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: "back.out(1.4)",
                    },
                    "-=0.3",
                )
                .to(
                    content,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    },
                    "-=0.18",
                )
                .to(
                    actions,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out",
                    },
                    "-=0.2",
                );

            return () => {
                timeline.kill();
            };
        },
        {
            scope: sectionRef,
        },
    );

    /*
     * =========================================================
     * VOLTAR PARA A PÁGINA ANTERIOR
     * =========================================================
     *
     * Se não existir histórico útil,
     * leva para a Home.
     */
    function handleGoBack() {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate("/");
    }

    return (
        <main ref={sectionRef} className="relative isolate overflow-hidden bg-background" aria-labelledby="not-found-title">
            <section className="relative flex min-h-[calc(100svh-4rem)] items-center px-5 py-20 sm:px-8 lg:px-10">
                {/* Elemento decorativo */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mist3 opacity-70 blur-3xl" aria-hidden="true" />

                <div className="mx-auto w-full max-w-5xl">
                    <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                        {/* Número 404 */}
                        <div ref={codeRef} className="relative flex justify-center lg:justify-start" aria-hidden="true">
                            <span className={["font-display", "text-[10rem] font-extrabold", "leading-none tracking-[-0.08em]", "text-ink/10", "sm:text-[13rem]", "lg:text-[15rem]"].join(" ")}>404</span>

                            <div ref={iconRef} className={["absolute left-1/2 top-1/2", "-translate-x-1/2 -translate-y-1/2", "grid size-20 place-items-center", "rounded-2xl", "border border-line", "bg-paper", "text-coral", "shadow-soft", "sm:size-24"].join(" ")}>
                                <SearchX className="size-10 sm:size-12" strokeWidth={1.7} />
                            </div>
                        </div>

                        {/* Conteúdo */}
                        <div ref={contentRef} className="max-w-xl">
                            <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-coral">Página não encontrada</p>

                            <h1 id="not-found-title" className={["font-display", "text-4xl font-extrabold", "tracking-tight text-foreground", "sm:text-5xl"].join(" ")}>
                                Essa página não está por aqui.
                            </h1>

                            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">O endereço pode estar incorreto, ter sido alterado ou a página pode não existir mais.</p>

                            <div ref={actionsRef} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                {/* Voltar */}
                                <button type="button" onClick={handleGoBack} className={["inline-flex min-h-11", "cursor-pointer", "items-center justify-center gap-2", "rounded-lg", "border border-line", "bg-background px-4", "text-sm font-semibold", "text-foreground", "transition-colors", "hover:bg-mist", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/50", "focus-visible:ring-offset-2"].join(" ")}>
                                    <ArrowLeft className="size-4" aria-hidden="true" />
                                    Voltar
                                </button>

                                {/* Home */}
                                <Link to="/" className={["inline-flex min-h-11", "items-center justify-center gap-2", "rounded-lg", "bg-mist px-4", "text-sm font-semibold", "border border-line", "text-white", "transition-colors", "hover:bg-[#1d4a60]", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-ink", "focus-visible:ring-offset-2"].join(" ")}>
                                    <Home className="size-4" aria-hidden="true" />
                                    Ir para o início
                                </Link>

                                {/* Tutoriais */}
                                <Link to="/tutoriais" className={["inline-flex min-h-11", "items-center justify-center gap-2", "rounded-lg", "border border-line", "bg-coral px-4", "text-sm font-semibold", "text-muted-foreground", "transition-colors", "hover:bg-coral/15", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/50", "focus-visible:ring-offset-2"].join(" ")}>
                                    <BookOpen className="size-4" aria-hidden="true" />
                                    Ver tutoriais
                                    <ArrowRight className="size-4" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Ajuda secundária */}
                    <div className="mt-16 border-t border-line pt-6">
                        <p className="text-sm text-muted-foreground">Ainda procurando alguma coisa? Acesse as categorias ou pesquise entre os tutoriais do Hauy Conecta.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
