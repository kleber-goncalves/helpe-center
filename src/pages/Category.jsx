import { useEffect } from "react";
import { Link, useParams, } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Components
import { TutorialCard } from "../components/TutorialCard";

// Data
import { categories } from "../data/categories";
import { tutorials } from "../data/tutorials";

// SEO
import { SITE_NAME, SITE_URL, setPageTitle, setMetaTag, setMetaProperty, setCanonical, setJsonLd, removePageTitle, removeMetaTag, removeMetaProperty, removeCanonical, removeJsonLd } from "../lib/seo";
export function Category() {
    const { categoryId } = useParams();
    const category = categories.find((item) => item.id === categoryId);
    const results = tutorials.filter((item) => item.category === categoryId);

    useEffect(() => {
        if (!category) {
            const pageTitle = `Categoria não encontrada | ${SITE_NAME}`;
            const description = "A categoria que você procura não foi encontrada na Central de Ajuda Digital.";
            const canonicalUrl = `${SITE_URL}/categorias/${categoryId}`;

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
        }

        const pageTitle = `${category.name} | ${SITE_NAME}`;

        const description = category.description || `Confira os tutoriais de ${category.name} na ${SITE_NAME}.`;

        const canonicalUrl = `${SITE_URL}/categorias/${category.id}`;

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
            name: category.name,
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
                numberOfItems: results.length,
                itemListElement: results.map((tutorial, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: tutorial.title,
                    url: `${SITE_URL}/tutoriais/${tutorial.id}`,
                })),
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
    }, [category, categoryId, results]);

    if (!category)
        return (
            <main className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
                <h1 className="text-3xl font-bold text-ink">Categoria não encontrada</h1>
                <Link className="mt-5 inline-block font-bold text-coral" to="/categorias">
                    Ver categorias
                </Link>
            </main>
        );
    const Icon = category.icon;
    return (
        <main className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
            <nav className="flex items-center flex-wrap gap-2 text-sm text-muted-ink">
                <Link to="/" className="hover:text-ink">
                    Início
                </Link>

                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />

                <Link to="/categorias" className="hover:text-ink">
                    Categorias
                </Link>

                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />

                <span aria-current="page" className="text-ink">
                    {category.name}
                </span>
            </nav>
            <div data-reader-content>
                <div className="mt-7 flex items-start gap-4">
                    <span className="grid h-17 w-17 place-items-center rounded-xl bg-mist3 text-[var(--color-coral)]">
                        <Icon className="h-12 w-12" />
                    </span>
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-ink">{category.name}</h1>
                        <p className="mt-2 text-muted-ink">{category.description}</p>
                    </div>
                </div>
                <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {results.map((tutorial) => (
                        <TutorialCard key={tutorial.id} tutorial={tutorial} />
                    ))}
                </div>
            </div>
        </main>
    );
}
