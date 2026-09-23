import { useEffect, useRef } from "react";
import { ArrowLeft, MessageCircleQuestion, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { QuestionForm } from "../components/QuestionForm";
import { useReducedMotion } from "../hooks/useReducedMotion";


export function SendQuestion() {
    const pageRef = useRef(null);
    const headerRef = useRef(null);
    const infoRef = useRef(null);
    const formRef = useRef(null);
    const reduceMotion = useReducedMotion();


    useEffect(() => {
        const previousTitle = document.title;

        const description = "Envie uma dúvida para a equipe do Hauy Conecta. Conte o que você está tentando fazer e onde encontrou dificuldade.";

        document.title = "Enviar uma dúvida — Hauy Conecta";

        let metaDescription = document.querySelector('meta[name="description"]');

        const createdDescription = !metaDescription;

        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }

        const previousDescription = metaDescription.getAttribute("content");

        metaDescription.setAttribute("content", description);

        return () => {
            document.title = previousTitle;

            if (createdDescription) {
                metaDescription.remove();
            } else if (previousDescription !== null) {
                metaDescription.setAttribute("content", previousDescription);
            }
        };
    }, []);

    useGSAP(
        () => {
            const header = headerRef.current;
            const info = infoRef.current;
            const form = formRef.current;

            if (!header || !info || !form) {
                return;
            }

            if (reduceMotion) {
                gsap.set([header, info, form], {
                    autoAlpha: 1,
                    y: 0,
                });

                return;
            }

            gsap.set(header, {
                autoAlpha: 0,
                y: 20,
            });

            gsap.set(info, {
                autoAlpha: 0,
                y: 18,
            });

            gsap.set(form, {
                autoAlpha: 0,
                y: 20,
            });

            const timeline = gsap.timeline();

            timeline
                .to(header, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55,
                    ease: "power2.out",
                })
                .to(
                    info,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    },
                    "-=0.25",
                )
                .to(
                    form,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.55,
                        ease: "power2.out",
                    },
                    "-=0.2",
                );

            return () => {
                timeline.kill();
            };
        },
        {
            scope: pageRef,
            dependencies: [reduceMotion],
        },
    );

    return (
        <main ref={pageRef} className="bg-background" aria-labelledby="send-question-title">
            {/* Cabeçalho */}
            <section ref={headerRef} className="bg-mist3">
                <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
                    <Link to="/" className={["inline-flex min-h-11 items-center gap-2", "text-sm font-semibold", "text-muted-ink", "transition-colors", "hover:text-ink", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/50", "focus-visible:ring-offset-2"].join(" ")}>
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Voltar para o início
                    </Link>

                    <div className="mt-8 max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">Precisa de ajuda?</p>

                        <h1 id="send-question-title" className={["mt-3", "font-display", "text-4xl font-extrabold", "tracking-tight text-foreground", "sm:text-5xl"].join(" ")}>
                            Envie sua dúvida
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-ink sm:text-lg">Conte-nos o que você está tentando fazer e onde encontrou dificuldade. A equipe do Hauy Conecta vai analisar sua mensagem e, quando possível, orientar você.</p>
                    </div>
                </div>
            </section>

            {/* Formulário */}
            <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16" aria-labelledby="form-section-title">
                <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
                    {/* Informações */}
                    <aside ref={infoRef} className="lg:pt-2">
                        <div className="flex items-center gap-3">
                            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-coral-soft text-coral" aria-hidden="true">
                                <MessageCircleQuestion className="size-5" strokeWidth={1.8} />
                            </span>

                            <h2 id="form-section-title" className="font-display text-lg font-bold text-foreground">
                                Antes de enviar
                            </h2>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-muted-foreground">Quanto mais detalhes você informar, mais fácil será entender e orientar sua dúvida.</p>

                        <div className="mt-6 flex gap-3">
                            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-petrol" aria-hidden="true" />

                            <p className="text-sm leading-6 text-muted-foreground">Não envie senhas, códigos de acesso, documentos pessoais ou outras informações confidenciais.</p>
                        </div>
                    </aside>

                    {/* Formulário */}
                    <div ref={formRef} className="min-w-0">
                        <QuestionForm />

                        <p className="mt-4 text-xs leading-5 text-muted-foreground">As informações enviadas são utilizadas para acompanhar e responder às dúvidas recebidas pelo projeto Hauy Conecta.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
