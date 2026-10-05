import { useEffect } from "react";
import { FileText, Images } from "lucide-react";

import { ToolSection } from "../components/ToolSection";
import { tools } from "../data/tools";
import {
    SITE_NAME,
    SITE_URL,
    removeCanonical,
    removeJsonLd,
    removeMetaProperty,
    removeMetaTag,
    removePageTitle,
    setCanonical,
    setJsonLd,
    setMetaProperty,
    setMetaTag,
    setPageTitle,
} from "../lib/seo";

const pdfTools = tools.filter((entry) => entry.category === "PDF");
const imageTools = tools.filter((entry) => entry.category === "Imagens");

export function Tools() {
    useEffect(() => {
        const pageTitle = `Ferramentas | ${SITE_NAME}`;
        const description =
            "Ferramentas online recomendadas pelo Hauy Conecta para trabalhar com PDFs e imagens de forma simples.";
        const canonicalUrl = `${SITE_URL}/ferramentas`;

        setPageTitle(pageTitle);
        setMetaTag("description", description);
        setCanonical(canonicalUrl);

        setMetaProperty("og:title", pageTitle);
        setMetaProperty("og:description", description);
        setMetaProperty("og:type", "website");
        setMetaProperty("og:url", canonicalUrl);

        setMetaProperty("twitter:card", "summary");
        setMetaProperty("twitter:title", pageTitle);
        setMetaProperty("twitter:description", description);

        setJsonLd({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: pageTitle,
            description,
            url: canonicalUrl,
            inLanguage: "pt-BR",
            isPartOf: {
                "@type": "WebSite",
                name: SITE_NAME,
                url: SITE_URL,
            },
            mainEntity: {
                "@type": "ItemList",
                itemListElement: tools.map((entry, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: entry.name,
                    url: entry.href,
                })),
            },
        });

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
    }, []);

    return (
        <main className="bg-background">
            <section
                aria-labelledby="tools-page-title"
                className="bg-mist3"
            >
                <div className="mx-auto max-w-6xl px-5 pb-14 pt-14 lg:px-8">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        Recursos úteis
                    </p>

                    <h1
                        id="tools-page-title"
                        className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-ink"
                    >
                        Ferramentas para facilitar seu dia a dia
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        Encontre ferramentas online para trabalhar com PDFs e
                        imagens sem complicação.
                    </p>
                </div>
            </section>

            <ToolSection
                id="pdf-tools-title"
                label="PDF"
                title="Disponíveis no iLovePDF"
                description="Organize, converta e reduza arquivos PDF em poucos passos."
                icon={FileText}
                tools={pdfTools}
            />

            <ToolSection
                id="image-tools-title"
                label="Imagens"
                title="Disponíveis no iLoveIMG"
                description="Comprima, redimensione, recorte e converta imagens de forma prática."
                icon={Images}
                shaded
                tools={imageTools}
            />

            <section
                aria-labelledby="tools-note-title"
                className="mx-auto max-w-6xl px-5 py-14 lg:px-8"
            >
                <div className="max-w-3xl">
                    <h2
                        id="tools-note-title"
                        className="text-xl font-bold text-ink"
                    >
                        Sobre estas ferramentas
                    </h2>

                    <p className="mt-3 text-base leading-7 text-muted-foreground">
                        O Hauy Conecta reúne atalhos para ferramentas de serviços
                        externos. Ao abrir uma delas, você será levado para o site
                        do serviço responsável pelo processamento.
                    </p>

                    <p className="mt-3 text-sm leading-6 text-muted-ink">
                        Antes de enviar um arquivo, confira as condições de uso
                        e a política de privacidade do serviço escolhido.
                    </p>
                </div>
            </section>
        </main>
    );
}
