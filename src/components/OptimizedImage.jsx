import { useState } from "react";

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

export function OptimizedImage({ src, alt, metadataKey, placeholderSrc, wrapperClassName = "", className = "", width, aspectRatio: aspectRatioOverride, height, sizes, loading = "lazy", fetchPriority = "auto", decoding = "async", onLoad, onError, ...props }) {
    const resolvedMetadata = imageMetadata.images[resolveMetadataKey(src, metadataKey)] ?? null;

    const resolvedWidth = width ?? resolvedMetadata?.width;
    const resolvedHeight = height ?? resolvedMetadata?.height;
    const resolvedPlaceholderSrc = placeholderSrc ?? resolvedMetadata?.placeholder ?? null;

    const [loadedSrc, setLoadedSrc] = useState(null);
    const loaded = loadedSrc === src;

    const handleLoad = (event) => {
        setLoadedSrc(src);
        onLoad?.(event);
    };

    const aspectRatio = aspectRatioOverride ?? (resolvedWidth && resolvedHeight ? `${resolvedWidth} / ${resolvedHeight}` : undefined);

    const responsiveCandidates = resolvedMetadata?.responsive?.map(({ src: responsiveSrc, width: responsiveWidth }) => `${responsiveSrc} ${responsiveWidth}w`) ?? [];

    if (resolvedWidth) {
        responsiveCandidates.push(`${src} ${resolvedWidth}w`);
    }

    const resolvedSrcSet = responsiveCandidates.length > 1 ? responsiveCandidates.join(", ") : undefined;

    return (
        <div className={["relative overflow-hidden", wrapperClassName].filter(Boolean).join(" ")} style={{ aspectRatio }}>
            {resolvedPlaceholderSrc && <img src={resolvedPlaceholderSrc} alt={alt} width={resolvedWidth} height={resolvedHeight} aria-hidden="true" decoding="async" draggable="false" className={["absolute inset-0 h-full w-full scale-[0.76] object-cover blur-sm", "transition-normal duration-300", loaded ? "opacity-0" : "opacity-0"].join(" ")} />}

            <img src={src} alt={alt} width={resolvedWidth} height={resolvedHeight} loading={loading} fetchPriority={fetchPriority} decoding={decoding} sizes={sizes} srcSet={resolvedSrcSet} draggable="false" onLoad={handleLoad} onError={onError} className={["relative block h-full w-full transition-opacity duration-300 motion-reduce:transition-none", loaded || !resolvedPlaceholderSrc ? "opacity-100" : "opacity-100", className].join(" ")} {...props} />
            
        </div>
    );
}
