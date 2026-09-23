import { ArrowLeft, Check, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { Badge, Separator } from "../components/ui";

import { categories } from "../data/categories";

import { findTutorial, tutorials } from "../data/tutorials";

export function Tutorial() {
    const { tutorialId } = useParams();

    const tutorial = findTutorial(tutorialId);

    if (!tutorial) {
        return (
            <main className="mx-auto max-w-4xl px-5 py-14">
                <h1 className="text-3xl font-bold text-ink">Tutorial não encontrado</h1>

                <Link className="mt-5 inline-block font-bold text-muted-foreground" to="/tutoriais">
                    Ver tutoriais
                </Link>
            </main>
        );
    }

    const category = categories.find((item) => item.id === tutorial.category);

    const related = tutorials.filter((item) => item.category === tutorial.category && item.id !== tutorial.id).slice(0, 2);

    const steps = tutorial.steps ?? createSteps(tutorial);

    return (
        <main className="bg-background">
            <div className="mx-auto max-w-4xl px-5 py-10 lg:px-8">
                {/* ==========================================
                    NAVEGAÇÃO
                ========================================== */}

                <nav aria-label="Navegação do tutorial" className="flex flex-wrap items-center gap-2 text-sm text-muted-ink">
                    <Link to="/tutoriais" className="inline-flex items-center gap-2 font-semibold text-ink transition-colors hover:text-coral">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Todos os tutoriais
                    </Link>

                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-ink" aria-hidden="true" />

                    <Link to={`/categorias/${tutorial.category}`} className="font-semibold text-muted-ink transition-colors hover:text-ink">
                        {category?.name ?? tutorial.category}
                    </Link>
                </nav>

                {/* ==========================================
                    CABEÇALHO
                ========================================== */}

                <article className="mt-10">
                    <Badge>{category?.name ?? tutorial.category}</Badge>

                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{tutorial.title}</h1>

                    <p className="mt-4 text-lg leading-7 text-muted-ink">{tutorial.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                        <Badge>{tutorial.difficulty}</Badge>

                        <Badge>{tutorial.duration}</Badge>
                    </div>

                    {/* ==========================================
                        O QUE VOCÊ VAI APRENDER
                    ========================================== */}

                    <section className="mt-10 rounded-xl bg-mist p-6">
                        <h2 className="text-lg font-bold text-ink">O que você vai aprender?</h2>

                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                            {tutorial.learning.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-ink">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden="true" />

                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* ==========================================
                        PASSOS
                    ========================================== */}

                    <div className="mt-10">
                        {steps.map((step, index) => (
                            <section key={step.title} className="py-9 first:pt-0">
                                {/* Número do passo */}

                                <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">PASSO {index + 1}</p>

                                {/* Título */}

                                <h2 className="mt-3 text-2xl font-bold text-ink">{step.title}</h2>

                                {/* Explicação principal */}

                                <p className="mt-3 max-w-2xl leading-7 text-muted-ink">{step.description}</p>

                                {/* =================================
                                        EXEMPLOS
                                    ================================= */}

                                {step.examples?.length > 0 && (
                                    <div className="mt-8 space-y-8">
                                        {step.examples.map((example, exampleIndex) => (
                                            <div key={`${step.title}-${example.title}-${exampleIndex}`} className="overflow-hidden rounded-xl border border-line bg-background">
                                                {/* Cabeçalho do exemplo */}

                                                <div className="border-b border-line bg-mist px-4 py-3">
                                                    <h3 className="font-display text-base font-bold text-ink">{example.title}</h3>

                                                    {example.description && <p className="mt-1 text-sm leading-6 text-muted-ink">{example.description}</p>}
                                                </div>

                                                {/* Imagem */}

                                                {example.image ? (
                                                    <div className="bg-background p-3 sm:p-5">
                                                        <img src={example.image} alt={example.alt ?? ""} loading="lazy" decoding="async" draggable="false" className="mx-auto block h-auto w-full max-w-3xl rounded-lg object-contain" />
                                                    </div>
                                                ) : (
                                                    <div className="grid min-h-48 place-items-center bg-mist px-6 py-12 text-center">
                                                        <p className="text-sm text-muted-foreground">Imagem deste exemplo será adicionada futuramente.</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* =================================
                                        DICA
                                    ================================= */}

                                {step.tip && (
                                    <div className="mt-6 flex gap-3 rounded-lg border border-line bg-mist p-4">
                                        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-coral" aria-hidden="true" />

                                        <div>
                                            <p className="text-sm font-bold text-ink">Dica</p>

                                            <p className="mt-1 text-sm leading-6 text-muted-ink">{step.tip}</p>
                                        </div>
                                    </div>
                                )}

                                {/* =================================
                                        VÍDEO
                                    ================================= */}

                                {step.video && (
                                    <div className="mt-6 overflow-hidden rounded-xl border border-line">
                                        <video controls preload="metadata" className="block h-auto w-full" poster={step.video.poster}>
                                            <source src={step.video.src} type="video/mp4" />
                                            Seu navegador não suporta vídeos.
                                        </video>
                                    </div>
                                )}

                                {/* Separador */}

                                {index < steps.length - 1 && <Separator className="mt-9" />}
                            </section>
                        ))}
                    </div>

                    {/* ==========================================
                        FINAL
                    ========================================== */}

                    <section className="rounded-xl border border-line bg-mist p-6">
                        <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">PRONTO!</p>

                        <h2 className="mt-2 text-2xl font-bold text-ink">Você concluiu este tutorial.</h2>

                        <p className="mt-2 text-sm text-muted-ink">Se precisar, volte aos passos e faça com calma.</p>
                    </section>

                    {/* ==========================================
                        RELACIONADOS
                    ========================================== */}

                    {related.length > 0 && (
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-ink">Você também pode gostar de</h2>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                {related.map((item) => (
                                    <Link key={item.id} to={`/tutoriais/${item.id}`} className="rounded-xl border border-line bg-mist p-5 font-bold text-ink transition-colors hover:bg-mist">
                                        {item.title}

                                        <ChevronRight className="float-right h-5 w-5 text-muted-ink" aria-hidden="true" />
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ==========================================
                        RODAPÉ DO TUTORIAL
                    ========================================== */}

                    <div className="mt-12 flex justify-between border-t border-line pt-6">
                        <Link to="/tutoriais" className="inline-flex items-center gap-1 text-sm font-bold text-muted-foreground transition-colors hover:text-ink">
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                            Todos os tutoriais
                        </Link>
                    </div>
                </article>
            </div>
        </main>
    );
}

/*
 * ==========================================
 * FALLBACK
 * ==========================================
 */

function createSteps(tutorial) {
    return [
        {
            title: "Abra a ferramenta ou arquivo que você vai usar.",

            description: `Comece abrindo o programa ou o arquivo relacionado a “${tutorial.title}”. Se ainda não estiver com ele salvo, escolha uma pasta que você consiga encontrar depois.`,

            examples: [],
            tip: null,
            video: null,
        },

        {
            title: tutorial.learning[0],

            description: "Siga esta etapa com atenção. Faça uma alteração por vez para conferir se tudo ficou como você espera.",

            examples: [],
            tip: null,
            video: null,
        },

        {
            title: tutorial.learning[1] || "Revise o resultado",

            description: "Antes de terminar, confira as informações e salve seu trabalho. Assim, você evita perder o que fez.",

            examples: [],
            tip: null,
            video: null,
        },
    ];
}
