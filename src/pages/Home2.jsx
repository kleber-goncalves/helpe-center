import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryCard } from "../components/CategoryCard";
import { HelpCTA } from "../components/HelpCTA2";
import { SearchBar } from "../components/SearchBar";
import { TutorialCard } from "../components/TutorialCard";
import { categories, priorityTopics } from "../data/categories";
import { tutorials } from "../data/tutorials";


import { useRef } from "react";
import { SectionTransition } from "../components/SectionTransition";
import { Reveal } from "../components/Reveal";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
    const priorityTopicsRef = useRef(null);
    
    useGSAP(
        () => {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (reduceMotion) return;

            gsap.fromTo(
                priorityTopicsRef.current.children,
                {
                    autoAlpha: 0,
                    y: 22,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.06,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: priorityTopicsRef.current,
                        start: "top 88%",
                        once: true,
                    },
                },
            );
        },
        { scope: priorityTopicsRef },
    );
    return (
        <>
            <section className=" bg-mist3 px-0 lg:px-0 ">
                <Reveal duration={2} y={32} ease="sine.out">
                    <div className="dot-grid pointer-events-none absolute -right-0 top-19 hidden h-72 w-96 lg:block" aria-hidden="true" />
                    <div className=" mx-auto  max-w-6xl flex flex-col md:flex-row justify-between items-center ">
                        <div className="mx-auto max-w-xl px-5 pt-18 text-start lg:px-0 lg:py-23">
                            <Reveal duration={1} y={32} ease="sine.out">
                                <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl lg:text-[3.4rem]">Olá, como podemos ajudar?</h1>
                            </Reveal>

                            <Reveal duration={0.7} y={20} delay={0.08} ease="sine.out">
                                <p className="mt-4 max-w-xl text-lg text-muted-foreground sm:text-xl">Encontre tutoriais simples para resolver suas principais dúvidas digitais.</p>
                            </Reveal>

                            <Reveal duration={0.7} y={16} delay={0.14} ease="sine.out">
                                <div className="mx-auto mt-8 max-w-3xl">
                                    <SearchBar />
                                </div>
                            </Reveal>

                            <p className="mt-3 text-base text-muted-foreground ">ou escolha uma categoria para encontrar rapidamente a ajuda que você precisa</p>
                        </div>
                        <div
                            className="
                            mb-17
                            md:mb-0
                            relative
                            mx-auto
                            w-full
                            max-w-[390px]
                            sm:max-w-sm
                            lg:max-w-[460px]
                            lg:justify-self-end
                        "
                        >
                            <div
                                className="
                                pointer-events-none
                                absolute
                                bottom-[10%]
                                right-[15%]
                                z-0
                                h-[71%]
                                w-[73%]
                                rounded-3xl
                                bg-coral
                                dark:bg-[#edf4f6]
                            "
                            />

                            <img
                                src="/hero.png"
                                alt=""
                                className="
                                relative
                                z-10
                                block
                                h-auto
                                w-full
                                object-contain
                            "
                            />
                        </div>
                    </div>
                    <SectionTransition variant="wide" from="mist" to="background" size="large" animation />
                </Reveal>
            </section>
            <main className="px-0 lg:px-0  bg-background ">
                <section className="bg-background">
                    <Reveal delay={0.06}>
                        <div className="py-9 px-5 flex mx-auto max-w-6xl items-center flex-col">
                            <SectionTitle title="Encontre ajuda por categoria" description="" />
                            <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
                                {categories.map((category) => (
                                    <CategoryCard key={category.id} category={category} />
                                ))}
                            </div>
                        </div>

                        <SectionTransition variant="ribbon2" from="background" to="mist" size="large" animation />
                    </Reveal>
                </section>
                <section className=" bg-mist3 pt-4  ">
                    <Reveal delay={0.12} y={20} ease="sine.out">
                        <div className="mx-auto max-w-6xl px-5  flex items-center flex-col text-center mb-22">
                            <SectionTitle title="O que mais precisa de ajuda?" description="Os assuntos mais citados na pesquisa com a comunidade escolar." />

                            <div ref={priorityTopicsRef} className="mt-8 grid gap-x-2 gap-y-2 overflow-hidden sm:grid-cols-2 lg:grid-cols-2">
                                {priorityTopics.map((topic) => {
                                    const Icon = topic.icon;
                                    return (
                                        <Link key={topic.title} to={`/categorias/${topic.category}`} className="group flex items-center gap-4 rounded-lg bg-card px-4 py-4 transition-colors border border-line dark:bg-paper/40  hover:text-coral">
                                            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-coral-soft text-coral">
                                                <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                                            </span>
                                            <div className="min-w-0 flex-1 text-left pr-18">
                                                <span className="block font-display text-base font-bold text-foreground">{topic.title}</span>
                                                <span className="block text-sm text-muted-foreground">{topic.description}</span>
                                            </div>
                                            <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-coral" aria-hidden="true" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <SectionTransition variant="fold" from="mist" to="background" size="large" />
                    </Reveal>
                </section>
                <section className="mx-auto px-5 max-w-6xl py-16">
                    <Reveal delay={0.18}>
                        <div className="flex flex-col items-center text-center gap-4 ">
                            <SectionTitle title="Tutoriais mais procurados" description="Passo a passo claro para você aprender e resolver." />
                        </div>
                        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {tutorials.slice(0, 6).map((tutorial) => (
                                <TutorialCard key={tutorial.id} tutorial={tutorial} />
                            ))}
                        </div>
                        <div className="   flex mt-8 flex-col items-center">
                            <Link to="/tutoriais" className="text-sm  border border-mauve-800 px-4 py-2 rounded-lg font-bold text-[#315d70] hover:text-ink flex items-center gap-3">
                                Ver todos os tutoriais
                                <ArrowRight className="h-4 w-4 text-muted-ink" />
                            </Link>
                        </div>
                    </Reveal>
                </section>
                <Reveal delay={0.24} y={16}>
                    <HelpCTA />
                </Reveal>
            </main>
        </>
    );
}

function SectionTitle({ title, description }) {
    return (
        <div>
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{title}</h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">{description}</p>
        </div>
    );
}
