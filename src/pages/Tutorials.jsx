import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { HelpCTA } from "../components/HelpCTA2";
import { SearchBar } from "../components/SearchBar";
import { TutorialCard } from "../components/TutorialCard";
import { tutorials } from "../data/tutorials";
import { SectionTransition } from "../components/SectionTransition";
import { Reveal } from "../components/Reveal";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
                    y: 20,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.26,
                    ease: "power2.inOut",
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
            <section className=" mx-auto max-w-6xl px-5 pt-12 pb-14 lg:px-8">
                {query && (
                    <p className="mb-5 text-sm text-muted-ink">
                        {results.length} {results.length === 1 ? "resultado encontrado" : "resultados encontrados"} para “{query}”
                    </p>
                )}
                {results.length ? (
                    <div ref={cardsRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {results.map((tutorial) => (
                            <TutorialCard key={tutorial.id} tutorial={tutorial} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-[#bfd1d6] bg-[#f5f9f9] px-6 py-12 text-center">
                        <h2 className="text-xl font-bold text-ink">Não encontramos nenhum tutorial para essa dúvida.</h2>
                        <p className="mt-3 text-sm text-muted-ink">Tente pesquisar por outra palavra ou envie sua dúvida para nós.</p>
                        <a className="mt-6 inline-block text-sm font-bold text-[#315d70]" href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                            Enviar uma dúvida
                        </a>
                    </div>
                )}
            </section>

            <div className="">
                <HelpCTA />
            </div>
        </main>
    );
}
