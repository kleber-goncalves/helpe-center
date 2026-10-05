import { ToolCard } from "./ToolCard";

export function ToolSection({
    id,
    label,
    title,
    description,
    icon: Icon,
    tools,
    shaded = false,
}) {
    return (
        <section
            aria-labelledby={id}
            className={shaded ? "bg-mist3" : ""}
        >
            <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
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
                        <Icon className="size-5" strokeWidth={1.9} />
                    </span>

                    <div className="min-w-0 border-b border-line pb-5">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-ink">
                            {label}
                        </p>

                        <h2
                            id={id}
                            className="mt-1 break-words text-2xl font-bold text-ink sm:text-3xl"
                        >
                            {title}
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {tools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))}
                </div>
            </div>
        </section>
    );
}
