import { FAQAccordion } from "../components/FAQAccordion";
import { HelpCTA } from "../components/HelpCTA2";
import { Reveal } from "../components/Reveal";
import { SectionTransition } from "../components/SectionTransition";
import { faq } from "../data/faq";
export function FAQ() {
    return (
        <main className="bg-background">
            <div className="bg-mist3">
                <Reveal y={20} ease="sine.out" duration={0.85}>
                    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 ">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">Dúvidas e</p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Perguntas frequentes</h1>
                        <p className="mt-4 max-w-xl text-muted-ink">Veja como usar o Hauy Conecta e como sugerir novos conteúdos.</p>
                    </div>
                </Reveal>
                <Reveal y={20} ease="sine.out">
                    <SectionTransition variant="wide" from="mist" to="background" size="medium" animation />
                </Reveal>
            </div>
            <div className="mx-auto py-12  max-w-3xl px-5  mb-13">
                <FAQAccordion items={faq} />
            </div>

            <HelpCTA />
        </main>
    );
}
