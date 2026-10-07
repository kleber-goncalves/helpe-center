import { ExternalLink, ListVideo } from "lucide-react";

import { Youtube } from "@thesvg/react";

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
                sm:p-7
            "
            aria-labelledby="tutorial-completion-title"
        >
            <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">
                PRONTO!
            </p>

            <h2
                id="tutorial-completion-title"
                className="mt-2 text-2xl font-bold text-ink"
            >
                Você concluiu este tutorial.
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-ink">
                Se precisar, volte aos passos e faça com calma.
            </p>

            {externalLearning.length > 0 && (
                <div className="mt-7 border-t border-line pt-6">
                    <div className="max-w-2xl">
                        <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">
                            CONTINUE APRENDENDO
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-ink">
                            Quer se aprofundar?
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-ink">
                            Confira uma videoaula ou playlist completa para
                            continuar estudando este assunto.
                        </p>
                    </div>

                    <div className="mt-5 grid gap-3">
                        {externalLearning.map((item) => {
                            const isPlaylist = item.type === "playlist";
                            const Icon = isPlaylist ? ListVideo : Youtube;
                            const typeLabel = isPlaylist
                                ? "Playlist completa"
                                : "Videoaula completa";

                            const actionLabel = isPlaylist
                                ? "Abrir playlist"
                                : "Assistir videoaula";

                            return (
                                <a
                                    key={`${item.type}-${item.url}`}
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    aria-label={`${item.title} — abrir em nova aba`}
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-4
                                        rounded-xl
                                        border
                                        border-line
                                        !bg-background
                                        p-4
                                        transition-[border-color,background-color,transform]
                                        duration-200
                                        hover:border-coral/40!
                                        focus-visible:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-coral
                                        focus-visible:ring-offset-2
                                        focus-visible:ring-offset-mist
                                        motion-reduce:transform-none
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            size-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            text-coral
                                        "
                                        aria-hidden="true"
                                    >
                                        <Icon className="size-11" />
                                    </span>

                                    <span className="min-w-0 flex-1">
                                        <span className="block text-xs font-bold tracking-[0.12em] text-muted-foreground">{typeLabel}</span>

                                        <span className="mt-1 block text-sm font-bold text-ink">{item.title}</span>

                                        {item.description && <span className="mt-1 block text-sm leading-5 text-muted-ink">{item.description}</span>}
                                    </span>

                                    <span
                                        className="transition-transform
                                        duration-200
                                        group-hover:translate-x-0.5
                                        group-hover:text-coral
                                        motion-reduce:transition-none hidden shrink-0 text-xs font-bold text-muted-foreground sm:inline"
                                    >
                                        {actionLabel}
                                    </span>

                                    <ExternalLink
                                        className="
                                        size-4
                                        shrink-0
                                        text-muted-foreground
                                        transition-transform
                                        duration-200
                                        group-hover:translate-x-0.5
                                        group-hover:text-coral
                                        motion-reduce:transition-none
                                    "
                                        aria-hidden="true"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}
