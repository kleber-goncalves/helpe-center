import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = path.join(ROOT, "src", "generated");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "imageMetadata.json");
const PUBLIC_DIR = path.join(ROOT, "public");
const RESPONSIVE_OUTPUT_DIR = path.join(PUBLIC_DIR, "_optimized");
const RESPONSIVE_WIDTHS = [320, 480, 640, 768, 1024, 1440, 1920];

const IMAGE_EXTENSIONS = new Set([
    ".avif",
    ".gif",
    ".jpeg",
    ".jpg",
    ".png",
    ".svg",
    ".webp",
]);

async function walk(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const absolutePath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            if (absolutePath === RESPONSIVE_OUTPUT_DIR) {
                continue;
            }

            files.push(...(await walk(absolutePath)));
            continue;
        }

        if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
            files.push(absolutePath);
        }
    }

    return files;
}

function toPosix(value) {
    return value.split(path.sep).join("/");
}

function getMetadataKey(filePath) {
    const relative = toPosix(path.relative(ROOT, filePath));
    return relative;
}

function getPublicUrl(filePath) {
    const relative = toPosix(path.relative(path.join(ROOT, "public"), filePath));
    return relative ? `/${relative}` : null;
}

function parseSvgLength(value) {
    if (!value) {
        return null;
    }

    const normalized = value.trim();

    if (!normalized || normalized.endsWith("%")) {
        return null;
    }

    const numeric = Number.parseFloat(normalized);

    return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

async function readSvgDimensions(filePath) {
    const content = await fs.readFile(filePath, "utf8");
    const openingTag = content.match(/<svg[^>]*>/i)?.[0] ?? "";

    const width = parseSvgLength(
        openingTag.match(/width=["']([^"']+)["']/i)?.[1],
    );
    const height = parseSvgLength(
        openingTag.match(/height=["']([^"']+)["']/i)?.[1],
    );

    if (width && height) {
        return { width, height };
    }

    const viewBoxValue = openingTag.match(
        /viewBox=["']([^"']+)["']/i,
    )?.[1];

    const viewBox = viewBoxValue
        ?.trim()
        .split(/\s+/)
        .map(Number);

    if (!viewBox || viewBox.length !== 4) {
        throw new Error(
            `Não foi possível obter dimensões SVG: ${getMetadataKey(filePath)}`,
        );
    }

    const viewBoxWidth = viewBox[2];
    const viewBoxHeight = viewBox[3];

    if (!(viewBoxWidth > 0) || !(viewBoxHeight > 0)) {
        throw new Error(
            `ViewBox SVG inválido: ${getMetadataKey(filePath)}`,
        );
    }

    return {
        width: viewBoxWidth,
        height: viewBoxHeight,
    };
}

function getResponsiveFileName(metadataKey, width) {
    const hash = createHash("sha1")
        .update(metadataKey)
        .digest("hex")
        .slice(0, 12);

    return hash + "-" + width + ".webp";
}

function getResponsiveUrl(metadataKey, width) {
    return "/_optimized/" + getResponsiveFileName(metadataKey, width);
}

async function generateResponsiveVariants(filePath, metadataKey, width) {
    const extension = path.extname(filePath).toLowerCase();

    if (extension === ".svg" || extension === ".gif") {
        return [];
    }

    const responsiveWidths = RESPONSIVE_WIDTHS.filter(
        (responsiveWidth) => responsiveWidth < width,
    );

    const variants = [];

    for (const responsiveWidth of responsiveWidths) {
        const fileName = getResponsiveFileName(metadataKey, responsiveWidth);
        const outputPath = path.join(RESPONSIVE_OUTPUT_DIR, fileName);

        await sharp(filePath)
            .resize({
                width: responsiveWidth,
                withoutEnlargement: true,
                fit: "inside",
            })
            .webp({
                quality: 88,
                effort: 4,
            })
            .toFile(outputPath);

        variants.push({
            width: responsiveWidth,
            src: getResponsiveUrl(metadataKey, responsiveWidth),
        });
    }

    return variants;
}

async function readImageMetadata(filePath) {
    const extension = path.extname(filePath).toLowerCase();

    const dimensions =
        extension === ".svg"
            ? await readSvgDimensions(filePath)
            : await sharp(filePath).metadata();

    if (!dimensions.width || !dimensions.height) {
        throw new Error(`Não foi possível obter dimensões: ${getMetadataKey(filePath)}`);
    }

    return {
        width: dimensions.width,
        height: dimensions.height,
        format: extension === ".svg"
            ? "svg"
            : dimensions.format ?? extension.slice(1),
        aspectRatio: Number(
            (dimensions.width / dimensions.height).toFixed(6),
        ),
    };
}

async function main() {
    const sourceDirectories = [
        path.join(ROOT, "src", "assets"),
        path.join(ROOT, "public"),
    ];

    const imageFiles = [];

    for (const directory of sourceDirectories) {
        try {
            imageFiles.push(...(await walk(directory)));
        } catch (error) {
            if (error?.code === "ENOENT") {
                continue;
            }

            throw error;
        }
    }

    const uniqueFiles = [...new Set(imageFiles)].sort((a, b) =>
        getMetadataKey(a).localeCompare(getMetadataKey(b)),
    );

    const entries = {};

    for (const filePath of uniqueFiles) {
        const key = getMetadataKey(filePath);
        const metadata = await readImageMetadata(filePath);

        const responsive = await generateResponsiveVariants(
            filePath,
            key,
            metadata.width,
        );

        entries[key] = {
            ...metadata,
            responsive,
            publicUrl: filePath.startsWith(path.join(ROOT, "public"))
                ? getPublicUrl(filePath)
                : null,
        };
    }

    await fs.rm(RESPONSIVE_OUTPUT_DIR, { recursive: true, force: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.mkdir(RESPONSIVE_OUTPUT_DIR, { recursive: true });

    await fs.writeFile(
        OUTPUT_FILE,
        `${JSON.stringify(
            {
                version: 1,
                images: entries,
            },
            null,
            4,
        )}\n`,
        "utf8",
    );

    console.log(
        `[image-metadata] ${Object.keys(entries).length} imagens catalogadas.`,
    );
    console.log(`[image-metadata] Saída: ${path.relative(ROOT, OUTPUT_FILE)}`);
}

main().catch((error) => {
    console.error("[image-metadata] Falha ao gerar metadata.");
    console.error(error);
    process.exitCode = 1;
});
