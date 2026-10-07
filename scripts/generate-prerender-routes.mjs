import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const OUTPUT_FILE = path.resolve("prerender-routes.json");
const SITEMAP_FILE = path.resolve("public/sitemap.xml");
const SITE_URL = "https://hauy-conecta.vercel.app";

function escapeXml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

function createSitemapXml(routes) {
    const urls = routes
        .map((route) => `  <url>\n    <loc>${escapeXml(`${SITE_URL}${route}`)}</loc>\n  </url>`)
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
    console.log("Gerando lista de rotas para pré-renderização...");

    const vite = await createServer({
        server: {
            middlewareMode: true,
        },
    });

    try {
        const categoriesModule = await vite.ssrLoadModule("/src/data/categories.js");
        const tutorialsModule = await vite.ssrLoadModule("/src/data/tutorials.js");

        const categories = categoriesModule.categories ?? [];
        const tutorials = tutorialsModule.tutorials ?? [];

        const routes = [
            "/",
            "/sobre",
            "/categorias",
            "/tutoriais",
            "/ferramentas",
            "/faq",
            "/enviar-duvida",
            "/assistente",
            ...categories.map((category) => `/categorias/${category.id}`),
            ...tutorials.map((tutorial) => `/tutoriais/${tutorial.id}`),
        ];

        const uniqueRoutes = [...new Set(routes)];

        await fs.writeFile(
            OUTPUT_FILE,
            JSON.stringify(uniqueRoutes.sort(), null, 2),
            "utf8",
        );

        await fs.mkdir(path.dirname(SITEMAP_FILE), {
            recursive: true,
        });

        await fs.writeFile(
            SITEMAP_FILE,
            createSitemapXml(uniqueRoutes),
            "utf8",
        );

        console.log(`✓ ${uniqueRoutes.length} rotas encontradas.`);
        console.log(`✓ Arquivo de rotas criado: ${path.relative(process.cwd(), OUTPUT_FILE)}`);
        console.log(`✓ Sitemap criado: ${path.relative(process.cwd(), SITEMAP_FILE)}`);
    } finally {
        await vite.close();
    }
}

main().catch((error) => {
    console.error("✗ Erro ao gerar as rotas e o sitemap:");
    console.error(error);
    process.exit(1);
});