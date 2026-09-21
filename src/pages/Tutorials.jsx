import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { HelpCTA } from "../components/HelpCTA2";
import { Reveal } from "../components/Reveal";
import { SearchBar } from "../components/SearchBar";
import { SectionTransition } from "../components/SectionTransition";
import { TutorialCard } from "../components/TutorialCard";
import { Button } from "../components/ui";

import { tutorials } from "../data/tutorials";

gsap.registerPlugin(ScrollTrigger);

export function Tutorials() {
    const cardsRef = useRef(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("q") || "";
    const normalized = query.trim().toLowerCase();

    /*
     * Sem pesquisa:
     * mostra todos os tutoriais.
     *
     * Com pesquisa:
     * mostra apenas os tutoriais encontrados.
     */
    const results = normalized ? tutorials.filter((tutorial) => [tutorial.title, tutorial.description, tutorial.category, ...tutorial.keywords].join(" ").toLowerCase().includes(normalized)) : tutorials;

    /*
     * Limpar pesquisa
     */
    function clearSearch() {
        const nextParams = new URLSearchParams(searchParams);

        nextParams.delete("q");

        setSearchParams(nextParams);
    }

    /*
     * Animação dos cards
     */
    useGSAP(
        () => {
            const cards = cardsRef.current;

            /*
             * Quando não existem resultados,
             * não existe grid nem cardsRef.
             */
            if (!cards) {
                return;
            }

            const elements = cards.children;

            if (!elements.length) {
                return;
            }

            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (reduceMotion) {
                gsap.set(elements, {
                    autoAlpha: 1,
                    y: 0,
                });

                return;
            }

            gsap.fromTo(
                elements,
                {
                    autoAlpha: 0,
                    y: 30,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.45,
                    stagger: 0.06,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cards,
                        start: "top 88%",
                        once: true,
                    },
                },
            );
        },
        {
            scope: cardsRef,
            dependencies: [query],
            revertOnUpdate: true,
        },
    );

    return (
        <main className="bg-background">
            {/* Hero da página */}
            <div className="bg-mist3">
                <Reveal y={20} ease="sine.out" duration={0.85} className="relative z-20">
                    <div className="mx-auto max-w-6xl px-5 pb-12 pt-14 lg:px-8">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">Biblioteca de</p>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Tutoriais</h1>

                        <p className="mt-4 max-w-xl text-muted-ink">Encontre orientações rápidas para suas dúvidas mais comuns.</p>

                        <div className="mt-8 max-w-3xl">
                            <SearchBar key={query} initialValue={query} />
                        </div>
                    </div>
                </Reveal>

                <Reveal y={22} ease="sine.out" className="relative z-0">
                    <SectionTransition variant="wide" from="mist" to="background" size="medium" animation />
                </Reveal>
            </div>

            {/* Conteúdo */}
            <section className="mx-auto max-w-6xl px-5 pb-14 lg:px-8">
                {/* Informações da busca */}
                {query && (
                    <Reveal y={20} ease="sine.out" duration={0.85}>
                        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                            <p className="text-muted-ink">
                                {results.length} {results.length === 1 ? "resultado encontrado" : "resultados encontrados"} para <span className="font-bold text-searchPesq">“{query}”</span>
                            </p>

                            <button type="button" aria-label="Limpar pesquisa" onClick={clearSearch} className={["cursor-pointer font-bold text-coral", "underline-offset-4 hover:underline", "transition-colors duration-200", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2"].join(" ")}>
                                Limpar pesquisa
                            </button>
                        </div>
                    </Reveal>
                )}

                {/* Resultados */}
                {results.length > 0 ? (
                    <div ref={cardsRef} className="grid gap-4 pt-12 md:grid-cols-2 lg:grid-cols-3">
                        {results.map((tutorial) => (
                            <TutorialCard key={tutorial.id} tutorial={tutorial} />
                        ))}
                    </div>
                ) : (
                    /* Estado vazio */
                    <div className="flex flex-col items-center rounded-xl px-6 text-center">
                        <div className="mx-auto mt-6 w-full max-w-[220px] sm:max-w-[370px]">
                            <img src="/search.png" alt="" />
                        </div>

                        <h2 className="mt-6 text-xl font-bold text-foreground">Não encontramos nenhum tutorial para essa dúvida.</h2>

                        <p className="mt-2 max-w-xl text-base text-muted-foreground">Tente outras palavras, como o nome do programa (Word, Excel, Canva) ou o que você quer fazer (imprimir, anexar, compartilhar), ou envie sua dúvida para nós.</p>

                        <div className="flex flex-row items-center gap-6">
                            <Link to="/categorias" className={["mt-6 inline-block rounded-lg border border-line", "px-4 py-3", "text-sm font-bold text-muted-foreground", "hover:bg-mist", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-offset-2"].join(" ")}>
                                Ver categorias
                            </Link>

                            <a className="mt-6 inline-block" href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                                <Button variant="coral">Enviar uma dúvida</Button>
                            </a>
                        </div>
                    </div>
                )}
            </section>

            {/* CTA */}
            <HelpCTA />
        </main>
    );
}
