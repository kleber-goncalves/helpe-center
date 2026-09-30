import { useEffect } from "react";

// Components
import { FAQAccordion } from "../components/FAQAccordion";
import { HelpCTA } from "../components/HelpCTA2";
import { Reveal } from "../components/Reveal";
import { SectionTransition } from "../components/SectionTransition";

// Data
import { faq } from "../data/faq";

// SEO
import { SITE_NAME, SITE_URL, setPageTitle, setMetaTag, setMetaProperty, setCanonical, setJsonLd, removePageTitle, removeMetaTag, removeMetaProperty, removeCanonical, removeJsonLd } from "../lib/seo";

export function FAQ() {
    
        useEffect(() => {
            const pageTitle = `FAQ | ${SITE_NAME}`;
    
            const description = "Perguntas frequentes sobre o Hauy Conecta.";
    
            const canonicalUrl = `${SITE_URL}/faq`;
    
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
                "@type": "AboutPage",
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
        <main className="bg-background">
            <div className="bg-mist3">
                <Reveal y={20} ease="sine.out" duration={0.85}>
                    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 ">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">Dúvidas e</p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Perguntas frequentes</h1>
                        <p className="mt-4 max-w-xl text-muted-ink">Veja como usar o Hauy Conecta e como sugerir novos conteúdos.</p>
                    </div>
                </Reveal>
                <Reveal y={20} ease="sine.out">
                    <SectionTransition variant="wide" from="mist" to="background" size="medium" animation />
                </Reveal>
            </div>
            <div className="mx-auto py-12  max-w-3xl px-5  mb-13">
                <FAQAccordion items={faq} />
            </div>

            <HelpCTA />
        </main>
    );
}
