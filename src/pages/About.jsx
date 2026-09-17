import { ArrowRight, BarChart3, BookOpen, Search } from "lucide-react";
export function About() {
    const steps = [
        [Search, "Pesquisa", "Foram identificadas dificuldades relacionadas ao uso da tecnologia na escola."],
        [BarChart3, "Análise", "As respostas foram analisadas de forma agregada para encontrar os temas mais frequentes."],
        [BookOpen, "Tutoriais", "As necessidades mais recorrentes orientaram a criação dos primeiros conteúdos."],
        [ArrowRight, "Central de Ajuda", "O portal reúne essas orientações em um só lugar, com linguagem simples."],
    ];
    return (
        <main className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#507283]">O projeto</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Sobre a Central de Ajuda Digital</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-ink">Este projeto escolar foi criado para tornar mais simples o acesso a orientações sobre ferramentas digitais usadas no dia a dia.</p>
            <div className="mt-12 grid gap-4 md:grid-cols-4">
                {steps.map(([Icon, title, text]) => (
                    <article key={title} className="rounded-xl border border-line bg-white p-5">
                        <Icon className="h-6 w-6 text-[#315d70]" />
                        <h2 className="mt-5 font-bold text-ink">{title}</h2>
                        <p className="mt-2 text-sm leading-6 text-muted-ink">{text}</p>
                    </article>
                ))}
            </div>
            <section className="mt-14 border-t border-line pt-10">
                <h2 className="text-xl font-bold text-ink">Equipe do projeto</h2>
                <p className="mt-3 leading-7 text-muted-ink">Esta Central de Ajuda Digital foi desenvolvida pelo grupo formado por Kleber, Cirlene, Divina, Robertin e Carlos.</p>
                <h2 className=" mt-9 text-2xl font-bold text-ink">Conteúdo orientado por necessidades reais</h2>
                <p className="mt-4 max-w-2xl leading-7 text-muted-ink">A pesquisa serviu apenas como referência para definir as prioridades iniciais, como Excel, formatação de trabalhos, impressão, digitalização, compartilhamento de arquivos e Canva. Nenhuma resposta individual ou dado identificável é exibido no portal.</p>
            </section>
        </main>
    );
}
