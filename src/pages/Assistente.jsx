import { ArrowLeft } from "lucide-react";

import { Link } from "react-router-dom";

import { HauyAssistant } from "../components/HauyAssistant";

export function Assistente() {
    return (
        <main
            className="
                min-h-[80dvh]
                md:min-h-[90dvh]
                bg-background
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    min-h-[80dvh]
                    md:min-h-[90dvh]
                    max-w-6xl
                    flex-col
                    px-5
                    pb-5
                    pt-6
                    lg:px-8
                    lg:pb-10
                    lg:pt-10
                "
            >
                {/* =========================================
                    VOLTAR
                ========================================= */}

                <div className="shrink-0">
                    <Link
                        to="/"
                        className="
                            inline-flex
                            items-center
                            gap-2

                            rounded-lg

                            text-sm
                            font-semibold
                            text-muted-foreground

                            transition-colors
                            hover:text-coral

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-coral
                            focus-visible:ring-offset-2
                        "
                    >
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Voltar para o início
                    </Link>
                </div>

                {/* =========================================
                    ASSISTENTE
                ========================================= */}

                <div
                    className="
                        mt-6
                        min-h-0
                        flex-1

                        lg:mt-10
                    "
                >
                    <HauyAssistant />
                </div>
            </div>
        </main>
    );
}
