import { cn } from "../lib/utils";

/**
 * Renderiza um SVG colado diretamente no código ou um SVG carregado por URL.
 *
 * Use apenas strings SVG estáticas e confiáveis no campo `svg`.
 */
export function SvgIcon({ icon, className = "size-9", fallbackSrc, title }) {
    const inlineSvg = typeof icon === "string" ? icon : icon?.svg;
    const src = typeof icon === "object" && icon !== null ? icon.src : undefined;
    const accessibilityProps = title
        ? { role: "img", "aria-label": title }
        : { "aria-hidden": true };

    if (typeof inlineSvg === "string" && inlineSvg.trim().startsWith("<svg")) {
        return (
            <span
                className={cn(
                    "inline-flex shrink-0 items-center justify-center [&>svg]:block [&>svg]:h-full [&>svg]:w-full",
                    className,
                )}
                {...accessibilityProps}
                dangerouslySetInnerHTML={{ __html: inlineSvg }}
            />
        );
    }

    if (!src) return null;

    return (
        <img
            src={src}
            alt={title ?? ""}
            width="36"
            height="36"
            loading="lazy"
            decoding="async"
            className={cn("shrink-0 object-contain", className)}
            {...accessibilityProps}
            onError={(event) => {
                const image = event.currentTarget;

                if (fallbackSrc && image.getAttribute("src") !== fallbackSrc) {
                    image.setAttribute("src", fallbackSrc);
                }
            }}
        />
    );
}
