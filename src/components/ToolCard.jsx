import { ArrowUpRight, ExternalLink } from "lucide-react";

import { Badge, Card } from "./ui";

export function ToolCard({ tool }) {
    const providerLogo =
        tool.provider === "iLovePDF" ? "/ilovePDF.svg" : "/iloveIMG.svg";

    return (
        <a
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir a ferramenta ${tool.name} no ${tool.provider}. Abre em uma nova aba.`}
            className="
                group
                block
                rounded-xl
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-coral
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
            "
        >
            <Card
                className="
                    h-full
                    min-h-[220px]
                    p-5
                    transition-[border-color,background-color,transform]
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:border-coral
                    group-hover:bg-mist
                    group-hover:shadow-soft
                    motion-reduce:transform-none
                "
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                        <span
                            className="
                                flex
                                size-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-slate-200
                                bg-white
                            "
                            aria-hidden="true"
                        >
                            <img
                                src={tool.icon.src}
                                alt=""
                                width="36"
                                height="36"
                                loading="lazy"
                                decoding="async"
                                className="size-9 object-contain"
                                onError={(event) => {
                                    const image = event.currentTarget;

                                    if (image.getAttribute("src") !== providerLogo) {
                                        image.setAttribute("src", providerLogo);
                                    }
                                }}
                            />
                        </span>

                        <ExternalLink
                            className="
                                size-4
                                shrink-0
                                text-muted-ink
                                transition-colors
                                group-hover:text-coral
                            "
                            aria-hidden="true"
                        />
                    </div>

                    <div className="mt-5">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-lg font-bold text-ink">
                                {tool.name}
                            </h3>

                            <Badge>{tool.category}</Badge>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {tool.description}
                        </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                        <span className="text-xs font-semibold text-muted-ink">
                            {tool.provider} · site externo
                        </span>

                        <span className="inline-flex items-center gap-1 text-sm font-bold text-coral">
                            Abrir
                            <ArrowUpRight className="size-4" aria-hidden="true" />
                        </span>
                    </div>
                </div>
            </Card>
        </a>
    );
}
