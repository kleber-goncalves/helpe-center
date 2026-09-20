import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { tutorials } from "../data/tutorials";
import { Button } from "./ui";

export function SearchBar({ initialValue = "" }) {
    const [query, setQuery] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const results = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return [];
        }

        return tutorials.filter((tutorial) => [tutorial.title, tutorial.description, tutorial.category, ...tutorial.keywords].join(" ").toLowerCase().includes(normalizedQuery));
    }, [query]);

    function submit(event) {
        event.preventDefault();
        navigate(`/tutoriais?q=${encodeURIComponent(query.trim())}`);
        setIsFocused(false);
    }

    function openTutorial(tutorialId) {
        navigate(`/tutoriais/${tutorialId}`);
        setIsFocused(false);
    }

    return (
    <div className="relative z-50">
        <form
            onSubmit={submit}
            className="flex w-full flex-col gap-2 rounded-xl border border-line bg-background p-2 shadow-sm sm:flex-row"
        >
            <label className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-ink" />

                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() =>
                        setTimeout(() => setIsFocused(false), 150)
                    }
                    className="h-12 w-full rounded-lg bg-background pl-10 pr-3 text-base text-ink outline-none placeholder:text-muted-ink focus:ring-2 focus:ring-ink/15"
                    placeholder="O que você irá aprender hoje?"
                    aria-label="Pesquisar tutoriais"
                    autoComplete="off"
                />
            </label>

            <Button type="submit" variant="coral" className="sm:px-6">
                Pesquisar
            </Button>
        </form>

        {isFocused && query.trim() && (
            <div className="absolute z-[100] mt-2 w-full overflow-hidden rounded-xl border border-line bg-background text-left shadow-lg">
                {results.length > 0 ? (
                    <>
                        <p className="border-b border-line px-4 py-3 text-xs font-bold uppercase tracking-wide text-muted-ink">
                            Tutoriais encontrados
                        </p>

                        {results.slice(0, 5).map((tutorial) => {
                            const category = categories.find(
                                (item) => item.id === tutorial.category
                            );

                            return (
                                <button
                                    key={tutorial.id}
                                    type="button"
                                    onMouseDown={(event) =>
                                        event.preventDefault()
                                    }
                                    onClick={() =>
                                        openTutorial(tutorial.id)
                                    }
                                    className="block w-full border-b border-line px-4 py-3 text-left last:border-b-0 hover:bg-mist focus:bg-mist focus:outline-none"
                                >
                                    <span className="block text-sm font-bold text-ink">
                                        {tutorial.title}
                                    </span>

                                    <span className="mt-1 block text-xs text-muted-ink">
                                        {category?.name} ·{" "}
                                        {tutorial.duration}
                                    </span>
                                </button>
                            );
                        })}
                    </>
                ) : (
                    <p className="px-4 py-5 text-sm text-muted-ink">
                        Nenhum tutorial encontrado. Tente outra palavra.
                    </p>
                )}
            </div>
        )}
    </div>
    );
}
