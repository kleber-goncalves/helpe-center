import { MessageCircleQuestion } from "@sketchyicons/react";
import { Button } from "./ui";
export function HelpCTA() {
    return (
        <section className="rounded-2xl bg-ink px-6 py-9 text-white sm:px-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-white/10">
                        <MessageCircleQuestion className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-bold">Ainda precisa de ajuda?</h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#cfdee3]">Não encontrou o que procurava? Envie sua dúvida e ajude-nos a melhorar a Central de Ajuda Digital.</p>
                </div>
                <a href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                    <Button variant="coral">Enviar uma dúvida</Button>
                </a>
            </div>
        </section>
    );
}
