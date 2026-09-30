import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/*
 * =========================================================
 * CONFIGURAÇÃO
 * =========================================================
 *
 * Somente estas imagens serão convertidas.
 *
 * O nome é comparado sem diferenciar maiúsculas/minúsculas.
 *
 * Exemplos encontrados:
 *
 * hero.png
 * hero.jpg
 * helpCTA.png
 * search.webp
 * category.jpeg
 * about.png
 */

const PUBLIC_DIR = path.resolve("public");

const TARGET_NAMES = new Set(["hero", "helpcta", "search", "category", "about"]);

const SOURCE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

const WEBP_OPTIONS = {
    quality: 85,
    effort: 6,
};

/*
 * =========================================================
 * FORMATAR TAMANHO
 * =========================================================
 */

function formatSize(bytes) {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/*
 * =========================================================
 * BUSCAR ARQUIVOS
 * =========================================================
 */

async function getFiles(directory) {
    const entries = await fs.readdir(directory, {
        withFileTypes: true,
    });

    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...(await getFiles(fullPath)));

            continue;
        }

        files.push(fullPath);
    }

    return files;
}

/*
 * =========================================================
 * VERIFICAR SE É UMA IMAGEM ALVO
 * =========================================================
 */

function isTargetImage(filePath) {
    const extension = path.extname(filePath).toLowerCase();

    if (!SOURCE_EXTENSIONS.has(extension)) {
        return false;
    }

    const fileName = path.basename(filePath, extension);

    return TARGET_NAMES.has(fileName.toLowerCase());
}

/*
 * =========================================================
 * CONVERTER IMAGEM
 * =========================================================
 */

async function convertImage(filePath) {
    const extension = path.extname(filePath);

    const outputPath = filePath.slice(0, -extension.length) + ".webp";

    const originalStats = await fs.stat(filePath);

    await sharp(filePath).webp(WEBP_OPTIONS).toFile(outputPath);

    const webpStats = await fs.stat(outputPath);

    const originalSize = originalStats.size;
    const webpSize = webpStats.size;

    const reduction = originalSize > 0 ? (1 - webpSize / originalSize) * 100 : 0;

    console.log(`✓ ${path.relative(process.cwd(), filePath)}`);

    console.log(`  ${formatSize(originalSize)} → ${formatSize(webpSize)}`);

    if (reduction > 0) {
        console.log(`  ↓ ${reduction.toFixed(1)}% menor`);
    } else if (reduction < 0) {
        console.log(`  ↑ ${Math.abs(reduction).toFixed(1)}% maior`);
    } else {
        console.log("  = mesmo tamanho");
    }

    console.log(`  → ${path.relative(process.cwd(), outputPath)}`);

    console.log("");

    return {
        originalSize,
        webpSize,
    };
}

/*
 * =========================================================
 * EXECUÇÃO
 * =========================================================
 */

async function main() {
    console.log("");
    console.log("========================================");
    console.log(" CONVERSÃO DE IMAGENS DAS SEÇÕES");
    console.log("========================================");
    console.log("");

    console.log("Imagens alvo:");

    console.log([...TARGET_NAMES].join(", "));

    console.log("");

    console.log(`Qualidade WebP: ${WEBP_OPTIONS.quality}`);

    console.log("");

    /*
     * Verifica se public existe.
     */

    try {
        await fs.access(PUBLIC_DIR);
    } catch {
        console.error(`✗ A pasta não foi encontrada: ${PUBLIC_DIR}`);

        process.exit(1);
    }

    /*
     * Busca todos os arquivos dentro de public.
     */

    const allFiles = await getFiles(PUBLIC_DIR);

    /*
     * Filtra somente os arquivos que possuem
     * os nomes definidos em TARGET_NAMES.
     */

    const targetFiles = allFiles.filter(isTargetImage);

    if (targetFiles.length === 0) {
        console.log("Nenhuma imagem alvo foi encontrada.");

        console.log("");

        console.log("Nomes procurados:");

        console.log([...TARGET_NAMES].join(", "));

        return;
    }

    console.log(`${targetFiles.length} imagem(ns) encontrada(s).\n`);

    let converted = 0;
    let failed = 0;

    let originalTotal = 0;
    let webpTotal = 0;

    /*
     * Converte as imagens.
     */

    for (const filePath of targetFiles) {
        try {
            const result = await convertImage(filePath);

            originalTotal += result.originalSize;

            webpTotal += result.webpSize;

            converted++;
        } catch (error) {
            failed++;

            console.error(`✗ Erro ao converter: ${path.relative(process.cwd(), filePath)}`);

            console.error(`  ${error.message}`);

            console.log("");
        }
    }

    /*
     * =========================================================
     * RESUMO
     * =========================================================
     */

    const totalReduction = originalTotal > 0 ? (1 - webpTotal / originalTotal) * 100 : 0;

    console.log("========================================");
    console.log(" CONVERSÃO CONCLUÍDA");
    console.log("========================================");

    console.log(`Convertidas: ${converted}`);

    console.log(`Com erro:    ${failed}`);

    console.log("");

    console.log(`Original:    ${formatSize(originalTotal)}`);

    console.log(`WebP:        ${formatSize(webpTotal)}`);

    if (totalReduction > 0) {
        console.log(`Economia:    ${totalReduction.toFixed(1)}%`);
    } else if (totalReduction < 0) {
        console.log(`Aumento:     ${Math.abs(totalReduction).toFixed(1)}%`);
    }

    console.log("");

    console.log("Os arquivos originais foram mantidos.");

    console.log("");
}

/*
 * =========================================================
 * INICIAR
 * =========================================================
 */

main().catch((error) => {
    console.error("");
    console.error("✗ Erro inesperado:");
    console.error(error);

    process.exit(1);
});
