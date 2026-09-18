import { MessageCircleQuestion } from "lucide-react";
import { Button } from "./ui";
export function HelpCTA() {
    return (
        <section className=" bg-warm-wash px-6 py-12 sm:px-10 items-center justify-center flex flex-row">
            <div className="flex flex-col max-w-6xl w-full items-center justify-between gap-6 md:flex-row md:items-center">
                <div className="flex flex-col w-full max-w-2xl">
                    <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-white/10">
                        <MessageCircleQuestion className="h-5 w-5" />
                    </div>
                    <h2 className="font-extrabold text-foreground text-2xl sm:text-3xl ">Ainda precisa de ajuda?</h2>
                    <p className="mt-3  text-muted-foreground text-base sm:text-lg ">Não encontrou o que procurava? Envie sua dúvida e ajude-nos a melhorar a Central de Ajuda Digital.</p>
                    <a className="mt-6" href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                        <Button variant="coral">Enviar uma dúvida</Button>
                    </a>
                </div>
                <div className="mx-auto w-full max-w-[220px] sm:max-w-[260px] md:max-w-[330px] md:justify-self-end">
                    <img src="/helpCTA.png" alt="" srcset="" />
                </div>
            </div>
        </section>
    );
}
