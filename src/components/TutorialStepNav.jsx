import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function TutorialStepNav({ steps, activeStep, onNavigate }) {
    const reduceMotion = useReducedMotion();

    const totalSteps = steps.length;
    const progress = totalSteps > 0 ? ((activeStep + 1) / totalSteps) * 100 : 0;

    return (
        <nav aria-label="Etapas do tutorial" className="lg:sticky lg:top-28 lg:self-start">
            {/* Desktop */}
            <div className="hidden lg:block">
                <div className="mb-5">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Passos</p>

                            <p className="mt-1 text-sm text-muted-ink">
                                <span className="font-bold text-ink">{activeStep + 1}</span> de {totalSteps}
                            </p>
                        </div>

                        <span className="text-xs font-semibold text-muted-foreground">{Math.round(progress)}%</span>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist" aria-hidden="true">
                        <div className={cn("h-full origin-left rounded-full bg-coral", !reduceMotion && "transition-[width] duration-500 ease-out")} style={{ width: `${progress}%` }} />
                    </div>
                </div>

                <ol className="relative space-y-1 border-l border-line pl-4">
                    {steps.map((step, index) => {
                        const isActive = index === activeStep;
                        const isPrevious = index < activeStep;

                        return (
                            <li key={`${step.title}-${index}`}>
                                <button type="button" onClick={() => onNavigate(index)} aria-current={isActive ? "step" : undefined} className={cn("group relative flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background", !reduceMotion && "transition-[background-color,color,transform] duration-200", isActive ? "bg-coral-soft text-ink" : "text-muted-foreground hover:bg-mist hover:text-ink")}>
                                    <span className={cn("absolute -left-[21px] top-1/2 flex size-3 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background", !reduceMotion && "transition-transform duration-300", isActive ? "scale-125 bg-coral ring-4 ring-coral/15" : isPrevious ? "bg-coral" : "bg-line")} aria-hidden="true" />

                                    <span className={cn("mt-0.5 shrink-0 text-xs font-bold tabular-nums", isActive ? "text-coral" : "text-muted-foreground")}>{String(index + 1).padStart(2, "0")}</span>

                                    <span className={cn("min-w-0 text-sm leading-5", isActive ? "font-bold" : "font-semibold")}>{step.title}</span>
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </div>

            {/* Mobile */}
            <div className="lg:hidden">
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        Passo {String(activeStep + 1).padStart(2, "0")} de {String(totalSteps).padStart(2, "0")}
                    </p>

                    <span className="text-xs font-semibold text-muted-foreground">{Math.round(progress)}%</span>
                </div>

                <div className="-mx-1 overflow-x-auto px-1 pb-2">
                    <ol className="flex min-w-max gap-2">
                        {steps.map((step, index) => {
                            const isActive = index === activeStep;

                            return (
                                <li key={`${step.title}-${index}`}>
                                    <button type="button" onClick={() => onNavigate(index)} aria-current={isActive ? "step" : undefined} aria-label={`Passo ${index + 1}: ${step.title}`} className={cn("whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-bold", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background", !reduceMotion && "transition-[background-color,border-color,color,transform] duration-200", isActive ? "border-coral bg-coral text-white" : "border-line bg-background text-muted-foreground hover:border-coral/50 hover:text-ink")}>
                                        {String(index + 1).padStart(2, "0")}
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </nav>
    );
}
