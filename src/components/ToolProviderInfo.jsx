import { ExternalLink, ShieldCheck } from "lucide-react";

import { Card } from "./ui";
import { OptimizedImage } from "./OptimizedImage";

export function ToolProviderInfo({ provider }) {

    return (
        <Card className="h-full p-5 shadow-none transition-shadow duration-200 hover:shadow-soft motion-reduce:transition-none">
            <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex min-w-0 flex-wrap items-center gap-0.5">
                        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg">
                            <OptimizedImage
                                src={provider.logo}
                                alt={provider.alt}
                                loading="lazy"
                                decoding="async"
                                sizes="28px"
                                wrapperClassName="h-full w-full"
                                className="object-contain"
                            />
                        </div>
                        <h3 className="break-words font-display text-lg font-bold text-ink">{provider.name}</h3>
                    </div>

                    <ShieldCheck className="size-4 shrink-0 text-coral" aria-hidden="true" />
                </div>

                <div className="min-w-0">
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{provider.description}</p>

                    <p className="mt-3 text-sm leading-6 text-muted-ink">{provider.retentionNote}</p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
                        <a
                            href={provider.privacyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Política de privacidade do ${provider.name}. Abre em uma nova aba.`}
                            className="
                                inline-flex
                                min-h-11
                                items-center
                                gap-1.5
                                text-coral
                                underline-offset-4
                                hover:underline
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-coral
                                focus-visible:ring-offset-2
                            "
                        >
                            Política de privacidade
                            <ExternalLink className="size-3.5" aria-hidden="true" />
                        </a>

                        <a
                            href={provider.securityUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Informações de segurança do ${provider.name}. Abre em uma nova aba.`}
                            className="
                                inline-flex
                                min-h-11
                                items-center
                                gap-1.5
                                text-coral
                                underline-offset-4
                                hover:underline
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-coral
                                focus-visible:ring-offset-2
                            "
                        >
                            Segurança
                            <ExternalLink className="size-3.5" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </div>
        </Card>
    );
}
