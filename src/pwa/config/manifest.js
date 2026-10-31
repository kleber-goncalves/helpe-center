export const pwaManifest = {
    id: "/",
    name: "Hauy Conecta — Central de Ajuda Digital",
    short_name: "Hauy Conecta",
    description:
        "Central de Ajuda Digital da Escola Estadual Hauy Petrucely Mairync.",
    lang: "pt-BR",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#B4532D",
    icons: [
        {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
        },
        {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
        },
        {
            src: "/icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
        },
    ],
};
