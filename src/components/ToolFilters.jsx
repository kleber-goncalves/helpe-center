import { useState } from "react";
import { Filter, Plus, X } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui";

const FILTER_FIELDS = {
    category: "Categoria",
    provider: "Serviço",
};

function focusAddFilter() {
    window.setTimeout(() => document.getElementById("tools-add-filter")?.focus(), 0);
}

function FilterToken({
    label,
    value,
    allLabel,
    placeholder,
    options,
    onChange,
    onRemove,
    selectId,
}) {
    const active = value !== "all";

    const removeFilter = () => {
        onRemove();
        focusAddFilter();
    };

    return (
        <div
            className={
                [
                    "flex min-w-0 max-w-full shrink-0 items-center overflow-hidden rounded-md border transition-colors duration-200",
                    "min-h-9",
                    active
                        ? "border-coral/30 bg-coral-soft/50 focus-within:border-coral/50 focus-within:bg-background"
                        : "border-line bg-mist/80 hover:border-line hover:bg-mist2 focus-within:border-coral/40 focus-within:bg-background",
                ].join(" ")
            }
        >
            <span className="min-w-0 shrink-0 pl-2.5 text-[13px] font-medium text-muted-ink">
                {label}
            </span>

            <span className="shrink-0 px-1 text-[12px] text-muted-ink/70" aria-hidden="true">
                ·
            </span>

            <Select value={value === "all" ? "" : value} onValueChange={onChange}>
                <SelectTrigger
                    id={selectId}
                    aria-label={label + ": " + (active ? value : placeholder)}
                    className="h-9 min-w-0 max-w-[12rem] shrink gap-1 border-0 bg-transparent px-0.5 py-0 text-[13px] font-semibold text-ink shadow-none transition-colors hover:bg-transparent focus-visible:bg-mist2 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/50 focus-visible:ring-offset-0 [&>span]:min-w-0 [&>span]:truncate"
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent className="min-w-[10rem] max-w-[calc(100vw-1rem)] rounded-lg border-line bg-background shadow-lift">
                    <SelectItem value="all" className="text-[13px]">
                        {allLabel}
                    </SelectItem>

                    {options.map((option) => (
                        <SelectItem key={option} value={option} className="text-[13px]">
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <button
                type="button"
                onClick={removeFilter}
                aria-label={"Remover filtro de " + label.toLowerCase()}
                title={"Remover filtro de " + label.toLowerCase()}
                className="mr-0.5 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-ink transition-colors hover:bg-coral-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/50"
            >
                <X className="size-3.5" strokeWidth={1.9} aria-hidden="true" />
            </button>
        </div>
    );
}

function AddFilterControl({ availableFields, onAdd }) {
    const [value, setValue] = useState("");

    if (availableFields.length === 0) {
        return null;
    }

    return (
        <Select
            value={value}
            onValueChange={(nextValue) => {
                onAdd(nextValue);
                setValue("");
            }}
        >
            <SelectTrigger
                id="tools-add-filter"
                aria-label="Adicionar filtro"
                className="h-9 min-h-9 w-auto max-w-full shrink-0 gap-1.5 rounded-md border border-dashed border-line bg-transparent px-2.5 text-[13px] font-semibold text-muted-ink shadow-none transition-colors hover:border-coral/40 hover:bg-mist hover:text-ink focus-visible:border-coral/50 focus-visible:ring-2 focus-visible:ring-coral/30 focus-visible:ring-offset-0 [&>span]:truncate"
            >
                <Plus className="size-3.5 shrink-0" strokeWidth={1.9} aria-hidden="true" />
                <SelectValue placeholder="Adicionar filtro" />
            </SelectTrigger>

            <SelectContent className="min-w-[10rem] max-w-[calc(100vw-1rem)] rounded-lg border-line bg-background shadow-lift">
                {availableFields.map((field) => (
                    <SelectItem key={field} value={field} className="text-[13px]">
                        {FILTER_FIELDS[field]}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export function ToolFilters({
    category,
    provider,
    filterOrder,
    categoryOptions,
    providerOptions,
    onCategoryChange,
    onProviderChange,
    onAddFilter,
    onRemoveFilter,
    onClear,
    hasActiveFilters,
}) {
    const availableFields = ["category", "provider"].filter(
        (field) => !filterOrder.includes(field),
    );

    const handleAddFilter = (field) => {
        onAddFilter(field);
    };

    const clearFilters = () => {
        onClear();
        focusAddFilter();
    };

    return (
        <fieldset className="mt-6 min-w-0">
            <legend className="sr-only">Filtros das ferramentas</legend>

            <div className="flex min-w-0 max-w-full flex-wrap items-center gap-2">
                <span className="inline-flex min-h-9 shrink-0 items-center gap-1.5 pr-0.5 text-[13px] font-bold text-ink" aria-hidden="true">
                    <Filter className="size-3.5 text-coral" strokeWidth={1.9} />
                    Filtros
                </span>

                {filterOrder.map((field) => {
                    if (field === "category") {
                        return (
                            <FilterToken
                                key={field}
                                label="Categoria"
                                value={category}
                                allLabel="Todas"
                                placeholder="Selecionar categoria"
                                options={categoryOptions}
                                onChange={onCategoryChange}
                                onRemove={() => onRemoveFilter(field)}
                                selectId="tools-category-filter"
                            />
                        );
                    }

                    return (
                        <FilterToken
                            key={field}
                            label="Serviço"
                            value={provider}
                            allLabel="Todos"
                            placeholder="Selecionar serviço"
                            options={providerOptions}
                            onChange={onProviderChange}
                            onRemove={() => onRemoveFilter(field)}
                            selectId="tools-provider-filter"
                        />
                    );
                })}

                <AddFilterControl
                    availableFields={availableFields}
                    onAdd={handleAddFilter}
                />

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        aria-label="Limpar todos os filtros"
                        title="Limpar todos os filtros"
                        className="inline-flex min-h-9 max-w-full shrink-0 cursor-pointer items-center rounded-md px-2 text-[13px] font-semibold text-muted-ink transition-colors hover:bg-mist hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/50 sm:border-l sm:border-line sm:pl-3"
                    >
                        Limpar
                    </button>
                )}
            </div>
        </fieldset>
    );
}