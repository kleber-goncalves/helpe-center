import { BarChart3, BookOpen, Search } from "@sketchyicons/react";
import { HelpCTA } from "../components/HelpCTA2";
import { SectionTransition } from "../components/SectionTransition";
import { Reveal } from "../components/Reveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ProjectTeam } from "../components/ProjectTeam";

gsap.registerPlugin(ScrollTrigger);
export function About() {
    const processRef = useRef(null);
    const cardRef = useRef(null);

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
            logo: "/logo.png",
            title: "Hauy Conecta",
            text: "Os tutoriais foram organizados em categorias, com pesquisa e um canal para enviar novas dúvidas, assim o Hauy Conecta continua crescendo.",
        },
    ];

    const priorities = [
        {
            label: "Maior prioridade",
            items: [
                { label: "Excel", color: "bg-petrol-soft" },
                { label: "Formatação no Word", color: "bg-coral" },
                { label: "Impressão", color: "bg-searchPesq" },
                { label: "Digitalização", color: "bg-petrol-soft" },
                { label: "Compartilhamento de arquivos", color: "bg-coral" },
                { label: "Sumário automático", color: "bg-searchPesq" },
                { label: "Canva", color: "bg-petrol-soft" },
            ],
        },
        {
            label: "Também importantes",
            items: [
                { label: "PDF", color: "bg-petrol-soft" },
                { label: "E-mail", color: "bg-coral" },
                { label: "Plataforma da escola", color: "bg-searchPesq" },
                { label: "Acesso a contas", color: "bg-petrol-soft" },
                { label: "Google Drive", color: "bg-coral" },
            ],
        },
        {
            label: "Outras necessidades",
            items: [
                { label: "PowerPoint", color: "bg-petrol-soft" },
                { label: "LibreOffice", color: "bg-coral" },
                { label: "Digitação", color: "bg-searchPesq" },
                { label: "Informática básica", color: "bg-petrol-soft" },
                { label: "Data Show", color: "bg-coral" },
                { label: "Edição de imagens e vídeos", color: "bg-searchPesq" },
                { label: "Banco de dados e programação", color: "bg-petrol-soft" },
            ],
        },
    ];

    useGSAP(
        () => {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (reduceMotion || !processRef.current) {
                return;
            }

            const items = processRef.current.querySelectorAll("li");

            gsap.fromTo(
                items,
                {
                    autoAlpha: 0,
                    y: 20,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.06,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: processRef.current,
                        start: "top 88%",
                        once: true,
                    },
                },
            );
        },
        { scope: processRef },
    );

    useGSAP(
        () => {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (reduceMotion) return;

            gsap.from(cardRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.55,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 88%",
                    once: true,
                },
            });
        },
        { scope: cardRef },
    );
    return (
        <main className="bg-baground">
            <section className="">
                <div className="bg-mist3">
                    <Reveal y={20} ease="sine.out" duration={0.85}>
                        <div className=" mx-auto max-w-6xl px-5 pt-14 lg:px-8">
                            <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">Sobre O</p>
                            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Hauy Conecta</h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-ink">Um projeto escolar que foi criado para facilitar o acesso a orientações sobre ferramentas digitais usadas no dia a dia da escola para alunos, professores e funcionários.</p>
                        </div>
                    </Reveal>
                    <Reveal y={20} ease="sine.out">
                        <SectionTransition variant="wide" from="mist" to="background" size="large" animation />
                    </Reveal>
                </div>

                <section className=" mx-auto max-w-6xl px-5 lg:px-8">
                    <Reveal y={20} duration={0.55} ease="sine.out">
                        <h2 id="processo-title" className="text-2xl font-extrabold text-foreground sm:text-3xl">
                            Como o Hauy Conecta foi criado
                        </h2>
                        <p className="mt-3 text-base max-w-2xl text-muted-foreground sm:text-lg">Pesquisar → Encontrar → Aprender → Resolver. Esse é o caminho que queremos tornar mais simples para toda a comunidade escolar.</p>
                    </Reveal>
                    <div className="flex flex-col md:flex-row items-center gap-22">
                        <ol ref={processRef} className="mt-8 flex flex-col gap-6">
                            {process.map((step, index) => {
                                const isLast = index === process.length - 1;

                                return (
                                    <li key={step.title} className="relative flex gap-4">
                                        {/* Conector */}
                                        {!isLast && <span className={["pointer-events-none", "absolute left-[21px] top-[22px]", "z-0 w-px", "h-[calc(100%+1.5rem)]", "bg-line"].join(" ")} aria-hidden="true" />}

                                        {/* Ícone / Logo */}
                                        <span className={["relative z-10", "flex size-11 shrink-0", "items-center justify-center", "rounded-full", "border border-line", "bg-mist3", "text-petrol"].join(" ")}>{step.logo ? <img src={step.logo} alt="" className="h-8 w-8 object-contain" draggable="false" /> : <step.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />}</span>

                                        {/* Conteúdo */}
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
                            <Reveal y={18} duration={0.6}>
                                <img src="about.png" fetchPriority="low" loading="lazy" decoding="async" draggable="false" alt="Grupo de pessoas planejando um projeto" />
                            </Reveal>
                        </div>
                    </div>
                </section>
            </section>

            <section id="pesquisa" className="bg-mist3  scroll-mt-20" aria-labelledby="pesquisa-title">
                <div className="">
                    <SectionTransition variant="ribbon2" from="background" to="mist" size="large" animation />
                    <Reveal y={20} duration={0.55} ease="sine.out">
                        <div className="mx-auto max-w-2xl px-5 text-center">
                            <h2 id="pesquisa-title" className="text-2xl font-extrabold text-foreground sm:text-3xl">
                                O que a pesquisa mostrou
                            </h2>
                            <p className="mt-3 text-base text-muted-foreground sm:text-lg">Os assuntos abaixo orientam a ordem em que os tutoriais são criados. Nenhuma resposta individual é exibida.</p>
                        </div>
                    </Reveal>
                    <div ref={cardRef} className="mx-auto mt-10 px-5 grid max-w-4xl gap-4 md:grid-cols-3">
                        {priorities.map((group) => (
                            <div key={group.label} className="rounded-lg bg-card dark:bg-paper border border-line p-5">
                                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-coral!">{group.label}</h3>
                                <ul className="mt-3 flex flex-col gap-1.5 text-[15px] text-foreground/85">
                                    {group.items.map((item) => (
                                        <li key={item.label} className="flex items-center gap-2">
                                            <span className={`size-1.5 shrink-0 rounded-full ${item.color}`} aria-hidden="true" />

                                            {item.label}
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
                <Reveal y={20} duration={0.6} ease="sine.out">
                    <div>
                        <h2 className="text-2xl font-bold text-ink">Equipe do projeto</h2>

                        <p className="mt-3 max-w-2xl leading-7 text-muted-ink">Alunos e professores que participaram do desenvolvimento do Hauy Conecta.</p>

                        <ProjectTeam />
                    </div>
                </Reveal>
                <Reveal y={20} duration={0.6} ease="sine.out">
                    <div className="mt-12">
                        <h2 className=" mt-9 text-2xl font-bold text-ink">Conteúdo orientado por necessidades reais</h2>
                        <p className="mt-4 max-w-2xl leading-7 text-muted-ink">A pesquisa serviu apenas como referência para definir as prioridades iniciais, como Excel, formatação de trabalhos, impressão, digitalização, compartilhamento de arquivos e Canva. Nenhuma resposta individual ou dado identificável é exibido no portal.</p>
                    </div>
                </Reveal>
            </section>

            <HelpCTA />
        </main>
    );
}
