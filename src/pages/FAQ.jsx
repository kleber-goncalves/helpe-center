import { FAQAccordion } from "../components/FAQAccordion";
import { HelpCTA } from "../components/HelpCTA2";
import { faq } from "../data/faq";
export function FAQ() {
    return (
        <main className="bg-hero-wash">
            <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 mb-13">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#507283]">Dúvidas e</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Perguntas frequentes</h1>
                <p className="mt-4 max-w-xl text-muted-ink">Veja como usar o Hauy Conecta e como sugerir novos conteúdos.</p>
                <div className="mx-auto mt-17 max-w-3xl">
                    <FAQAccordion items={faq} />
                </div>
            </div>

            <HelpCTA />
        </main>
    );
}
