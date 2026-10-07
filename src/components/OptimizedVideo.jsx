import imageMetadata from "../generated/imageMetadata.json";

function resolvePosterKey(poster) {
    if (typeof poster !== "string") {
        return null;
    }

    const cleanPoster = poster.split(/[?#]/, 1)[0];

    if (cleanPoster.startsWith("/")) {
        return `public/${cleanPoster.slice(1)}`;
    }

    return null;
}

export function OptimizedVideo({
    src,
    poster,
    title = "Vídeo do tutorial",
    captions,
    className = "",
    wrapperClassName = "",
    width,
    height,
    preload = "metadata",
    ...props
}) {
    const posterMetadata = imageMetadata.images[resolvePosterKey(poster)] ?? null;

    const resolvedWidth = width ?? posterMetadata?.width;
    const resolvedHeight = height ?? posterMetadata?.height;


    return (
        <video
            className={[
                "mx-auto block h-auto w-full rounded-lg border border-line",
                wrapperClassName,
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            width={resolvedWidth}
            height={resolvedHeight}
            controls
            preload={preload}
            playsInline
            poster={poster}
            aria-label={title}
            {...props}
        >
            <source src={src} type="video/mp4" />
            {captions && (
                <track
                    kind="captions"
                    src={captions}
                    srcLang="pt-BR"
                    label="Português"
                    default
                />
            )}
            Seu navegador não suporta a reprodução deste vídeo.
        </video>
    );
}
