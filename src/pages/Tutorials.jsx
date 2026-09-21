import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { HelpCTA } from "../components/HelpCTA2";
import { SearchBar } from "../components/SearchBar";
import { TutorialCard } from "../components/TutorialCard";
import { tutorials } from "../data/tutorials";
import { SectionTransition } from "../components/SectionTransition";
import { Reveal } from "../components/Reveal";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "../components/ui";
gsap.registerPlugin(ScrollTrigger);

export function Tutorials() {
    const cardsRef = useRef(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const normalized = query.toLowerCase();
    const results = tutorials.filter((tutorial) => [tutorial.title, tutorial.description, tutorial.category, ...tutorial.keywords].join(" ").toLowerCase().includes(normalized));

    useGSAP(
        () => {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (reduceMotion) return;

            gsap.fromTo(
                cardsRef.current.children,
                {
                    autoAlpha: 0,
                    y: 70,
                },
                {
                    delay: 0.2,
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.12,
                    stagger: 0.2,
                    ease: "power1.InOut",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 88%",
                        once: true,
                    },
                },
            );
        },
        { scope: cardsRef },
    );
    return (
        <main className="bg-background">
            <div className="bg-mist3">
                <Reveal y={20} ease="sine.out" duration={0.85} className="relative z-20">
                    <div className=" mx-auto max-w-6xl px-5 pt-14 pb-12  lg:px-8">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">Biblioteca de</p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Tutoriais</h1>
                        <p className="mt-4 max-w-xl text-muted-ink">Encontre orientações rápidas para suas dúvidas mais comuns.</p>
                        <div className="mt-8 max-w-3xl">
                            <SearchBar initialValue={query} />
                        </div>
                    </div>
                </Reveal>
                <Reveal y={22} ease="sine.out" className="relative z-0">
                    <SectionTransition variant="wide" from="mist" to="background" size="medium" animation />
                </Reveal>
            </div>
            <section className=" mx-auto max-w-6xl px-5  pb-14 lg:px-8">
                {query && (
                    <p className="mb-5 text-sm text-muted-ink">
                        {results.length} {results.length === 1 ? "resultado encontrado" : "resultados encontrados"} para “{query}”
                    </p>
                )}
                {results.length ? (
                    <div ref={cardsRef} className="grid gap-4 pt-12 md:grid-cols-2 lg:grid-cols-3">
                        {results.map((tutorial) => (
                            <TutorialCard key={tutorial.id} tutorial={tutorial} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center rounded-xl px-6 text-center">
                        <div className="w-full max-w-[220px] sm:max-w-[370px] mx-auto mt-6">
                            <img src="/search.png" alt="" srcset="" />
                        </div>
                        <h2 className="mt-6 text-xl font-bold text-foreground">Não encontramos nenhum tutorial para essa dúvida.</h2>
                        <p className="mt-2 text-base text-muted-foreground max-w-xl">Tente outras palavras, como o nome do programa (Word, Excel, Canva) ou o que você quer fazer (imprimir, anexar, compartilhar), ou envie sua dúvida para nós.</p>
                        <div className="flex flex-row gap-6 items-center">
                            <Link
                                to="/categorias"
                                className="mt-6 inline-block border border-line
                            px-4 py-3 hover:bg-mist rounded-lg text-sm font-bold text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 focus-visible:ring-offset-2"
                            >
                                Ver categorias
                            </Link>
                            <a className="mt-6 inline-block text-sm font-bold text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 focus-visible:ring-offset-2" href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                                <Button variant="coral">Enviar uma dúvida</Button>
                            </a>
                        </div>
                    </div>
                )}
            </section>

            <div className="">
                <HelpCTA />
            </div>
        </main>
    );
}
