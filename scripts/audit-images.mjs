import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST_DIR = path.join(ROOT, "dist");

const EXEMPT_IDS = new Set([
    "initial-preloader-shell__logo",
]);

async function walk(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const absolutePath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...(await walk(absolutePath)));
            continue;
        }

        if (entry.name.toLowerCase().endsWith(".html")) {
            files.push(absolutePath);
        }
    }

    return files;
}

function getAttribute(tag, name) {
    const match = tag.match(
        new RegExp(`\${name}=["']([^"']*)["']`, "i"),
    );

    return match?.[1] ?? null;
}

async function main() {
    const htmlFiles = await walk(DIST_DIR);
    let imageCount = 0;
    const errors = [];

    for (const filePath of htmlFiles) {
        const html = await fs.readFile(filePath, "utf8");
        const tags = html.match(/<img\b[^>]*>/gi) ?? [];

        for (const tag of tags) {
            imageCount += 1;

            const id = getAttribute(tag, "id");

            if (id && EXEMPT_IDS.has(id)) {
                continue;
            }

            const width = getAttribute(tag, "width");
            const height = getAttribute(tag, "height");
            const alt = getAttribute(tag, "alt");

            if (!width || !height) {
                errors.push(
                    path.relative(ROOT, filePath) +
                        ": imagem sem width/height -> " +
                        tag.slice(0, 180),
                );
            }

            if (alt === null) {
                errors.push(
                    path.relative(ROOT, filePath) +
                        ": imagem sem atributo alt -> " +
                        tag.slice(0, 180),
                );
            }
        }
    }

    if (errors.length > 0) {
        throw new Error(
            "Auditoria de imagens encontrou " +
                errors.length +
                " problema(s):\n" +
                errors.join("\n"),
        );
    }

    console.log(
        "[image-audit] " +
            imageCount +
            " imagens verificadas em " +
            htmlFiles.length +
            " arquivos HTML.",
    );
    console.log("[image-audit] Todas possuem width/height e alt.");
}

main().catch((error) => {
    console.error("[image-audit] Falha na auditoria.");
    console.error(error);
    process.exitCode = 1;
});
