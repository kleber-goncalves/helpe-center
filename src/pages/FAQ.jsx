import { FAQAccordion } from '../components/FAQAccordion'
import { HelpCTA } from '../components/HelpCTA'
import { faq } from '../data/faq'
export function FAQ() { return <main className="mx-auto max-w-4xl px-5 py-14 lg:px-8"><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#507283]">Dúvidas comuns</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Perguntas frequentes</h1><p className="mt-4 max-w-xl text-muted-ink">Veja como usar a Central de Ajuda Digital e como sugerir novos conteúdos.</p><div className="mt-8"><FAQAccordion items={faq} /></div><div className="mt-16"><HelpCTA /></div></main> }
