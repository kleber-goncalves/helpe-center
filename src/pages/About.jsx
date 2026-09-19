import { BarChart3, BookOpen, Search, CircleHelp } from "lucide-react";
import { HelpCTA } from "../components/HelpCTA2";
import { SectionTransition } from "../components/SectionTransition";
export function About() {


    const process = [
        {
            icon: Search,
            title: "Pesquisa",
            text: "Uma pesquisa com alunos, professores e funcionários reuniu 19 respostas sobre as principais dificuldades digitais no dia a dia da escola.",
        },
        {
            icon: BarChart3,
            title: "Análise",
            text: "As respostas foram agrupadas por assunto. Excel, formatação no Word, impressão, digitalização, compartilhamento de arquivos, sumário automático e Canva apareceram com mais frequência.",
        },
        {
            icon: BookOpen,
            title: "Tutoriais",
            text: "Cada assunto virou um tutorial em passo a passo, escrito em linguagem simples e pensado para quem está começando.",
        },
        {
            icon: CircleHelp,
            title: "Hauy Conecta",
            text: "Os tutoriais foram organizados em categorias, com pesquisa e um canal para enviar novas dúvidas — assim o Hauy Conecta continua crescendo.",
        },
    ];


    const priorities = [
        {
            label: "Maior prioridade",
            items: ["Excel", "Formatação no Word", "Impressão", "Digitalização", "Compartilhamento de arquivos", "Sumário automático", "Canva"],
        },
        {
            label: "Também importantes",
            items: ["PDF", "E-mail", "Plataforma da escola", "Acesso a contas", "Google Drive"],
        },
        {
            label: "Outras necessidades",
            items: ["PowerPoint", "LibreOffice", "Digitação", "Informática básica", "Data Show", "Edição de imagens e vídeos", "Banco de dados e programação"],
        },
    ];

    return (
        <main className="bg-baground">
            <section className="">
                <div className="bg-mist3">
                    <div className=" mx-auto max-w-6xl px-5 pt-14 lg:px-8">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#507283]">Sobre O</p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Hauy Conecta</h1>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-ink">Um projeto escolar que foi criado para facilitar o acesso a orientações sobre ferramentas digitais usadas no dia a dia da escola para alunos, professores e funcionários.</p>
                    </div>
                    <SectionTransition variant="wide" from="mist" to="background" size="large" animation />
                </div>

                <section className=" mx-auto max-w-6xl px-5 lg:px-8">
                    <h2 id="processo-title" className="text-2xl font-extrabold text-foreground sm:text-3xl">
                        Como o Hauy Conecta foi criado
                    </h2>
                    <p className="mt-3 text-base max-w-2xl text-muted-foreground sm:text-lg">Pesquisar → Encontrar → Aprender → Resolver. Esse é o caminho que queremos tornar mais simples para toda a comunidade escolar.</p>
                    <div className="flex flex-col md:flex-row items-center gap-22">
                        <ol className="mt-8 flex flex-col gap-6">
                            {process.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <li key={step.title} className="flex gap-4">
                                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#ebf5f6] text-petrol">
                                            <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                                        </span>
                                        <div>
                                            <p className="font-display text-xs font-bold uppercase tracking-wider text-coral">Etapa {index + 1}</p>
                                            <h3 className="mt-0.5 text-lg font-bold text-foreground">{step.title}</h3>
                                            <p className="mt-1 text-base text-muted-foreground">{step.text}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                        <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
                            <img src="about.png" alt="" />
                        </div>
                    </div>
                </section>
            </section>

            <section id="pesquisa" className="bg-mist3  scroll-mt-20" aria-labelledby="pesquisa-title">
                <div className="">
                    <SectionTransition variant="ribbon2" from="background" to="mist" size="large" animation />

                    <div className="mx-auto max-w-2xl px-5 text-center">
                        <h2 id="pesquisa-title" className="text-2xl font-extrabold text-foreground sm:text-3xl">
                            O que a pesquisa mostrou
                        </h2>
                        <p className="mt-3 text-base text-muted-foreground sm:text-lg">Os assuntos abaixo orientam a ordem em que os tutoriais são criados. Nenhuma resposta individual é exibida.</p>
                    </div>
                    <div className="mx-auto mt-10 px-5 grid max-w-4xl gap-4 md:grid-cols-3">
                        {priorities.map((group) => (
                            <div key={group.label} className="rounded-lg bg-card/80 border border-line p-5">
                                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-coral!">{group.label}</h3>
                                <ul className="mt-3 flex flex-col gap-1.5 text-[15px] text-foreground/85">
                                    {group.items.map((item) => (
                                        <li key={item} className="flex items-center gap-2">
                                            <span className="size-1.5 rounded-full bg-petrol-soft" aria-hidden="true" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <SectionTransition variant="fold" from="mist" to="background" size="large" />
                </div>
            </section>

            <section className="flex flex-col  py-20 gap-12 mx-auto max-w-6xl px-5 lg:px-8">
                <div>
                    <h2 className="text-xl font-bold text-ink">Equipe do projeto</h2>
                    <p className="mt-3 leading-7 text-muted-ink">O Hauy Conecta foi desenvolvida pelo grupo formado por Kleber, Cirlene, Divina, Robertin e Carlos e Professores Fabio, Felipe Cordeiro e Auro.</p>
                </div>
                <div>
                    <h2 className=" mt-9 text-2xl font-bold text-ink">Conteúdo orientado por necessidades reais</h2>
                    <p className="mt-4 max-w-2xl leading-7 text-muted-ink">A pesquisa serviu apenas como referência para definir as prioridades iniciais, como Excel, formatação de trabalhos, impressão, digitalização, compartilhamento de arquivos e Canva. Nenhuma resposta individual ou dado identificável é exibido no portal.</p>
                </div>
            </section>

            <HelpCTA />
        </main>
    );
}
