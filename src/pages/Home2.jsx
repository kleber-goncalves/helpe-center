import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryCard } from "../components/CategoryCard";
import { HelpCTA } from "../components/HelpCTA2";
import { SearchBar } from "../components/SearchBar";
import { TutorialCard } from "../components/TutorialCard";
import { categories, priorityTopics } from "../data/categories";
import { tutorials } from "../data/tutorials";

export function Home() {
    return (
        <>
            <section className="bg-hero-wash px-0 lg:px-8 ">
                <div className="dot-grid pointer-events-none absolute -right-0 top-19 hidden h-72 w-96 lg:block" aria-hidden="true" />
                <div className=" mx-auto  max-w-6xl flex flex-col md:flex-row justify-between items-center ">
                    <div className="mx-auto max-w-xl px-5 py-18 text-start lg:px-0 lg:py-23">
                        <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl lg:text-[3.4rem]">Olá, como podemos ajudar?</h1>
                        <p className="mt-4 max-w-xl text-lg text-muted-foreground sm:text-xl">Encontre tutoriais simples para resolver suas principais dúvidas digitais.</p>
                        <div className="mx-auto mt-8 max-w-3xl">
                            <SearchBar />
                        </div>
                        <p className="mt-3 text-base text-muted-foreground ">ou escolha uma categoria para encontrar rapidamente a ajuda que você precisa</p>
                    </div>
                    <div className="mx-auto w-full max-w-[390px] sm:max-w-sm lg:max-w-[460px] lg:justify-self-end">
                        <img src="/hero.png" className="object-cover" alt="" />
                    </div>
                </div>
            </section>
            <main className="px-0 lg:px-0  bg-background ">
                <section className="py-9 px-5 flex mx-auto max-w-6xl items-center flex-col">
                    <SectionTitle title="Encontre ajuda por categoria" description="" />
                    <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </section>
                <section className=" bg-mist-wash md:py-23 ">
                    <div className="mx-auto max-w-6xl flex items-center flex-col text-center">
                        <SectionTitle title="O que mais precisa de ajuda?" description="Os assuntos mais citados na pesquisa com a comunidade escolar." />
                        <div className="mt-8 grid gap-x-2 gap-y-2 overflow-hidden sm:grid-cols-2 lg:grid-cols-2">
                            {priorityTopics.map((topic) => (
                                <Link key={topic.title} to={`/categorias/${topic.category}`} className="group bg-white p-5 transition-colors rounded-lg border border-line  hover:bg-[#f7faf9]">
                                    <h3 className="flex items-center justify-between font-bold text-ink">
                                        {topic.title}
                                        <ArrowRight className="h-4 w-4 text-muted-ink group-hover:text-ink" />
                                    </h3>
                                    <p className="mt-2 text-sm leading-5 text-muted-ink">{topic.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="mx-auto px-5 max-w-6xl py-16">
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
                </section>
                <HelpCTA />
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
