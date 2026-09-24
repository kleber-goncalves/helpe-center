import { Lightbulb } from "lucide-react";

import { TutorialVideo } from "./TutorialVideo";
import { TutorialStepPreloader } from "./TutorialStepPreloader";

import { useReducedMotion } from "../hooks/useReducedMotion";
import { useTutorialStepMedia } from "../hooks/useTutorialStepMedia";

export function TutorialStep({ step, index }) {
    const reduceMotion = useReducedMotion();

    const { loaded, total, progress, isReady } = useTutorialStepMedia(step);

    if (!isReady) {
        return (
            <section id={`passo-${index + 1}`} aria-labelledby={`passo-titulo-${index + 1}`} className="py-10 first:pt-0">
                <TutorialStepPreloader stepNumber={index + 1} loaded={loaded} total={total} progress={progress} />
            </section>
        );
    }

    return (
        <section
            id={`passo-${index + 1}`}
            aria-labelledby={`passo-titulo-${index + 1}`}
            className={`
                py-10 first:pt-0
                ${reduceMotion ? "" : "animate-[tutorial-step-in_450ms_ease-out]"}
            `}
        >
            <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">PASSO {String(index + 1).padStart(2, "0")}</p>

            <h2 id={`passo-titulo-${index + 1}`} tabIndex="-1" className="mt-3 text-2xl font-bold text-ink sm:text-3xl">
                {step.title}
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-muted-ink">{step.description}</p>

            {step.examples?.length > 0 && (
                <div className="mt-8 space-y-8">
                    {step.examples.map((example, exampleIndex) => (
                        <article
                            key={`${step.title}-${example.title}-${exampleIndex}`}
                            className={`
                                overflow-hidden rounded-xl border border-line bg-background
                                ${reduceMotion ? "" : "transition-[transform,box-shadow,border-color] duration-300  hover:border-coral/30 hover:shadow-soft"}
                            `}
                        >
                            <div className="border-b border-line bg-mist px-4 py-4">
                                <h3 className="font-display text-base font-bold text-ink">{example.title}</h3>

                                {example.description && <p className="mt-1 text-sm leading-6 text-muted-ink">{example.description}</p>}
                            </div>

                            {example.image && (
                                <div className="bg-background p-3 sm:p-5">
                                    <img src={example.image} alt={example.alt ?? ""} loading="eager" decoding="async" draggable="false" className="mx-auto block h-auto w-full max-w-3xl rounded-lg object-contain" />
                                </div>
                            )}

                            {example.video && <TutorialVideo video={example.video} poster={example.poster} />}

                            {!example.image && !example.video && (
                                <div className="grid min-h-48 place-items-center bg-mist px-6 py-12 text-center">
                                    <p className="text-sm text-muted-foreground">Este exemplo ainda não possui imagem ou vídeo.</p>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            )}

            {step.video && <TutorialVideo video={step.video} poster={step.poster} />}

            {step.tip && (
                <aside
                    aria-label="Dica"
                    className={`
                        mt-6 flex gap-3 rounded-lg border border-line bg-mist p-4
                        ${reduceMotion ? "" : "transition-transform duration-200 "}
                    `}
                >
                    <Lightbulb className="mt-0.5 size-5 shrink-0 text-coral" aria-hidden="true" />

                    <div>
                        <p className="text-sm font-bold text-ink">Dica</p>

                        <p className="mt-1 text-sm leading-6 text-muted-ink">{step.tip}</p>
                    </div>
                </aside>
            )}
        </section>
    );
}
