import { useEffect, useMemo, useState } from "react";
import {
    FileText,
    Images,
    Filter,
    FileText,
    Images,
    Search,
    SearchX,
    Sparkles,
    X,
} from "lucide-react";

import { ToolSection } from "../components/ToolSection";
import { ToolCard } from "../components/ToolCard";
import { ToolFilters } from "../components/ToolFilters";
import { Button, Input } from "../components/ui";
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

const featuredTools = tools.filter((entry) => entry.featured);
const pdfTools = tools.filter((entry) => entry.category === "PDF");
const imageTools = tools.filter((entry) => entry.category === "Imagens");

const categoryOptions = [...new Set(tools.map((entry) => entry.category))];
const providerOptions = [...new Set(tools.map((entry) => entry.provider))];

function normalizeSearchText(value) {
    return String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export function Tools() {
    const [search, setSearch] = useState("");

    const searchQuery = normalizeSearchText(search);

    const filteredTools = useMemo(() => {
        if (!searchQuery) {
            return tools;
        }

        const terms = searchQuery.split(/\s+/).filter(Boolean);

        return tools.filter((tool) => {
            const searchableText = normalizeSearchText(
                [
                    tool.name,
                    tool.description,
                    tool.category,
                    tool.provider,
                ].join(" "),
            );

            return terms.every((term) => searchableText.includes(term));
        });
    }, [searchQuery]);

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

    const hasSearch = Boolean(searchQuery);
    const hasFilters = category !== "all" || provider !== "all";
    const hasControls = hasSearch || hasFilters;
    const hasResults = filteredTools.length > 0;

    const clearFilters = () => {
        setCategory("all");
        setProvider("all");
    };

    return (
        <main className="bg-background">
            <section aria-labelledby="tools-page-title" className="bg-mist3">
                <div className="mx-auto max-w-6xl px-5 pb-14 pt-14 lg:px-8">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">Recursos úteis</p>

                    <h1 id="tools-page-title" className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-ink">
                        Ferramentas para facilitar seu dia a dia
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Encontre ferramentas online para trabalhar com PDFs e imagens sem complicação.</p>

                    <div role="search" aria-label="Pesquisar ferramentas" className="mt-7 max-w-2xl">
                        <label htmlFor="tools-search" className="mb-2 block text-sm font-bold text-ink">
                            Buscar uma ferramenta
                        </label>

                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-ink" aria-hidden="true" />

                            <Input id="tools-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex.: comprimir PDF" aria-describedby="tools-search-hint" className="h-12 pl-11 pr-12 text-base" />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Limpar busca"
                                    title="Limpar busca"
                                    className="
                                        absolute
                                        right-2
                                        top-1/2
                                        cursor-pointer
                                        inline-flex
                                        size-8
                                        -translate-y-1/2
                                        items-center
                                        justify-center
                                        rounded-md
                                        text-muted-ink
                                        transition-colors
                                        hover:bg-mist
                                        hover:text-ink
                                        focus-visible:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-coral
                                    "
                                >
                                    <X className="size-4" aria-hidden="true" aria-label="Limpar busca" title="Limpar busca" />
                                </button>
                            )}
                        </div>

                        <p id="tools-search-hint" className="mt-2 text-sm text-muted-foreground">
                            Pesquise pelo nome, tipo de arquivo, tarefa ou serviço.
                        </p>

                        <ToolFilters
                            category={category}
                            provider={provider}
                            categoryOptions={categoryOptions}
                            providerOptions={providerOptions}
                            onCategoryChange={setCategory}
                            onProviderChange={setProvider}
                            onClear={clearFilters}
                            hasActiveFilters={hasFilters}
                        />

                        {hasControls && (
                            <p className="mt-2 text-sm font-semibold text-coral" role="status" aria-live="polite">
                                {filteredTools.length === 1 ? "1 ferramenta encontrada." : `${filteredTools.length} ferramentas encontradas.`}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {!hasControls && (
                <section aria-labelledby="featured-tools-title" className="border-b border-line bg-coral-soft/40">
                    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
                        <div className="flex items-start gap-3">
                            <span
                                className="
                                    flex
                                    size-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-coral-soft
                                    text-coral
                                "
                                aria-hidden="true"
                            >
                                <Sparkles className="size-5" strokeWidth={1.9} />
                            </span>

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-ink">Acesso rápido</p>

                                <h2 id="featured-tools-title" className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
                                    Mais usadas
                                </h2>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Atalhos para algumas das ferramentas mais úteis em tarefas comuns com PDFs e imagens.</p>
                            </div>
                        </div>

                        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredTools.map((tool) => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {hasControls && hasResults && (
                <ToolSection
                    id="tools-search-results-title"
                    label={hasSearch ? "Busca" : "Filtros"}
                    title={
                        hasSearch
                            ? `Resultados para “${search.trim()}”`
                            : "Ferramentas filtradas"
                    }
                    description={
                        `Encontramos ${filteredTools.length} ${filteredTools.length === 1 ? "ferramenta" : "ferramentas"} que correspondem aos critérios selecionados.`
                    }
                    icon={hasSearch ? Search : Filter}
                    tools={filteredTools}
                />
            )}

            {hasControls && !hasResults && (
                <section aria-labelledby="tools-search-empty-title" className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
                    <div className="max-w-xl">
                        <span
                            className="
                                flex
                                size-11
                                items-center
                                justify-center
                                rounded-lg
                                bg-coral-soft
                                text-coral
                            "
                            aria-hidden="true"
                        >
                            <SearchX className="size-5" strokeWidth={1.9} />
                        </span>

                        <h2 id="tools-search-empty-title" className="mt-5 text-2xl font-bold text-ink sm:text-3xl">
                            Nenhuma ferramenta encontrada
                        </h2>

                        <p className="mt-3 text-base leading-7 text-muted-foreground">Não encontramos uma ferramenta para “{search.trim()}”. Tente pesquisar por outra tarefa, arquivo ou serviço.</p>

                        <Button type="button" variant="outline" onClick={() => setSearch("")} className="mt-6">
                            Limpar busca
                        </Button>
                    </div>
                </section>
            )}

            {!hasControls && (
                <>
                    <ToolSection id="pdf-tools-title" label="PDF" title="Disponíveis no iLovePDF" description="Organize, converta e reduza arquivos PDF em poucos passos." icon={FileText} tools={pdfTools} />

                    <ToolSection id="image-tools-title" label="Imagens" title="Disponíveis no iLoveIMG" description="Comprima, redimensione, recorte e converta imagens de forma prática." icon={Images} shaded tools={imageTools} />
                </>
            )}

            <section aria-labelledby="tools-note-title" className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
                <div className="max-w-3xl">
                    <h2 id="tools-note-title" className="text-xl font-bold text-ink">
                        Sobre estas ferramentas
                    </h2>

                    <p className="mt-3 text-base leading-7 text-muted-foreground">O Hauy Conecta reúne atalhos para ferramentas de serviços externos. Ao abrir uma delas, você será levado para o site do serviço responsável pelo processamento.</p>

                    <p className="mt-3 text-sm leading-6 text-muted-ink">Antes de enviar um arquivo, confira as condições de uso e a política de privacidade do serviço escolhido.</p>
                </div>
            </section>
        </main>
    );
}
