import { ArrowLeft } from "lucide-react";

import { Link } from "react-router-dom";

import { HauyAssistant } from "../components/HauyAssistant";

export function Assistente() {
    return (
        <main
            className="
                min-h-[calc(100vh-4.5rem)]
                bg-background
            "
        >
            <div
                className="
                    mx-auto
                    max-w-6xl
                    px-5
                    py-10
                    lg:px-8
                "
            >
                {/* =========================================
                    VOLTAR
                ========================================= */}

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

                {/* =========================================
                    ASSISTENTE COMPLETO
                ========================================= */}

                <div className="mt-10">
                    <HauyAssistant />
                </div>
            </div>
        </main>
    );
}
