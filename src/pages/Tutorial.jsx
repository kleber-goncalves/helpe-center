import { ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { Badge, Button } from "../components/ui";

import { TutorialStep } from "../components/TutorialStep";

import { TutorialStepNav } from "../components/TutorialStepNav";

import { categories } from "../data/categories";

import { findTutorial, tutorials } from "../data/tutorials";

import { SITE_NAME, SITE_URL, setPageTitle, setMetaTag, setMetaProperty, setCanonical, setJsonLd, removePageTitle, removeMetaTag, removeMetaProperty, removeCanonical, removeJsonLd } from "../lib/seo";

/*
 * =========================================================
 * COMPONENTE
 * =========================================================
 */

export function Tutorial() {
    const { tutorialId } = useParams();

    const tutorial = findTutorial(tutorialId);

    const [activeStep, setActiveStep] = useState(0);

    /*
     * ==================================================
     * SEO
     * ==================================================
     *
     * Cada tutorial recebe:
     *
     * - <title> próprio
     * - meta description própria
     * - canonical próprio
     * - JSON-LD próprio
     *
     */
    useEffect(() => {
        if (!tutorial) {
            setPageTitle(`Tutorial não encontrado | ${SITE_NAME}`);
            return;
        }

        const pageTitle = `${tutorial.title} | ${SITE_NAME}`;

        const description = tutorial.description || `Aprenda ${tutorial.title.toLowerCase()} com um passo a passo simples na ${SITE_NAME}.`;

        const canonicalUrl = `${SITE_URL}/tutoriais/${tutorial.id}`;

        setPageTitle(pageTitle);

        setMetaTag("description", description);

        setCanonical(canonicalUrl);

        setMetaProperty("og:title", pageTitle);
        setMetaProperty("og:description", description);
        setMetaProperty("og:type", "article");
        setMetaProperty("og:url", canonicalUrl);

        setMetaProperty("twitter:card", "summary");
        setMetaProperty("twitter:title", pageTitle);
        setMetaProperty("twitter:description", description);

        const category = categories.find((item) => item.id === tutorial.category);

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: tutorial.title,
            description,
            url: canonicalUrl,
            inLanguage: "pt-BR",
            articleSection: category?.name ?? tutorial.category,
            author: {
                "@type": "Organization",
                name: SITE_NAME,
            },
            publisher: {
                "@type": "Organization",
                name: SITE_NAME,
            },
            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": canonicalUrl,
            },
        };

        setJsonLd(structuredData);

        return () => {
            removePageTitle();

            removeMetaTag("description");

            removeMetaProperty("og:title");
            removeMetaProperty("og:description");
            removeMetaProperty("og:type");
            removeMetaProperty("og:url");

            removeMetaProperty("twitter:card");
            removeMetaProperty("twitter:title");
            removeMetaProperty("twitter:description");

            removeCanonical();
            removeJsonLd();
        };
    }, [tutorial]);

    /*
     * ==================================================
     * TUTORIAL NÃO ENCONTRADO
     * ==================================================
     */

    if (!tutorial) {
        return (
            <main className="mx-auto max-w-4xl px-5 py-14">
                <h1 className="text-3xl font-bold text-ink">Tutorial não encontrado</h1>

                <Link className="mt-5 inline-block font-bold text-muted-foreground" to="/tutoriais">
                    Ver tutoriais
                </Link>
            </main>
        );
    }

    const category = categories.find((item) => item.id === tutorial.category);

    const related = tutorials.filter((item) => item.category === tutorial.category && item.id !== tutorial.id).slice(0, 2);

    const steps = tutorial.steps ?? createSteps(tutorial);

    /*
     * ==================================================
     * PASSO ATUAL
     * ==================================================
     */

    const currentStep = steps[activeStep] ?? steps[0] ?? null;

    /*
     * ==================================================
     * PROTEÇÃO
     * ==================================================
     */

    if (!currentStep) {
        return (
            <main className="mx-auto max-w-4xl px-5 py-14">
                <h1 className="text-3xl font-bold text-ink">Este tutorial ainda não possui passos.</h1>

                <Link className="mt-5 inline-block font-bold text-muted-foreground" to="/tutoriais">
                    Ver tutoriais
                </Link>
            </main>
        );
    }

    /*
     * ==================================================
     * NAVEGAÇÃO
     * ==================================================
     */

    function handleStepNavigation(index) {
        setActiveStep(index);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        requestAnimationFrame(() => {
            document.getElementById(`passo-titulo-${index + 1}`)?.focus({
                preventScroll: true,
            });
        });
    }

    function goToNextStep() {
        if (activeStep >= steps.length - 1) {
            return;
        }

        handleStepNavigation(activeStep + 1);
    }

    function goToPreviousStep() {
        if (activeStep <= 0) {
            return;
        }

        handleStepNavigation(activeStep - 1);
    }

    return (
        <main className="bg-background">
            <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
                {/* ==================================================
                    BREADCRUMB
                ================================================== */}

                <nav aria-label="Navegação do tutorial" className="flex flex-wrap items-center gap-2 text-sm text-muted-ink">
                    <Link
                        to="/tutoriais"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            font-semibold
                            text-ink
                            transition-colors
                            hover:text-coral
                        "
                    >
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Todos os tutoriais
                    </Link>

                    <ChevronRight className="size-4 shrink-0 text-muted-ink" aria-hidden="true" />

                    <Link
                        to={`/categorias/${tutorial.category}`}
                        className="
                            font-semibold
                            text-muted-ink
                            transition-colors
                            hover:text-ink
                        "
                    >
                        {category?.name ?? tutorial.category}
                    </Link>
                </nav>

                {/* ==================================================
                    LAYOUT
                ================================================== */}

                <div
                    className="
                        mt-10
                        grid
                        gap-8
                        lg:grid-cols-[240px_minmax(0,1fr)]
                        lg:gap-12
                    "
                >
                    {/* ==================================================
                        SIDEBAR
                    ================================================== */}

                    <TutorialStepNav steps={steps} activeStep={activeStep} onNavigate={handleStepNavigation} />

                    {/* ==================================================
                        CONTEÚDO PRINCIPAL
                    ================================================== */}

                    <article className="min-w-0">
                        {activeStep === 0 && (
                            <>
                                {/* ==================================================
                                    CABEÇALHO
                                ================================================== */}

                                <header>
                                    <Badge>{category?.name ?? tutorial.category}</Badge>

                                    <h1
                                        className="
                                            mt-4
                                            max-w-4xl
                                            text-4xl
                                            font-bold
                                            tracking-tight
                                            text-ink
                                            sm:text-5xl
                                        "
                                    >
                                        {tutorial.title}
                                    </h1>

                                    <p
                                        className="
                                            mt-4
                                            max-w-3xl
                                            text-lg
                                            leading-7
                                            text-muted-ink
                                        "
                                    >
                                        {tutorial.description}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        <Badge>{tutorial.difficulty}</Badge>

                                        <Badge>{tutorial.duration}</Badge>
                                    </div>
                                </header>

                                {/* ==================================================
                                    O QUE VOCÊ VAI APRENDER
                                ================================================== */}

                                <section
                                    className="
                                        mt-10
                                        max-w-4xl
                                        rounded-xl
                                        bg-mist
                                        p-6
                                    "
                                >
                                    <h2 className="text-lg font-bold text-ink">O que você vai aprender?</h2>

                                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                                        {tutorial.learning.map((item) => (
                                            <li
                                                key={item}
                                                className="
                                                    flex
                                                    items-start
                                                    gap-2
                                                    text-sm
                                                    text-ink
                                                "
                                            >
                                                <Check
                                                    className="
                                                        mt-0.5
                                                        size-4
                                                        shrink-0
                                                        text-coral
                                                    "
                                                    aria-hidden="true"
                                                />

                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </>
                        )}

                        {/* ==================================================
                            PASSO ATUAL
                        ================================================== */}

                        <div className="mt-10 max-w-4xl">
                            <TutorialStep key={`${currentStep.title}-${activeStep}`} step={currentStep} index={activeStep} />
                        </div>

                        {/* ==================================================
                            NAVEGAÇÃO ENTRE PASSOS
                        ================================================== */}

                        <div
                            className="
                                mt-10
                                flex
                                max-w-4xl
                                items-center
                                justify-between
                                gap-4
                                border-t
                                border-line
                                pt-6
                            "
                        >
                            <Button type="button" variant="coral" onClick={goToPreviousStep} disabled={activeStep === 0} className="group">
                                <ChevronLeft
                                    className="
                                        size-4
                                        transition-transform
                                        duration-200
                                        group-hover:-translate-x-0.5
                                        motion-reduce:transition-none
                                    "
                                    aria-hidden="true"
                                />
                                Passo anterior
                            </Button>

                            {activeStep < steps.length - 1 ? (
                                <Button type="button" variant="coral" onClick={goToNextStep} className="group min-w-36">
                                    Próximo passo
                                    <ChevronRight
                                        className="
                                            size-4
                                            transition-transform
                                            duration-200
                                            group-hover:translate-x-0.5
                                            motion-reduce:transition-none
                                        "
                                        aria-hidden="true"
                                    />
                                </Button>
                            ) : (
                                <span
                                    className="
                                        text-sm
                                        font-semibold
                                        text-muted-foreground
                                    "
                                    aria-current="step"
                                >
                                    Último passo
                                </span>
                            )}
                        </div>

                        {/* ==================================================
                            CONCLUSÃO
                        ================================================== */}

                        {activeStep === steps.length - 1 && (
                            <section
                                className="
                                    mt-8
                                    max-w-4xl
                                    rounded-xl
                                    border
                                    border-line
                                    bg-mist
                                    p-6
                                "
                            >
                                <p
                                    className="
                                        text-xs
                                        font-bold
                                        tracking-[0.16em]
                                        text-muted-foreground
                                    "
                                >
                                    PRONTO!
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        text-2xl
                                        font-bold
                                        text-ink
                                    "
                                >
                                    Você concluiu este tutorial.
                                </h2>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        text-muted-ink
                                    "
                                >
                                    Se precisar, volte aos passos e faça com calma.
                                </p>
                            </section>
                        )}

                        {/* ==================================================
                            RELACIONADOS
                        ================================================== */}

                        {activeStep === steps.length - 1 && related.length > 0 && (
                            <section className="mt-12 max-w-4xl">
                                <h2 className="text-2xl font-bold text-ink">Você também pode gostar de</h2>

                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    {related.map((item) => (
                                        <Link
                                            key={item.id}
                                            to={`/tutoriais/${item.id}`}
                                            className="
                                                    rounded-xl
                                                    border
                                                    border-line
                                                    bg-mist
                                                    p-5
                                                    font-bold
                                                    text-ink
                                                    transition-colors
                                                    hover:bg-mist2
                                                "
                                        >
                                            {item.title}

                                            <ChevronRight
                                                className="
                                                        float-right
                                                        size-5
                                                        text-muted-ink
                                                    "
                                                aria-hidden="true"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ==================================================
                            VOLTAR
                        ================================================== */}

                        <div
                            className="
                                mt-12
                                flex
                                justify-between
                                border-t
                                border-line
                                pt-6
                            "
                        >
                            <Link
                                to="/tutoriais"
                                className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    text-sm
                                    font-bold
                                    text-muted-foreground
                                    transition-colors
                                    hover:text-ink
                                "
                            >
                                <ChevronLeft className="size-4" aria-hidden="true" />
                                Todos os tutoriais
                            </Link>
                        </div>
                    </article>
                </div>
            </div>
        </main>
    );
}

/*
 * =========================================================
 * ROUTE WRAPPER
 * =========================================================
 *
 * O key faz o Tutorial ser remontado quando o tutorialId
 * mudar. Dessa forma, activeStep volta naturalmente para 0.
 *
 * Isso evita precisar de:
 *
 * useEffect(() => {
 *     setActiveStep(0);
 * }, [tutorialId]);
 *
 */

export function TutorialRoute() {
    const { tutorialId } = useParams();

    return <Tutorial key={tutorialId} />;
}

/*
 * =========================================================
 * FALLBACK
 * =========================================================
 */

function createSteps(tutorial) {
    return [
        {
            title: "Abra a ferramenta ou arquivo que você vai usar.",

            description: `Comece abrindo o programa ou o arquivo relacionado a “${tutorial.title}”. Se ainda não estiver com ele salvo, escolha uma pasta que você consiga encontrar depois.`,

            examples: [],

            tip: null,

            video: null,
        },

        {
            title: tutorial.learning[0],

            description: "Siga esta etapa com atenção. Faça uma alteração por vez para conferir se tudo ficou como você espera.",

            examples: [],

            tip: null,

            video: null,
        },

        {
            title: tutorial.learning[1] ?? "Revise o resultado",

            description: "Antes de terminar, confira as informações e salve seu trabalho. Assim, você evita perder o que fez.",

            examples: [],

            tip: null,

            video: null,
        },
    ];
}

/*
 * =========================================================
 * SEO — META TAG
 * =========================================================
 */

function setMetaTag(name, content) {
    let element = document.head.querySelector(`meta[name="${name}"]`);

    if (!element) {
        element = document.createElement("meta");

        element.setAttribute("name", name);

        document.head.appendChild(element);
    }

    element.setAttribute("content", content);
}

/*
 * =========================================================
 * SEO — META PROPERTY
 * =========================================================
 */

function setMetaProperty(property, content) {
    let element = document.head.querySelector(`meta[property="${property}"]`);

    if (!element) {
        element = document.createElement("meta");

        element.setAttribute("property", property);

        document.head.appendChild(element);
    }

    element.setAttribute("content", content);
}

/*
 * =========================================================
 * SEO — CANONICAL
 * =========================================================
 */

function setCanonical(url) {
    let element = document.head.querySelector('link[rel="canonical"]');

    if (!element) {
        element = document.createElement("link");

        element.setAttribute("rel", "canonical");

        document.head.appendChild(element);
    }

    element.setAttribute("href", url);
}

/*
 * =========================================================
 * SEO — JSON-LD
 * =========================================================
 */

function setJsonLd(data) {
    removeJsonLd();

    const script = document.createElement("script");

    script.id = "tutorial-jsonld";

    script.type = "application/ld+json";

    script.textContent = JSON.stringify(data);

    document.head.appendChild(script);
}

/*
 * =========================================================
 * LIMPEZA
 * =========================================================
 */

function removeMetaTag(name) {
    document.head.querySelector(`meta[name="${name}"]`)?.remove();
}

function removeMetaProperty(property) {
    document.head.querySelector(`meta[property="${property}"]`)?.remove();
}

function removeCanonical() {
    document.head.querySelector('link[rel="canonical"]')?.remove();
}

function removeJsonLd() {
    document.getElementById("tutorial-jsonld")?.remove();
}
