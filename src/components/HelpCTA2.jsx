import { MessageCircleQuestion } from "lucide-react";
import { Button } from "./ui";
import { SectionTransition } from "./SectionTransition";
export function HelpCTA({ from = "background" }) {
    return (
        <section className=" bg-coral-soft ">
            <SectionTransition variant="notch2" from={from} to="coral-soft" size="medium" animation />
            <div className=" bg-coral-soft px-6 py-12 sm:px-10 items-center justify-center flex flex-row">
                <div className="flex flex-col max-w-6xl mx-auto items-center justify-between gap-6 md:gap-24 md:flex-row md:items-center">
                    <div className="flex flex-col w-full max-w-2xl">
                        <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-white/10">
                            <MessageCircleQuestion className="h-5 w-5" />
                        </div>
                        <h2 className="font-extrabold text-foreground text-2xl sm:text-3xl ">Ainda precisa de ajuda?</h2>
                        <p className="mt-3  text-muted-foreground text-base sm:text-lg ">Não encontrou o que procurava? Envie sua dúvida e ajude-nos a melhorar o Hauy Conecta.</p>
                        <a className="mt-6" href="https://forms.gle/9LSAz3PdBqa899KW8" target="_blank" rel="noreferrer">
                            <Button variant="coral">Enviar uma dúvida</Button>
                        </a>
                    </div>
                    <div className="mx-auto w-full max-w-[370px] sm:max-w-[260px] md:max-w-[330px] md:justify-self-end">
                        <img src="/helpCTA.png" alt="" srcset="" />
                    </div>
                </div>
            </div>
        </section>
    );
}
