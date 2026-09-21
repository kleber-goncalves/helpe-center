import { useId } from "react";

export function TeamOption({ value, label, activeGroup, onChange }) {
    const id = useId();

    const checked = activeGroup === value;

    return (
        <label htmlFor={id} className="cursor-pointer">
            <input id={id} type="radio" name="team-group" value={value} checked={checked} onChange={() => onChange(value)} className="peer sr-only" aria-controls="team-members" />

            <span className={["flex min-h-10 items-center gap-2.5", "rounded-md px-4 py-2", "text-sm font-semibold", "text-muted-ink", "transition-colors duration-200", "peer-checked:bg-mist3", "peer-checked:text-foreground", "peer-focus-visible:outline-none", "peer-focus-visible:ring-2", "peer-focus-visible:ring-coral/50", "peer-focus-visible:ring-offset-2"].join(" ")}>
                {/* Indicador */}
                <span className={["grid h-4 w-4 place-items-center", "rounded-full border", checked ? "border-coral" : "border-current"].join(" ")} aria-hidden="true">
                    <span className={["h-2 w-2 rounded-full bg-coral", "transition-opacity duration-200", checked ? "opacity-100" : "opacity-0"].join(" ")} />
                </span>

                <span>{label}</span>
            </span>
        </label>
    );
}
