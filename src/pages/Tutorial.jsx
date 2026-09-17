import { Check, ChevronLeft, ChevronRight, Monitor } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Badge, Separator } from "../components/ui";
import { categories } from "../data/categories";
import { findTutorial, tutorials } from "../data/tutorials";
export function Tutorial() {
    const { tutorialId } = useParams();
    const tutorial = findTutorial(tutorialId);
    if (!tutorial)
        return (
            <main className="mx-auto max-w-4xl px-5 py-14">
                <h1 className="text-3xl font-bold text-ink">Tutorial não encontrado</h1>
                <Link className="mt-5 inline-block font-bold text-[#315d70]" to="/tutoriais">
                    Ver tutoriais
                </Link>
            </main>
        );
    const category = categories.find((item) => item.id === tutorial.category);
    const related = tutorials.filter((item) => item.category === tutorial.category && item.id !== tutorial.id).slice(0, 2);
    const steps = tutorial.steps ?? createSteps(tutorial);
    return (
        <main className="mx-auto max-w-4xl px-5 py-10 lg:px-8">
            <nav className="flex flex-wrap gap-2 text-sm text-muted-ink">
                <Link to="/">Início</Link>
                <span>/</span>
                <Link to={`/categorias/${category.id}`}>{category.name}</Link>
                <span>/</span>
                <span className="text-ink">{tutorial.title}</span>
            </nav>
            <article className="mt-10">
                <Badge>{category.name}</Badge>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{tutorial.title}</h1>
                <p className="mt-4 text-lg leading-7 text-muted-ink">{tutorial.description}</p>
                <div className="mt-5 flex gap-2">
                    <Badge>{tutorial.difficulty}</Badge>
                    <Badge>{tutorial.duration}</Badge>
                </div>
                <section className="mt-10 rounded-xl bg-[#f0f6f7] p-6">
                    <h2 className="text-lg font-bold text-ink">O que você vai aprender?</h2>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {tutorial.learning.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-[#31566a]">
                                <Check className="h-4 w-4 text-coral" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>
                <div className="mt-10">
                    {steps.map((step, index) => (
                        <section key={step.title} className="py-9 first:pt-0">
                            <p className="text-xs font-bold tracking-[0.16em] text-[#527282]">PASSO {index + 1}</p>
                            <h2 className="mt-3 text-2xl font-bold text-ink">{step.title}</h2>
                            <p className="mt-3 max-w-2xl leading-7 text-muted-ink">{step.description}</p>
                            <div className="mt-6 grid min-h-48 place-items-center rounded-xl border border-dashed border-[#b9cbd1] bg-[#f7faf9] text-center">
                                <div>
                                    <Monitor className="mx-auto h-7 w-7 text-[#6e919d]" />
                                    <p className="mt-3 text-sm font-semibold text-[#527282]">Área para screenshot</p>
                                    <p className="mt-1 text-xs text-muted-ink">{step.title}</p>
                                </div>
                                <div>
                                    <img src={step.image} alt={step.imgAlt} className="block h-auto w-full object-contain" />

                                    
                                </div>
                            </div>
                            {index < steps.length - 1 && <Separator className="mt-9" />}
                        </section>
                    ))}
                </div>
                <section className="rounded-xl border border-[#bcd0d5] bg-[#f5f9f9] p-6">
                    <p className="text-xs font-bold tracking-[0.16em] text-[#527282]">PRONTO!</p>
                    <h2 className="mt-2 text-2xl font-bold text-ink">Você concluiu este tutorial.</h2>
                    <p className="mt-2 text-sm text-muted-ink">Se precisar, volte aos passos e faça com calma.</p>
                </section>
                {related.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold text-ink">Você também pode gostar de</h2>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {related.map((item) => (
                                <Link key={item.id} to={`/tutoriais/${item.id}`} className="rounded-xl border border-line bg-white p-5 font-bold text-ink transition-colors hover:bg-mist">
                                    {item.title}
                                    <ChevronRight className="float-right h-5 w-5 text-muted-ink" />
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
                <div className="mt-12 flex justify-between border-t border-line pt-6">
                    <Link to="/tutoriais" className="inline-flex items-center gap-1 text-sm font-bold text-[#315d70]">
                        <ChevronLeft className="h-4 w-4" />
                        Todos os tutoriais
                    </Link>
                </div>
            </article>
        </main>
    );
}
function createSteps(tutorial) {
    return [
        { title: `Abra a ferramenta ou arquivo que você vai usar.`, description: `Comece abrindo o programa ou o arquivo relacionado a “${tutorial.title}”. Se ainda não estiver com ele salvo, escolha uma pasta que você consiga encontrar depois.` },
        { title: tutorial.learning[0], description: "Siga esta etapa com atenção. Faça uma alteração por vez para conferir se tudo ficou como você espera." },
        { title: tutorial.learning[1] || "Revise o resultado", description: "Antes de terminar, confira as informações e salve seu trabalho. Assim, você evita perder o que fez." },
    ];
}
