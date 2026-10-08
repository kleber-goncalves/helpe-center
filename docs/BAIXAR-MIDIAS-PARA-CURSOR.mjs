#!/usr/bin/env node

/**
 * Baixa as imagens, vídeos e posters usados pelos tutoriais do Hauy Conecta.
 *
 * Uso:
 *   node BAIXAR-MIDIAS-PARA-CURSOR.mjs
 *
 * O script:
 * 1. baixa TUTORIAIS_E_CATEGORIAS.json;
 * 2. encontra todas as referências de imagem/vídeo/poster;
 * 3. baixa os arquivos a partir do repositório do Hauy Conecta;
 * 4. recria a estrutura em public/tutoriais.
 */

import fs from "node:fs/promises";
import path from "node:path";

const REPOSITORY = "kleber-goncalves/helpe-center";
const BRANCH = "feat/ferramentas";
const JSON_URL = `https://raw.githubusercontent.com/${REPOSITORY}/${BRANCH}/docs/TUTORIAIS_E_CATEGORIAS.json`;
const OUTPUT_ROOT = path.resolve("public");

const mediaFields = new Set(["image", "video", "poster"]);

async function ensureDir(filePath) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
}

function collectMedia(tutorials) {
    const media = new Map();

    for (const tutorial of tutorials) {
        for (const step of tutorial.steps ?? []) {
            for (const example of step.examples ?? []) {
                for (const field of mediaFields) {
                    const filePath = example[field];

                    if (filePath) {
                        media.set(filePath, {
                            path: filePath,
                            type: field,
                        });
                    }
                }
            }

            for (const field of ["video", "poster"]) {
                const filePath = step[field];

                if (filePath) {
                    media.set(filePath, {
                        path: filePath,
                        type: field,
                    });
                }
            }
        }
    }

    return [...media.values()];
}

function buildRawUrl(filePath) {
    return `https://raw.githubusercontent.com/${REPOSITORY}/${BRANCH}${filePath}`;
}

async function downloadFile(filePath) {
    const url = buildRawUrl(filePath);
    const destination = path.join(OUTPUT_ROOT, filePath.replace(/^\//, ""));

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status} ao baixar ${url}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    await ensureDir(destination);
    await fs.writeFile(destination, buffer);

    return {
        filePath,
        bytes: buffer.length,
        destination,
    };
}

async function main() {
    console.log("Baixando referência dos tutoriais...");

    const jsonResponse = await fetch(JSON_URL);

    if (!jsonResponse.ok) {
        throw new Error(`Não foi possível baixar o JSON: HTTP ${jsonResponse.status}`);
    }

    const data = await jsonResponse.json();
    const media = collectMedia(data.tutorials ?? []);

    console.log(`Mídias encontradas: ${media.length}`);

    let success = 0;

    for (const item of media) {
        try {
            const result = await downloadFile(item.path);

            success += 1;
            console.log(`[OK] ${result.filePath} (${result.bytes} bytes)`);
        } catch (error) {
            console.error(`[ERRO] ${item.path}`);
            console.error(error instanceof Error ? error.message : error);
        }
    }

    console.log("");
    console.log(`Concluído: ${success}/${media.length} arquivos baixados.`);

    if (success !== media.length) {
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
