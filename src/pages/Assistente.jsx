import { ArrowLeft } from "lucide-react";

import { Link } from "react-router-dom";

import { HauyAssistant } from "../components/HauyAssistant";

export function Assistente() {
    return (
        <main className="bg-background">
            <div
                className="
                    mx-auto
                    max-w-6xl
                    px-5
                    py-10
                    lg:px-8
                "
            >
                <Link
                    to="/"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-muted-foreground
                        transition-colors
                        hover:text-coral
                    "
                >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Voltar para o início
                </Link>

                <div className="mt-10">
                    <HauyAssistant />
                </div>
            </div>
        </main>
    );
}
