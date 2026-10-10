import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, MessageCircleQuestion } from "lucide-react";
import categoryImg from "../assets/category.webp";


// Components
import { TutorialCard } from "../components/TutorialCard";
import { OptimizedImage } from "../components/OptimizedImage";

// Data
import { categories } from "../data/categories";
import { tutorials } from "../data/tutorials";

// SEO
import { SITE_NAME, SITE_URL, setPageTitle, setMetaTag, setMetaProperty, setCanonical, setJsonLd, removePageTitle, removeMetaTag, removeMetaProperty, removeCanonical, removeJsonLd } from "../lib/seo";
import { OptimizedImage } from "../components/OptimizedImage";
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
                <div className="mt-10">
                    {results.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {results.map((tutorial) => (
                                <TutorialCard key={tutorial.id} tutorial={tutorial} />
                            ))}
                        </div>
                    ) : (
                        <section
                            className="flex flex-col items-center px-5 py-10 text-center sm:py-14"
                            aria-labelledby="empty-category-title"
                        >
                            <img
                                src="/illustrations/empty-category.svg"
                                alt=""
                                aria-hidden="true"
                                width="220"
                                height="180"
                                loading="lazy"
                                decoding="async"
                                className="mb-6 h-36 w-44 object-contain"
                            />

                            <h2
                                id="empty-category-title"
                                className="max-w-2xl font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
                            >
                                Ainda não temos tutoriais para esta categoria.
                            </h2>

                            <p className="mt-4 max-w-xl text-base leading-7 text-muted-ink">Pode nos enviar sua dúvida. Vamos analisar sua mensagem e, quando possível, orientar você.</p>

                            <Link to="/enviar-duvida" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-bold text-white shadow-soft transition duration-200 hover:bg-coral/90 hover:shadow-lifted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2">
                                <MessageCircleQuestion className="size-4" aria-hidden="true" />
                                Enviar uma dúvida
                            </Link>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}
