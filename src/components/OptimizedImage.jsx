import { useEffect, useState } from "react";

import imageMetadata from "../generated/imageMetadata.json";

function resolveMetadataKey(src, metadataKey) {
    if (metadataKey) {
        return metadataKey;
    }

    if (typeof src !== "string") {
        return null;
    }

    const cleanSrc = src.split(/[?#]/, 1)[0];

    if (cleanSrc.startsWith("/")) {
        return `public/${cleanSrc.slice(1)}`;
    }

    return null;
}

export function OptimizedImage({
    src,
    alt,
    metadataKey,
    placeholderSrc,
    wrapperClassName = "",
    className = "",
    width,
    height,
    loading = "lazy",
    fetchPriority = "auto",
    decoding = "async",
    onLoad,
    onError,
    ...props
}) {
    const resolvedMetadata =
        imageMetadata.images[resolveMetadataKey(src, metadataKey)] ?? null;

    const resolvedWidth = width ?? resolvedMetadata?.width;
    const resolvedHeight = height ?? resolvedMetadata?.height;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
    }, [src, placeholderSrc]);

    const handleLoad = (event) => {
        setLoaded(true);
        onLoad?.(event);
    };

    const aspectRatio =
        resolvedWidth && resolvedHeight
            ? `${resolvedWidth} / ${resolvedHeight}`
            : undefined;

    return (
        <div
            className={["relative overflow-hidden", wrapperClassName].filter(Boolean).join(" ")}
            style={{ aspectRatio }}
        >
            {placeholderSrc && (
                <img
                    src={placeholderSrc}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                    draggable="false"
                    className={[
                        "absolute inset-0 h-full w-full scale-[1.03] object-cover blur-sm",
                        "transition-opacity duration-300",
                        loaded ? "opacity-0" : "opacity-100",
                    ].join(" ")}
                />
            )}

            <img
                src={src}
                alt={alt}
                width={resolvedWidth}
                height={resolvedHeight}
                loading={loading}
                fetchPriority={fetchPriority}
                decoding={decoding}
                draggable="false"
                onLoad={handleLoad}
                onError={onError}
                className={[
                    "relative block h-full w-full transition-opacity duration-300 motion-reduce:transition-none",
                    loaded || !placeholderSrc ? "opacity-100" : "opacity-0",
                    className,
                ].join(" ")}
                {...props}
            />
        </div>
    );
}
