import { useEffect } from "react";


// Components
import { HauyAssistant } from "../components/HauyAssistant";

// SEO
import { SITE_NAME, SITE_URL, setPageTitle, setMetaTag, setMetaProperty, setCanonical, setJsonLd, removePageTitle, removeMetaTag, removeMetaProperty, removeCanonical, removeJsonLd } from "../lib/seo";


export function Assistente() {
        useEffect(() => {
            const pageTitle = `Assistente | ${SITE_NAME}`;
    
            const description = "Use o Assistente Hauy para encontrar orientações e resolver dúvidas sobre ferramentas digitais.";
    
            const canonicalUrl = `${SITE_URL}/assistente`;
    
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
    
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: pageTitle,
                description,
                url: canonicalUrl,
                inLanguage: "pt-BR",
                isPartOf: {
                    "@type": "WebSite",
                    name: SITE_NAME,
                    url: SITE_URL,
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
        }, []);

    return (
        <main
            className="
                min-h-[80dvh]
                md:min-h-[90dvh]
                bg-background
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    min-h-[80dvh]
                    md:min-h-[90dvh]
                    max-w-6xl
                    flex-col
                    px-5
                    pb-5
                    pt-6
                    lg:px-8
                    lg:pb-10
                    lg:pt-10
                "
            >
                {/* =========================================
                    VOLTAR
                ========================================= */}

                

                {/* =========================================
                    ASSISTENTE
                ========================================= */}

                <div
                    className="
                        mt-6
                        min-h-0
                        flex-1

                        lg:mt-10
                    "
                >
                    <HauyAssistant />
                </div>
            </div>
        </main>
    );
}
