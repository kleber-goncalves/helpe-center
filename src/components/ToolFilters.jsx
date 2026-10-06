import { Filter, X } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui";

function FilterToken({
    label,
    value,
    allLabel,
    options,
    onChange,
    onClear,
    selectId,
}) {
    const active = value !== "all";

    return (
        <div className="group inline-flex min-h-9 max-w-full items-center overflow-hidden rounded-md border border-line bg-mist/80 transition-colors duration-200 hover:bg-mist2">
            <span className="shrink-0 pl-2.5 text-[13px] font-medium text-muted-ink">
                {label}
            </span>

            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    id={selectId}
                    aria-label={label + ": " + (active ? value : allLabel)}
                    className="h-9 min-w-0 w-auto max-w-[12rem] border-0 bg-transparent px-1.5 py-0 text-[13px] font-semibold text-ink shadow-none focus:ring-0 focus:ring-offset-0 hover:bg-transparent"
                >
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">{allLabel}</SelectItem>

                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {active && (
                <button
                    type="button"
                    onClick={onClear}
                    aria-label={"Limpar filtro de " + label.toLowerCase()}
                    title={"Limpar filtro de " + label.toLowerCase()}
                    className="mr-0.5 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-ink transition-colors hover:bg-mist2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/50"
                >
                    <X className="size-3.5" strokeWidth={1.9} aria-hidden="true" />
                </button>
            )}
        </div>
    );
}

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
        <fieldset className="mt-5">
            <legend className="sr-only">Filtros das ferramentas</legend>

            <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 pr-0.5 text-[13px] font-bold text-ink" aria-hidden="true">
                    <Filter className="size-3.5 text-coral" strokeWidth={1.9} />
                    Filtros
                </span>

                <FilterToken
                    label="Categoria"
                    value={category}
                    allLabel="Todas"
                    options={categoryOptions}
                    onChange={onCategoryChange}
                    onClear={() => onCategoryChange("all")}
                    selectId="tools-category-filter"
                />

                <FilterToken
                    label="Serviço"
                    value={provider}
                    allLabel="Todos"
                    options={providerOptions}
                    onChange={onProviderChange}
                    onClear={() => onProviderChange("all")}
                    selectId="tools-provider-filter"
                />

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="inline-flex min-h-9 cursor-pointer items-center rounded-md px-2 text-[13px] font-semibold text-muted-ink transition-colors hover:bg-mist hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/50"
                    >
                        Limpar
                    </button>
                )}
            </div>
        </fieldset>
    );
}