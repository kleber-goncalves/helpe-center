import { ExternalLink, ShieldCheck } from "lucide-react";

import { Card } from "./ui";

export function ToolProviderInfo({ provider }) {
    const Icon = provider.icon;

    return (
        <Card className="h-full p-5">
            <div className="flex items-start gap-3">
                <span
                    className="
                        flex
                        size-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-coral-soft
                        text-coral
                    "
                    aria-hidden="true"
                >
                    <Icon className="size-5" strokeWidth={1.9} />
                </span>

                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-bold text-ink">
                            {provider.name}
                        </h3>

                        <ShieldCheck
                            className="size-4 shrink-0 text-coral"
                            aria-hidden="true"
                        />
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {provider.description}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-muted-ink">
                        {provider.retentionNote}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
                        <a
                            href={provider.privacyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex
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
                            <ExternalLink
                                className="size-3.5"
                                aria-hidden="true"
                            />
                        </a>

                        <a
                            href={provider.securityUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex
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
                            <ExternalLink
                                className="size-3.5"
                                aria-hidden="true"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </Card>
    );
}
