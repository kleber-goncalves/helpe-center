import { Clock, Search, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { tutorials } from "../data/tutorials";
import { Button } from "./ui";
import { searchTutorials } from "../lib/searchTutorials";

const RECENT_SEARCHES_KEY = "hauy-conecta-recent-searches";
const MAX_RECENT_SEARCHES = 5;

export function SearchBar({ initialValue = "" }) {
    const [query, setQuery] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);

    const [recentSearches, setRecentSearches] = useState(() => {
        try {
            const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);

            if (!storedSearches) {
                return [];
            }

            const parsedSearches = JSON.parse(storedSearches);

            return Array.isArray(parsedSearches) ? parsedSearches : [];
        } catch {
            return [];
        }
    });

    const inputRef = useRef(null);

    const navigate = useNavigate();

    /*
     * Resultados da pesquisa atual
     */
    const results = useMemo(() => searchTutorials(query, tutorials, categories), [query]);

    /*
     * Salva a pesquisa no histórico
     */
    function saveRecentSearch(value) {
        const normalizedValue = value.trim();

        if (!normalizedValue) {
            return;
        }

        try {
            const existingSearches = recentSearches.filter((item) => item.toLowerCase() !== normalizedValue.toLowerCase());

            const nextSearches = [normalizedValue, ...existingSearches].slice(0, MAX_RECENT_SEARCHES);

            setRecentSearches(nextSearches);

            localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextSearches));
        } catch {
            // localStorage indisponível
        }
    }

    /*
     * Executa pesquisa
     */
    function submit(event) {
        event.preventDefault();

        const value = query.trim();

        if (!value) {
            return;
        }

        saveRecentSearch(value);

        navigate({
            pathname: "/tutoriais",
            search: `?q=${encodeURIComponent(value)}`,
        });

        setIsFocused(false);
    }
    /*
     * Abre um tutorial
     */
    function openTutorial(tutorialId) {
        navigate(`/tutoriais/${tutorialId}`);
        setIsFocused(false);
    }

    /*
     * Limpa o campo
     */
    function clearSearch() {
        setQuery("");

        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    }

    /*
     * Seleciona uma pesquisa recente
     */
    function selectRecentSearch(search) {
        setQuery(search);
        setIsFocused(true);

        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    }

    /*
     * Remove uma pesquisa recente
     */
    function removeRecentSearch(search) {
        const nextSearches = recentSearches.filter((item) => item !== search);

        setRecentSearches(nextSearches);

        try {
            localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextSearches));
        } catch {
            // localStorage indisponível
        }
    }

    /*
     * Limpa todas as pesquisas recentes
     */
    function clearRecentSearches() {
        setRecentSearches([]);

        try {
            localStorage.removeItem(RECENT_SEARCHES_KEY);
        } catch {
            // localStorage indisponível
        }
    }

    const hasQuery = query.trim().length > 0;

    const shouldShowDropdown = isFocused && (hasQuery || recentSearches.length > 0);

    return (
        <div className="relative z-50">
            <form onSubmit={submit} className={["flex w-full flex-col gap-2", "rounded-xl border border-line", "bg-background p-2 shadow-sm", "sm:flex-row"].join(" ")}>
                <div className="relative min-w-0 flex-1">
                    <label htmlFor="site-search" className="sr-only">
                        Pesquisar tutoriais
                    </label>

                    {/* Ícone de pesquisa */}
                    <Search className={["pointer-events-none absolute left-3 top-1/2", "h-5 w-5 -translate-y-1/2", "text-muted-ink"].join(" ")} aria-hidden="true" />

                    <input
                        ref={inputRef}
                        id="site-search"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setTimeout(() => {
                                setIsFocused(false);
                            }, 150);
                        }}
                        className={["h-12 w-full rounded-lg", "bg-background", "pl-10", hasQuery ? "pr-11" : "pr-3", "text-base text-ink", "outline-none", "placeholder:text-muted-ink", "focus:ring-2 focus:ring-ink/15"].join(" ")}
                        placeholder="O que você irá aprender hoje?"
                        autoComplete="off"
                    />

                    {/* Limpar pesquisa */}
                    {hasQuery && (
                        <button
                            type="button"
                            onMouseDown={(event) => {
                                event.preventDefault();
                            }}
                            onClick={clearSearch}
                            aria-label="Limpar pesquisa"
                            title="Limpar pesquisa"
                            className={["absolute right-2 top-1/2", "-translate-y-1/2", "inline-flex h-8 w-8", "cursor-pointer", "items-center justify-center", "rounded-md", "text-muted-ink", "transition-colors duration-200", "hover:bg-mist", "hover:text-ink", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40"].join(" ")}
                        >
                            <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                        </button>
                    )}
                </div>

                {/* Pesquisar */}
                <Button type="submit" variant="coral" className="sm:px-6">
                    Pesquisar
                </Button>
            </form>

            {/* Dropdown */}
            {shouldShowDropdown && (
                <div className={["absolute z-[100] mt-2 w-full", "overflow-hidden rounded-xl", "border border-line", "bg-background text-left", "shadow-lg"].join(" ")}>
                    {/* Pesquisas recentes */}
                    {!hasQuery && recentSearches.length > 0 && (
                        <section aria-labelledby="recent-searches-title" className="p-2">
                            <div className="flex items-center justify-between px-3 py-2">
                                <h2 id="recent-searches-title" className="text-xs font-bold uppercase tracking-wide text-muted-ink">
                                    Pesquisas recentes
                                </h2>

                                <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={clearRecentSearches} className={["cursor-pointer", "text-xs font-semibold", "text-muted-ink", "transition-colors duration-200", "hover:text-coral", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40"].join(" ")}>
                                    Limpar
                                </button>
                            </div>

                            <div className="flex flex-col">
                                {recentSearches.map((search) => (
                                    <div key={search} className={["group flex items-center", "rounded-lg", "transition-colors duration-200", "hover:bg-mist"].join(" ")}>
                                        {/* Pesquisa */}
                                        <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => selectRecentSearch(search)} className={["flex min-w-0 flex-1 items-center gap-3", "cursor-pointer", "truncate", "px-3 py-2.5", "text-left text-sm", "font-semibold text-ink", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40", "focus-visible:ring-inset"].join(" ")}>
                                            <Clock className="h-4 w-4 shrink-0 text-muted-ink" strokeWidth={1.8} aria-hidden="true" />

                                            <span className="min-w-0 truncate">{search}</span>
                                        </button>

                                        {/* Remover */}
                                        <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => removeRecentSearch(search)} aria-label={`Remover pesquisa recente ${search}`} title="Remover pesquisa" className={["mr-1 inline-flex h-8 w-8", "shrink-0 cursor-pointer", "items-center justify-center", "rounded-md", "text-muted-ink", "opacity-0", "transition-[opacity,background-color,color]", "duration-200", "group-hover:opacity-100", "focus-visible:opacity-100", "hover:bg-background", "hover:text-ink", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/40"].join(" ")}>
                                            <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Resultados */}
                    {hasQuery && (
                        <section aria-labelledby="search-results-title">
                            {results.length > 0 ? (
                                <>
                                    <h2 id="search-results-title" className="border-b border-line px-4 py-3 text-xs font-bold uppercase tracking-wide text-muted-ink">
                                        Tutoriais encontrados
                                    </h2>

                                    <div>
                                        {results.slice(0, 5).map((tutorial) => {
                                            const category = categories.find((item) => item.id === tutorial.category);

                                            return (
                                                <button key={tutorial.id} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => openTutorial(tutorial.id)} className={["cursor-pointer flex flex-row items-center w-full gap-3", "border-b border-line", "px-4 py-3", "text-left", "last:border-b-0", "transition-colors duration-200", "hover:bg-mist", "focus:bg-mist", "focus:outline-none"].join(" ")}>
                                                    <Search className="h-4 w-4 shrink-0 text-muted-ink" strokeWidth={1.8} aria-hidden="true" />
                                                    <div className="min-w-0 flex flex-col items-start">
                                                        <span className="block w-full truncate text-sm font-bold text-ink">{tutorial.title}</span>
                                                        <span className="mt-1 block text-xs text-muted-ink">
                                                            {category?.name} · {tutorial.duration}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <p className="px-4 py-5 text-sm text-muted-ink">Nenhum tutorial encontrado. Tente outra palavra.</p>
                            )}
                        </section>
                    )}
                </div>
            )}
        </div>
    );
}
