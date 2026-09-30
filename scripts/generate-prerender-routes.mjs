import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const OUTPUT_FILE = path.resolve("prerender-routes.json");

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

        const routes = ["/", "/sobre", "/categorias", "/tutoriais", "/faq", "/enviar-duvida", "/assistente", ...categories.map((category) => `/categorias/${category.id}`), ...tutorials.map((tutorial) => `/tutoriais/${tutorial.id}`)];

        const uniqueRoutes = [...new Set(routes)].sort();

        await fs.writeFile(OUTPUT_FILE, JSON.stringify(uniqueRoutes, null, 2), "utf8");

        console.log(`✓ ${uniqueRoutes.length} rotas encontradas.`);

        console.log(`✓ Arquivo criado: ${path.relative(process.cwd(), OUTPUT_FILE)}`);
    } finally {
        await vite.close();
    }
}

main().catch((error) => {
    console.error("✗ Erro ao gerar as rotas:");

    console.error(error);

    process.exit(1);
});
