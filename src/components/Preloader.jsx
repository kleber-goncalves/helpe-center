import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function preloadImage(src) {
    return new Promise((resolve) => {
        const image = new Image();

        image.onload = async () => {
            try {
                if (image.decode) {
                    await image.decode();
                }
            } catch {
                // A imagem já foi carregada.
            }

            resolve();
        };

        image.onerror = () => {
            // Nunca bloqueia a aplicação por causa de uma imagem.
            resolve();
        };

        image.src = src;
    });
}

async function preloadFonts() {
    if (!document.fonts) {
        return;
    }

    try {
        await Promise.all([document.fonts.load('700 1em "Nunito"'), document.fonts.load('400 1em "Source Sans 3"')]);
    } catch {
        // As fontes não podem bloquear a aplicação.
    }
}

function waitForPaint() {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    });
}

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function getCriticalTasks(pathname) {
    const tasks = [
        {
            label: "Carregando fontes...",
            load: preloadFonts,
        },
        {
            label: "Preparando a identidade visual...",
            load: () => preloadImage("/logo.png"),
        },
    ];

    /*
     * Recursos críticos da Home.
     */
    if (pathname === "/") {
        tasks.push({
            label: "Carregando a ilustração principal...",
            load: () => preloadImage("/hero.png"),
        });
    }

    return tasks;
}

