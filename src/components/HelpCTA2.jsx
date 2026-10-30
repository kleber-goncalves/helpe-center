import { Button } from "./ui";
import { SectionTransition } from "./SectionTransition";
import { OptimizedImage } from "./OptimizedImage";
import { Link } from "react-router-dom";
import helpCTAImg from "../assets/helpCTA.webp";

export function HelpCTA({ from = "background" }) {
    return (
        <section className=" bg-coral-soft ">
            <SectionTransition variant="notch2" from={from} to="coral-soft" size="medium" animation />
            <div className=" bg-coral-soft px-6 py-12 sm:px-10 items-center justify-center flex flex-row">
                <div className="flex flex-col max-w-6xl mx-auto items-center justify-between gap-6 md:gap-24 md:flex-row md:items-center">
                    <div className="flex flex-col w-full max-w-2xl">
                        
                        <h2 className="font-extrabold text-foreground text-2xl sm:text-3xl ">Ainda precisa de ajuda?</h2>
                        <p className="mt-3  text-muted-foreground text-base sm:text-lg ">Não encontrou o que procurava? Envie sua dúvida e ajude-nos a melhorar o Hauy Conecta.</p>
                        <Link to="/enviar-duvida" className="mt-6 inline-flex">
                            <Button variant="coral">Enviar uma dúvida</Button>
                        </Link>
                    </div>
                    <div className="mx-auto w-full max-w-[370px] sm:max-w-[260px] md:max-w-[330px] md:justify-self-end">
                        <OptimizedImage
                            src={helpCTAImg}
                            alt="ilustração relacionada a dúvida, ajuda, conversa, suporte ou tecnologia"
                            metadataKey="src/assets/helpCTA.webp"
                            loading="lazy"
                            fetchPriority="low"
                            decoding="async"
                            sizes="(min-width: 768px) 330px, (min-width: 640px) 260px, min(100vw, 370px)"
                            wrapperClassName="w-full"
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
