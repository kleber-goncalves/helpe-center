import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/*
 * =========================================================
 * CONFIGURAÇÃO
 * =========================================================
 */

const INPUT_DIR = path.resolve("public/tutoriais");

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

const WEBP_OPTIONS = {
    quality: 85,
    effort: 6,
};

/*
 * =========================================================
 * BUSCAR IMAGENS
 * =========================================================
 */

async function getImageFiles(directory) {
    const entries = await fs.readdir(directory, {
        withFileTypes: true,
    });

    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            const nestedFiles = await getImageFiles(fullPath);

            files.push(...nestedFiles);

            continue;
        }

        const extension = path.extname(entry.name).toLowerCase();

        if (IMAGE_EXTENSIONS.has(extension)) {
            files.push(fullPath);
        }
    }

    return files;
}

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
 * CONVERTER UMA IMAGEM
 * =========================================================
 */

async function convertImage(filePath) {
    const extension = path.extname(filePath);

    const outputPath = filePath.slice(0, -extension.length) + ".webp";

    /*
     * Se o WebP já existir, substituímos para garantir
     * que ele esteja atualizado com a configuração atual.
     */

    await sharp(filePath).webp(WEBP_OPTIONS).toFile(outputPath);

    const originalStats = await fs.stat(filePath);
    const webpStats = await fs.stat(outputPath);

    const originalSize = originalStats.size;
    const webpSize = webpStats.size;

    const reduction = originalSize > 0 ? (1 - webpSize / originalSize) * 100 : 0;

    const relativePath = path.relative(process.cwd(), filePath);

    const relativeOutputPath = path.relative(process.cwd(), outputPath);

    console.log(`✓ ${relativePath}`);

    console.log(`  ${formatSize(originalSize)} → ${formatSize(webpSize)}`);

    if (reduction > 0) {
        console.log(`  ↓ ${reduction.toFixed(1)}% menor`);
    } else if (reduction < 0) {
        console.log(`  ↑ ${Math.abs(reduction).toFixed(1)}% maior`);
    } else {
        console.log("  = mesmo tamanho");
    }

    console.log(`  → ${relativeOutputPath}`);

    console.log("");
}

/*
 * =========================================================
 * EXECUÇÃO
 * =========================================================
 */

async function main() {
    console.log("");
    console.log("========================================");
    console.log(" CONVERSÃO DE IMAGENS DOS TUTORIAIS");
    console.log("========================================");
    console.log("");

    console.log(`Pasta: ${INPUT_DIR}`);
    console.log(`Qualidade WebP: ${WEBP_OPTIONS.quality}`);
    console.log("");

    /*
     * Verifica se a pasta existe.
     */

    try {
        await fs.access(INPUT_DIR);
    } catch {
        console.error("✗ A pasta dos tutoriais não foi encontrada.");

        console.error(`  Esperado: ${INPUT_DIR}`);

        process.exit(1);
    }

    /*
     * Busca todas as imagens.
     */

    const files = await getImageFiles(INPUT_DIR);

    if (files.length === 0) {
        console.log("Nenhuma imagem PNG, JPG ou JPEG foi encontrada.");

        return;
    }

    console.log(`${files.length} imagem(ns) encontrada(s).\n`);

    let converted = 0;
    let failed = 0;

    let originalTotal = 0;
    let webpTotal = 0;

    /*
     * Converte uma por uma.
     */

    for (const filePath of files) {
        try {
            const extension = path.extname(filePath);

            const outputPath = filePath.slice(0, -extension.length) + ".webp";

            /*
             * Guarda o tamanho antes da conversão.
             */

            const originalStats = await fs.stat(filePath);

            /*
             * Converte.
             */

            await sharp(filePath).webp(WEBP_OPTIONS).toFile(outputPath);

            /*
             * Guarda o tamanho final.
             */

            const webpStats = await fs.stat(outputPath);

            originalTotal += originalStats.size;
            webpTotal += webpStats.size;

            /*
             * Mostra informações da conversão.
             */

            const reduction = originalStats.size > 0 ? (1 - webpStats.size / originalStats.size) * 100 : 0;

            console.log(`✓ ${path.relative(process.cwd(), filePath)}`);

            console.log(`  ${formatSize(originalStats.size)} → ${formatSize(webpStats.size)}`);

            if (reduction > 0) {
                console.log(`  ↓ ${reduction.toFixed(1)}% menor`);
            } else if (reduction < 0) {
                console.log(`  ↑ ${Math.abs(reduction).toFixed(1)}% maior`);
            } else {
                console.log("  = mesmo tamanho");
            }

            console.log("");

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
    console.log("Os arquivos originais NÃO foram apagados.");
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
