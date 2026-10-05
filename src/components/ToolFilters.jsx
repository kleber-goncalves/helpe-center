import { RotateCcw } from "lucide-react";

import {
    Button,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui";

export function ToolFilters({
    category,
    provider,
    categoryOptions,
    providerOptions,
    onCategoryChange,
    onProviderChange,
    onClear,
    hasActiveFilters,
}) {
    return (
        <fieldset className="mt-5 rounded-xl border border-line bg-background p-4">
            <legend className="sr-only">Filtros das ferramentas</legend>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm font-bold text-ink" aria-hidden="true">Filtrar ferramentas</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Escolha um tipo de conteúdo ou serviço.
                    </p>
                </div>

                {hasActiveFilters && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClear}
                        className="w-full md:w-auto"
                    >
                        <RotateCcw className="size-4" aria-hidden="true" />
                        Limpar filtros
                    </Button>
                )}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label
                        htmlFor="tools-category-filter"
                        className="text-sm font-semibold text-ink"
                    >
                        Categoria
                    </label>

                    <Select value={category} onValueChange={onCategoryChange}>
                        <SelectTrigger id="tools-category-filter">
                            <SelectValue placeholder="Todas as categorias" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">Todas as categorias</SelectItem>
                            {categoryOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <label
                        htmlFor="tools-provider-filter"
                        className="text-sm font-semibold text-ink"
                    >
                        Serviço
                    </label>

                    <Select value={provider} onValueChange={onProviderChange}>
                        <SelectTrigger id="tools-provider-filter">
                            <SelectValue placeholder="Todos os serviços" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">Todos os serviços</SelectItem>
                            {providerOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </fieldset>
    );
}
