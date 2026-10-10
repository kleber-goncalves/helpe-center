import { SectionTransition } from "./SectionTransition";
import { ToolCard } from "./ToolCard";
import { OptimizedImage } from "./OptimizedImage";

export function ToolSection({ id, background, label, title, restTitle, alt, logo, showImage = true, description, icon: Icon, tools, transition }) {
    return (
        <section aria-labelledby={id} className={background}>
            <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
                <div className="flex  items-start gap-3">
                    <span
                        className="
                            flex
                            size-20
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-coral-soft
                            text-coral
                        "
                        aria-hidden="true"
                    >
                        <Icon className="size-12" strokeWidth={1.9} />
                    </span>

                    <div className="min-w-0  pb-5">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-ink">{label}</p>

                        <div className="mt-1 flex flex-col items-start md:flex-row gap-2 break-words">
                            <h2 id={id} className=" break-words text-2xl font-bold text-ink sm:text-3xl">
                                {title}
                            </h2>
                            <div className="flex items-center gap-0.5">
{showImage && logo && (
                                    <OptimizedImage
                                        src={logo}
                                        alt={alt}
                                        fetchPriority="low"
                                        loading="lazy"
                                        decoding="async"
                                        wrapperClassName="h-8 w-8 shrink-0 rounded-lg"
                                        sizes="32px"
                                        className="object-contain"
                                    />
                                )}
                                <h2 className=" break-words text-2xl font-bold text-ink sm:text-3xl">{restTitle}</h2>
                            </div>
                        </div>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
                    </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {tools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))}
                </div>
            </div>
            {transition && <SectionTransition {...transition} />}
        </section>
    );
}
