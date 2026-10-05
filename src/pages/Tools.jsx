import { useEffect, useMemo, useState } from "react";

import { FileText, Filter, Images, ShieldCheck, Search, SearchX, TrendingUp, X } from "lucide-react";

import { ToolSection } from "../components/ToolSection";
import { ToolCard } from "../components/ToolCard";
import { ToolFilters } from "../components/ToolFilters";
import { ToolProviderInfo } from "../components/ToolProviderInfo";
import { Button, Input } from "../components/ui";
import { tools } from "../data/tools";
import { toolProviders } from "../data/toolProviders";
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
    const [category, setCategory] = useState("all");
    const [provider, setProvider] = useState("all");

    const searchQuery = normalizeSearchText(search);

    const filteredTools = useMemo(() => {
        const terms = searchQuery.split(/\s+/).filter(Boolean);

        return tools.filter((tool) => {
            const matchesSearch =
                terms.length === 0 ||
                terms.every((term) =>
                    normalizeSearchText(
                        [
                            tool.name,
                            tool.description,
                            tool.category,
                            tool.provider,
                        ].join(" "),
                    ).includes(term),
                );

            const matchesCategory =
                category === "all" || tool.category === category;

            const matchesProvider =
                provider === "all" || tool.provider === provider;

            return matchesSearch && matchesCategory && matchesProvider;
        });
    }, [category, provider, searchQuery]);

    useEffect(() => {
        const pageTitle =
            `Ferramentas online para PDF e imagens | ${SITE_NAME}`;
        const description =
            "Encontre ferramentas online para juntar, dividir, comprimir e converter PDFs, além de editar, redimensionar e comprimir imagens.";
        const canonicalUrl = `${SITE_URL}/ferramentas`;

        setPageTitle(pageTitle);
        setMetaTag("description", description);
        setMetaTag("robots", "index,follow");
        setCanonical(canonicalUrl);

        setMetaProperty("og:title", pageTitle);
        setMetaProperty("og:description", description);
        setMetaProperty("og:type", "website");
        setMetaProperty("og:url", canonicalUrl);
        setMetaProperty(
            "og:image",
            `${SITE_URL}/preview.png`,
        );
        setMetaProperty(
            "og:image:alt",
            "Hauy Conecta — Central de Ajuda Digital",
        );

        setMetaTag("twitter:card", "summary_large_image");
        setMetaTag("twitter:title", pageTitle);
        setMetaTag("twitter:description", description);
        setMetaTag("twitter:image", `${SITE_URL}/preview.png`);
        setMetaTag(
            "twitter:image:alt",
            "Hauy Conecta — Central de Ajuda Digital",
        );

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
                numberOfItems: tools.length,
                itemListElement: tools.map((entry, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: entry.name,
                })),
            },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Início",
                        item: SITE_URL,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Ferramentas",
                        item: canonicalUrl,
                    },
                ],
            },
        });

        return () => {
            removePageTitle();
            removeMetaTag("description");
            removeMetaTag("robots");

            removeMetaProperty("og:title");
            removeMetaProperty("og:description");
            removeMetaProperty("og:type");
            removeMetaProperty("og:url");
            removeMetaProperty("og:image");
            removeMetaProperty("og:image:alt");

            removeMetaTag("twitter:card");
            removeMetaTag("twitter:title");
            removeMetaTag("twitter:description");
            removeMetaTag("twitter:image");
            removeMetaTag("twitter:image:alt");

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

                    <h1 id="tools-page-title" className="mt-3 max-w-3xl break-words text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                        Ferramentas para facilitar seu dia a dia
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Encontre ferramentas online para trabalhar com PDFs e imagens sem complicação.</p>

                    <p className="mt-3 flex max-w-3xl items-start gap-2 text-sm font-semibold text-muted-ink">
                        <ShieldCheck className="size-4 shrink-0 text-coral" aria-hidden="true" />O processamento acontece no site do serviço externo, não no Hauy Conecta.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-ink" aria-label="Resumo das ferramentas">
                        <span className="font-semibold text-ink">{tools.length} ferramentas</span>
                        <span className="h-1 w-1 rounded-full bg-line" aria-hidden="true" />
                        <span>{providerOptions.length} serviços externos</span>
                    </div>

                    <div role="search" aria-label="Pesquisar ferramentas" className="mt-7 max-w-2xl">
                        <label htmlFor="tools-search" className="mb-2 block text-sm font-bold text-ink">
                            Buscar uma ferramenta
                        </label>

                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-ink" aria-hidden="true" />

                            <Input id="tools-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex.: comprimir PDF" aria-describedby="tools-search-hint" className="h-12 pl-11 pr-12 text-base shadow-soft" />

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
                                        size-10
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
                                    <X className="size-4" aria-hidden="true" />
                                </button>
                            )}
                        </div>

                        <p id="tools-search-hint" className="mt-2 text-sm text-muted-foreground">
                            Pesquise pelo nome, tipo de arquivo, tarefa ou serviço.
                        </p>

                        <ToolFilters category={category} provider={provider} categoryOptions={categoryOptions} providerOptions={providerOptions} onCategoryChange={setCategory} onProviderChange={setProvider} onClear={clearFilters} hasActiveFilters={hasFilters} />

                        {hasControls && (
                            <p className="mt-2 text-sm font-semibold text-coral" role="status" aria-live="polite">
                                {filteredTools.length === 1 ? "1 ferramenta encontrada." : `${filteredTools.length} ferramentas encontradas.`}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {!hasControls && (
                <section aria-labelledby="featured-tools-title" className="border-b border-line bg-mist">
                    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
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
                                <TrendingUp className="size-5" strokeWidth={1.9} />
                            </span>

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-ink">Acesso rápido</p>

                                <h2 id="featured-tools-title" className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
                                    Mais usadas
                                </h2>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Atalhos para algumas das ferramentas mais úteis em tarefas comuns com PDFs e imagens.</p>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredTools.map((tool) => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {hasControls && hasResults && <ToolSection id="tools-search-results-title" label={hasSearch ? "Busca" : "Filtros"} title={hasSearch ? `Resultados para “${search.trim()}”` : "Ferramentas filtradas"} description={`Encontramos ${filteredTools.length} ${filteredTools.length === 1 ? "ferramenta" : "ferramentas"} que correspondem aos critérios selecionados.`} icon={hasSearch ? Search : Filter} tools={filteredTools} />}

            {hasControls && !hasResults && (
                <section aria-labelledby="tools-search-empty-title" className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
                    <div className="max-w-2xl">
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

                        <h2 id="tools-search-empty-title" className="mt-5 max-w-2xl break-words text-2xl font-bold text-ink sm:text-3xl">
                            Nenhuma ferramenta encontrada
                        </h2>

                        <p className="mt-3 max-w-2xl break-words text-base leading-7 text-muted-foreground">{hasSearch ? `Não encontramos uma ferramenta para “${search.trim()}”. Tente pesquisar por outra tarefa, arquivo ou serviço.` : "Nenhuma ferramenta corresponde aos filtros selecionados. Tente outra combinação de filtros."}</p>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setSearch("");
                                clearFilters();
                            }}
                            className="mt-6 w-full sm:w-auto"
                        >
                            Limpar filtros e busca
                        </Button>
                    </div>
                </section>
            )}

            {!hasControls && (
                <>
                    <ToolSection id="pdf-tools-title" label="PDF" title="Disponíveis no" restTitle="iLovePDF" logo="/ilovePDF.svg" alt="Logo do iLovePDF" description="Organize, converta e reduza arquivos PDF em poucos passos." icon={FileText} tools={pdfTools} />

                    <ToolSection id="image-tools-title" label="Imagens" title="Disponíveis no" logo="/iloveIMG.svg" restTitle="iLoveIMG" alt="Logo do iLoveIMG" description="Comprima, redimensione, recorte e converta imagens de forma prática." icon={Images} shaded tools={imageTools} />
                </>
            )}

            <section aria-labelledby="privacy-title" className="bg-mist3">
                <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-ink">Antes de enviar um arquivo</p>

                        <h2 id="privacy-title" className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                            Privacidade e segurança
                        </h2>

                        <p className="mt-3 text-base leading-7 text-muted-foreground">O Hauy Conecta apenas direciona você para serviços externos. Seus arquivos são enviados diretamente ao serviço escolhido e não passam pelo Hauy Conecta.</p>

                        <p className="mt-3 text-sm leading-6 text-muted-ink">Antes de usar uma ferramenta, confira as políticas atualizadas do serviço. Não envie documentos confidenciais ou dados pessoais sem verificar se o serviço atende à necessidade da situação.</p>
                    </div>

                    <div className="mt-7 grid gap-4 md:grid-cols-2">
                        {toolProviders.map((provider) => (
                            <ToolProviderInfo key={provider.id} provider={provider} />
                        ))}
                    </div>
                </div>
            </section>

            <section aria-labelledby="tools-note-title" className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
                <div className="max-w-3xl">
                    <h2 id="tools-note-title" className="text-xl font-bold text-ink">
                        Sobre estas ferramentas
                    </h2>

                    <p className="mt-3 text-base leading-7 text-muted-foreground">O Hauy Conecta reúne atalhos para ferramentas de serviços externos. Ao abrir uma delas, você será levado para o site do serviço responsável pelo processamento.</p>
                </div>
            </section>
        </main>
    );
}
