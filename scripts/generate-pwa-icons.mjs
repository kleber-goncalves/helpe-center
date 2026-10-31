import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "public/logo.svg");
const OUTPUT = path.join(ROOT, "public/icons");

const BRAND_BACKGROUND = "#B4532D";

const iconDefinitions = [
    { filename: "icon-192.png", size: 192, scale: 0.78 },
    { filename: "icon-512.png", size: 512, scale: 0.78 },
    { filename: "icon-maskable-512.png", size: 512, scale: 0.66 },
    { filename: "apple-touch-icon.png", size: 180, scale: 0.78 },
];

async function generateIcon({ filename, size, scale }) {
    const logoSize = Math.round(size * scale);

    const logo = await sharp(SOURCE)
        .resize(logoSize, logoSize, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer();

    await sharp({
        create: {
            width: size,
            height: size,
            channels: 4,
            background: BRAND_BACKGROUND,
        },
    })
        .composite([{ input: logo, gravity: "centre" }])
        .png({
            compressionLevel: 9,
            palette: true,
            colours: 128,
            effort: 10,
        })
        .toFile(path.join(OUTPUT, filename));
}

async function main() {
    await fs.access(SOURCE);
    await fs.mkdir(OUTPUT, { recursive: true });

    for (const definition of iconDefinitions) {
        await generateIcon(definition);
        console.log(
            "✓ " +
            definition.filename +
            " gerado (" +
            definition.size +
            "x" +
            definition.size +
            ").",
        );
    }
}

main().catch((error) => {
    console.error("✗ Não foi possível gerar os ícones do PWA.");
    console.error(error);
    process.exitCode = 1;
});