export function Preloader({ onComplete }) {
    const { pathname } = useLocation();

    const tasks = useMemo(() => getCriticalTasks(pathname), [pathname]);

    const totalTasks = tasks.length;

    const [completedTasks, setCompletedTasks] = useState(0);
    const [status, setStatus] = useState(tasks[0]?.label || "Preparando interface...");

    const [resourcesLoaded, setResourcesLoaded] = useState(false);
    const [statusSequenceComplete, setStatusSequenceComplete] = useState(false);
    const [introComplete, setIntroComplete] = useState(false);
    const [ready, setReady] = useState(false);

    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const progressRef = useRef(null);
    const statusRef = useRef(null);

    /*
     * Tempo que cada mensagem permanece visível.
     *
     * 450ms permite que o usuário consiga perceber
     * cada mensagem sem deixar o preloader exageradamente lento.
     */
    const STATUS_DURATION = 450;

    /*
     * Bloqueia o scroll enquanto o preloader estiver ativo.
     */
    useEffect(() => {
        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    /*
     * Carregamento REAL dos recursos críticos.
     *
     * Todas as tarefas começam simultaneamente.
     */
    useEffect(() => {
        let cancelled = false;

        async function initialize() {
            const loadingTasks = tasks.map(async (task) => {
                await task.load();

                if (cancelled) {
                    return;
                }

                /*
                 * Cada recurso concluído atualiza
                 * o progresso individualmente.
                 */
                setCompletedTasks((current) => current + 1);
            });

            /*
             * Começa o carregamento em paralelo.
             */
            await Promise.all(loadingTasks);

            if (cancelled) {
                return;
            }

            setResourcesLoaded(true);
        }

        initialize();

        return () => {
            cancelled = true;
        };
    }, [tasks]);

    /*
     * Sequência VISUAL dos status.
     *
     * Ela só começa depois que a animação
     * inicial do preloader estiver visível.
     */
    useEffect(() => {
        if (!introComplete) {
            return;
        }

        let cancelled = false;

        async function runStatusSequence() {
            for (let index = 0; index < tasks.length; index += 1) {
                if (cancelled) {
                    return;
                }

                setStatus(tasks[index].label);

                /*
                 * Dá tempo para o usuário
                 * perceber a mensagem atual.
                 */
                await wait(STATUS_DURATION);
            }

            if (cancelled) {
                return;
            }

            setStatusSequenceComplete(true);
        }

        runStatusSequence();

        return () => {
            cancelled = true;
        };
    }, [introComplete, tasks]);

    /*
     * Só podemos finalizar quando:
     *
     * 1. Os recursos reais terminaram.
     * 2. Todas as mensagens já foram exibidas.
     */
    useEffect(() => {
        if (!resourcesLoaded || !statusSequenceComplete) {
            return;
        }

        let cancelled = false;

        async function finish() {
            /*
             * Dá ao navegador uma oportunidade
             * de pintar o estado final.
             */
            await waitForPaint();

            if (cancelled) {
                return;
            }

            setStatus("Pronto!");
            setReady(true);
        }

        finish();

        return () => {
            cancelled = true;
        };
    }, [resourcesLoaded, statusSequenceComplete]);

    /*
     * Percentual baseado no carregamento REAL.
     */
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    /*
     * Entrada visual.
     */
    useGSAP(
        () => {
            const logo = logoRef.current;
            const title = titleRef.current;
            const subtitle = subtitleRef.current;
            const progressBar = progressRef.current;
            const statusElement = statusRef.current;

            if (!logo || !title || !subtitle || !progressBar || !statusElement) {
                return;
            }

            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            /*
             * Usuários que preferem menos movimento
             * recebem uma entrada instantânea.
             */
            if (reduceMotion) {
                gsap.set([logo, title, subtitle, progressBar, statusElement], {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                });

                /*
                 * Permite que a sequência visual
                 * de mensagens possa começar.
                 */
                setIntroComplete(true);

                return;
            }

            gsap.set(logo, {
                autoAlpha: 0,
                y: 18,
                scale: 0.94,
            });

            gsap.set(title, {
                autoAlpha: 0,
                y: 12,
            });

            gsap.set(subtitle, {
                autoAlpha: 0,
                y: 8,
            });

            gsap.set(progressBar, {
                scaleX: 0,
                transformOrigin: "left center",
            });

            gsap.set(statusElement, {
                autoAlpha: 0,
                y: 6,
            });

            const timeline = gsap.timeline();

            timeline
                .to(logo, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.65,
                    ease: "power3.out",
                })
                .to(
                    title,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.45,
                        ease: "power2.out",
                    },
                    "-=0.3",
                )
                .to(
                    subtitle,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.35,
                        ease: "power2.out",
                    },
                    "-=0.22",
                )
                .to(
                    statusElement,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    },
                    "-=0.1",
                )
                .add(() => {
                    /*
                     * Somente agora o status começa
                     * sua sequência visual.
                     */
                    setIntroComplete(true);
                });

            return () => {
                timeline.kill();
            };
        },
        {
            scope: containerRef,
        },
    );

    /*
     * Barra de progresso.
     */
    useGSAP(
        () => {
            if (!progressRef.current) {
                return;
            }

            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            gsap.to(progressRef.current, {
                scaleX: progress / 100,
                duration: reduceMotion ? 0 : 0.35,
                ease: "power2.out",
                overwrite: true,
            });
        },
        {
            scope: containerRef,
            dependencies: [progress],
        },
    );

    /*
     * Animação da troca de status.
     */
    useGSAP(
        () => {
            if (!statusRef.current) {
                return;
            }

            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (reduceMotion) {
                return;
            }

            gsap.fromTo(
                statusRef.current,
                {
                    autoAlpha: 0,
                    y: 5,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.25,
                    ease: "power2.out",
                    overwrite: true,
                },
            );
        },
        {
            scope: containerRef,
            dependencies: [status],
        },
    );

    /*
     * Saída do preloader.
     *
     * O App só recebe onComplete
     * depois que a saída terminar.
     */
    useGSAP(
        () => {
            if (!ready || !containerRef.current) {
                return;
            }

            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (reduceMotion) {
                onComplete?.();
                return;
            }

            gsap.to(containerRef.current, {
                yPercent: -100,
                duration: 0.7,
                ease: "power3.inOut",
                onComplete: () => {
                    onComplete?.();
                },
            });
        },
        {
            scope: containerRef,
            dependencies: [ready, onComplete],
        },
    );

    return (
        <div ref={containerRef} className={["fixed inset-0 z-[99999]", "flex items-center justify-center", "bg-background px-6"].join(" ")}>
            <div className="flex w-full max-w-xs flex-col items-center text-center">
                {/* Logo */}
                <div ref={logoRef} className="w-24 sm:w-28">
                    <img src="/logo.png" alt="" fetchPriority="high" decoding="async" draggable="false" className={["block h-auto w-full", "select-none"].join(" ")} />
                </div>

                {/* Título */}
                <h1 ref={titleRef} className={["mt-5", "font-display", "text-2xl font-extrabold", "tracking-tight", "text-foreground"].join(" ")}>
                    Hauy Conecta
                </h1>

                {/* Subtítulo */}
                <p ref={subtitleRef} className="mt-1 text-sm text-muted-foreground">
                    Central de Ajuda Digital
                </p>

                {/* Progresso */}
                <div className={["mt-8 h-1 w-48", "overflow-hidden rounded-full", "bg-line"].join(" ")} aria-hidden="true">
                    <div ref={progressRef} className={["h-full w-full", "origin-left scale-x-0", "rounded-full bg-coral"].join(" ")} />
                </div>

                {/* Porcentagem */}
                <p className="mt-3 text-xs font-semibold text-muted-foreground">{progress}%</p>

                {/* Status */}
                <p ref={statusRef} className="mt-2 min-h-5 text-sm text-muted-foreground">
                    {status}
                </p>
            </div>
        </div>
    );
}
