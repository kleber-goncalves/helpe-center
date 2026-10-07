import { ExternalLink } from "lucide-react";

export function TutorialCompletion({ externalLearning = [] }) {
    return (
        <section
            className="
                mt-8
                max-w-4xl
                rounded-xl
                border
                border-line
                bg-mist
                p-6
            "
        >
            <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">
                PRONTO!
            </p>

            <h2 className="mt-2 text-2xl font-bold text-ink">
                Você concluiu este tutorial.
            </h2>

            <p className="mt-2 text-sm text-muted-ink">
                Se precisar, volte aos passos e faça com calma.
            </p>

            {externalLearning.length > 0 && (
                <div className="mt-6 border-t border-line pt-6">
                    <h3 className="text-lg font-bold text-ink">
                        Quer se aprofundar?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-ink">
                        Confira uma videoaula ou playlist completa sobre este
                        assunto.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                        {externalLearning.map((item) => (
                            <a
                                key={`${item.type}-${item.url}`}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-lg
                                    border
                                    border-line
                                    bg-background
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-bold
                                    text-ink
                                    transition-colors
                                    hover:border-coral/50
                                    hover:text-coral
                                "
                            >
                                {item.title}
                                <ExternalLink className="size-4" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
