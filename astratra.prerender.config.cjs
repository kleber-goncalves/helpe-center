const fs = require("node:fs");

const routes = JSON.parse(fs.readFileSync("./prerender-routes.json", "utf8"));

module.exports = {
    distDir: "dist",

    siteUrl: "https://hauy-conecta.vercel.app",

    routes,

    /*
     * O prerender precisa esperar o React terminar
     * de alterar os metadados.
     */
    isReady: async (page) => {
        await page.waitForFunction(
            () => {
                const title = document.title;

                const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content");

                const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute("content");

                const preloader = document.getElementById("site-preloader");

                return title && title !== "Hauy Conecta — Central de Ajuda Digital" && ogTitle && ogDescription && !preloader;
            },
            {
                timeout: 10000,
            },
        );
    },

    audit: true,

    sitemap: false,
};
