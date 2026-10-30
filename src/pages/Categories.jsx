import { useEffect } from "react";

// Components
import { CategoryCard } from "../components/CategoryCard";
import { HelpCTA } from "../components/HelpCTA2";
import { Reveal } from "../components/Reveal";
import { SectionTransition } from "../components/SectionTransition";

// Data
import { categories } from "../data/categories";

// SEO
import { SITE_NAME, SITE_URL, setPageTitle, setMetaTag, setMetaProperty, setCanonical, setJsonLd, removePageTitle, removeMetaTag, removeMetaProperty, removeCanonical, removeJsonLd } from "../lib/seo";
export function Categories() {
        useEffect(() => {
            const pageTitle = `Categorias | ${SITE_NAME}`;
    
            const description = "Encontre categorias de ajuda digital para localizar tutoriais com mais facilidade.";
    
            const canonicalUrl = `${SITE_URL}/categorias`;
    
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
            <div data-reader-content>
                <div className="bg-mist3">
                    <Reveal y={20} ease="sine.out" duration={0.85}>
                        <div className="mx-auto max-w-6xl px-5 pt-14 lg:px-8">
                            <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">Navegue por</p>
                            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Categorias</h1>
                            <p className="mt-4 max-w-xl text-muted-ink">E encontre tutoriais organizados por ferramenta ou habilidade que você queira aprender.</p>
                        </div>
                    </Reveal>
                    <Reveal y={20} ease="sine.out">
                        <SectionTransition variant="wide" from="mist" to="background" size="large" animation />
                    </Reveal>
                </div>

                <section className="mx-auto max-w-6xl px-5 pb-22 grid gap-4 grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </section>
            </div>

            <HelpCTA />
        </main>
    );
}
