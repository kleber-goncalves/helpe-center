import assert from "node:assert/strict";
import test from "node:test";

import {
    collectTutorialImageResources,
    collectTutorialVideoResources,
    createTutorialContentVersions,
    estimateTutorialVideoSize,
    isValidCachedTutorialResource,
    readResponseAsBlob,
    formatBytes,
} from "../../../src/pwa/downloads/tutorial-package.js";

test("reúne imagens e pôsteres do tutorial, incluindo variantes responsivas", () => {
    const steps = [
        {
            image: "/tutoriais/excel/intro.webp",
            poster: "/tutoriais/excel/video-poster.webp",
            video: "/tutoriais/excel/video.mp4",
            examples: [
                {
                    image: "/tutoriais/excel/example.webp",
                    poster: "https://cdn.example.com/external-poster.webp",
                    video: "/tutoriais/excel/example.mp4",
                },
            ],
        },
        {
            examples: [
                {
                    image: "/tutoriais/excel/intro.webp",
                },
            ],
        },
    ];

    const imageMetadata = {
        images: {
            "public/tutoriais/excel/intro.webp": {
                responsive: [
                    { src: "/_optimized/intro-320.webp", width: 320 },
                    { src: "/_optimized/intro-640.webp", width: 640 },
                ],
            },
            "public/tutoriais/excel/video-poster.webp": {
                responsive: [
                    { src: "/_optimized/poster-320.webp", width: 320 },
                ],
            },
        },
    };

    const resources = collectTutorialImageResources(steps, imageMetadata);

    assert.deepEqual(resources, [
        "/_optimized/intro-320.webp",
        "/_optimized/intro-640.webp",
        "/_optimized/poster-320.webp",
        "/tutoriais/excel/example.webp",
        "/tutoriais/excel/intro.webp",
        "/tutoriais/excel/video-poster.webp",
    ]);
});

test("reúne vídeos MP4 locais dos passos e exemplos sem duplicar ou incluir URLs externas", () => {
    const steps = [
        {
            video: "/tutoriais/excel/intro.mp4",
            examples: [
                { video: "/tutoriais/excel/example.mp4" },
                { video: "https://youtube.com/watch?v=abc" },
            ],
        },
        {
            video: "/tutoriais/excel/intro.mp4?version=2",
            examples: [
                { video: "//cdn.example.com/video.mp4" },
                { video: "/tutoriais/excel/second.webm" },
            ],
        },
    ];

    assert.deepEqual(collectTutorialVideoResources(steps), [
        "/tutoriais/excel/example.mp4",
        "/tutoriais/excel/intro.mp4",
    ]);
});

test("calcula o tamanho dos vídeos e identifica metadados ausentes", () => {
    const estimate = estimateTutorialVideoSize(
        ["/tutorial/a.mp4", "/tutorial/b.mp4", "/tutorial/c.mp4"],
        {
            "/tutorial/a.mp4": { size: 1024 },
            "/tutorial/b.mp4": { size: 4096 },
        },
    );

    assert.deepEqual(estimate, {
        knownBytes: 5120,
        unknownCount: 1,
    });
    assert.equal(formatBytes(0), "0 B");
    assert.equal(formatBytes(1024), "1 KiB");
    assert.equal(formatBytes(1024 * 1024), "1 MiB");
});

test("ignora caminhos inválidos e retorna listas vazias sem mídias locais", () => {
    const images = collectTutorialImageResources([
        {
            image: "https://example.com/image.webp",
            poster: "//cdn.example.com/poster.webp",
            examples: [{ image: null, poster: "data:image/png;base64,abc" }],
        },
    ]);
    const videos = collectTutorialVideoResources([
        {
            video: "https://example.com/video.mp4",
            examples: [
                { video: "//cdn.example.com/video.mp4" },
                { video: null },
            ],
        },
    ]);

    assert.deepEqual(images, []);
    assert.deepEqual(videos, []);
});


test("gera fingerprints estáveis e detecta mudanças no conteúdo do tutorial", () => {
    const tutorial = {
        id: "tutorial-exemplo",
        title: "Tutorial exemplo",
        description: "Descrição original",
        icon: () => null,
    };
    const steps = [
        {
            title: "Etapa 1",
            description: "Conteúdo original",
            image: "/tutorial/image.webp",
            video: "/tutorial/video.mp4",
        },
    ];
    const imageMetadata = {
        images: {
            "public/tutorial/image.webp": {
                width: 640,
                height: 480,
                size: 1200,
                contentHash: "image-hash-original",
                format: "webp",
                responsive: [{ src: "/_optimized/image-320.webp", width: 320 }],
            },
        },
    };
    const videoMetadata = {
        "/tutorial/video.mp4": { size: 4096, contentHash: "video-hash-original" },
    };

    const first = createTutorialContentVersions({
        tutorial,
        steps,
        imageMetadata,
        videoMetadata,
    });
    const reorderedObjects = createTutorialContentVersions({
        tutorial: {
            description: "Descrição original",
            title: "Tutorial exemplo",
            id: "tutorial-exemplo",
            icon: () => null,
        },
        steps: [{
            video: "/tutorial/video.mp4",
            image: "/tutorial/image.webp",
            description: "Conteúdo original",
            title: "Etapa 1",
        }],
        imageMetadata,
        videoMetadata,
    });

    assert.deepEqual(first, reorderedObjects);

    const changedText = createTutorialContentVersions({
        tutorial,
        steps: [{ ...steps[0], description: "Conteúdo atualizado" }],
        imageMetadata,
        videoMetadata,
    });

    assert.notEqual(changedText.contentVersion, first.contentVersion);
    assert.equal(changedText.videoContentVersion, first.videoContentVersion);

    const changedImage = createTutorialContentVersions({
        tutorial,
        steps,
        imageMetadata: {
            images: {
                "public/tutorial/image.webp": {
                    ...imageMetadata.images["public/tutorial/image.webp"],
                    size: 1300,
                },
            },
        },
        videoMetadata,
    });

    assert.notEqual(changedImage.contentVersion, first.contentVersion);

    const changedImageContent = createTutorialContentVersions({
        tutorial,
        steps,
        imageMetadata: {
            images: {
                "public/tutorial/image.webp": {
                    ...imageMetadata.images["public/tutorial/image.webp"],
                    contentHash: "image-hash-updated",
                },
            },
        },
        videoMetadata,
    });

    assert.notEqual(changedImageContent.contentVersion, first.contentVersion);

    const changedVideo = createTutorialContentVersions({
        tutorial,
        steps,
        imageMetadata,
        videoMetadata: {
            "/tutorial/video.mp4": { size: 5000 },
        },
    });

    assert.equal(changedVideo.contentVersion, first.contentVersion);
    assert.notEqual(changedVideo.videoContentVersion, first.videoContentVersion);

    const changedVideoContent = createTutorialContentVersions({
        tutorial,
        steps,
        imageMetadata,
        videoMetadata: {
            "/tutorial/video.mp4": {
                size: 4096,
                contentHash: "video-hash-updated",
            },
        },
    });

    assert.equal(changedVideoContent.contentVersion, first.contentVersion);
    assert.notEqual(changedVideoContent.videoContentVersion, first.videoContentVersion);

    const removedVideo = createTutorialContentVersions({
        tutorial,
        steps: [{ ...steps[0], video: null }],
        imageMetadata,
        videoMetadata: {},
    });

    assert.equal(removedVideo.contentVersion, first.contentVersion);
    assert.notEqual(removedVideo.videoContentVersion, first.videoContentVersion);
});

test("não considera respostas ausentes, inválidas ou com tamanho incompatível como recursos offline válidos", () => {
    const validImage = new Response("image-bytes", {
        status: 200,
        headers: { "content-type": "image/webp" },
    });

    const wrongImageLength = new Response("image", {
        status: 200,
        headers: {
            "content-type": "image/webp",
            "content-length": "5",
        },
    });
    const compressedImage = new Response("decoded-image-bytes", {
        status: 200,
        headers: {
            "content-type": "image/webp",
            "content-encoding": "br",
            "content-length": "5",
        },
    });

    const validVideo = new Response("video-bytes", {
        status: 200,
        headers: {
            "content-type": "video/mp4",
            "content-length": "10",
        },
    });
    const missingVideoBytes = new Response("video", {
        status: 200,
        headers: {
            "content-type": "video/mp4",
            "content-length": "5",
        },
    });
    const notFound = new Response("not found", {
        status: 404,
        headers: { "content-type": "image/webp" },
    });
    const htmlFallback = new Response("<html></html>", {
        status: 200,
        headers: { "content-type": "text/html" },
    });

    assert.equal(isValidCachedTutorialResource(validImage, { type: "image", size: 11 }), true);
    assert.equal(isValidCachedTutorialResource(wrongImageLength, { type: "image", size: 10 }), false);
    assert.equal(isValidCachedTutorialResource(compressedImage, { type: "image", size: 19 }), true);
    assert.equal(isValidCachedTutorialResource(validVideo, { type: "video", size: 10 }), true);
    assert.equal(isValidCachedTutorialResource(missingVideoBytes, { type: "video", size: 10 }), false);
    assert.equal(isValidCachedTutorialResource(notFound, { type: "image", size: 10 }), false);
    assert.equal(isValidCachedTutorialResource(htmlFallback, { type: "image", size: 10 }), false);
    assert.equal(isValidCachedTutorialResource(null, { type: "image", size: 10 }), false);
    assert.equal(isValidCachedTutorialResource(validImage, { type: "image", size: 0 }), false);
});


test("lê o corpo em blocos, acompanha os bytes e materializa um Blob íntegro", async () => {
    const sourceChunks = [
        Uint8Array.from([9, 1, 2, 9]).subarray(1, 3),
        Uint8Array.from([3, 4, 5]),
    ];
    const progressChunks = [];
    const response = new Response(
        new ReadableStream({
            start(controller) {
                sourceChunks.forEach((chunk) => controller.enqueue(chunk));
                controller.close();
            },
        }),
        {
            status: 200,
            headers: { "content-type": "video/mp4" },
        },
    );

    const { blob, transferredBytes } = await readResponseAsBlob(response, {
        onChunk: (chunkBytes) => progressChunks.push(chunkBytes),
    });

    assert.equal(transferredBytes, 5);
    assert.equal(blob.size, 5);
    assert.equal(blob.type, "video/mp4");
    assert.deepEqual(progressChunks, [2, 3]);
    assert.deepEqual(
        [...new Uint8Array(await blob.arrayBuffer())],
        [1, 2, 3, 4, 5],
    );
});

test("propaga falha de leitura sem declarar o Blob como concluído", async () => {
    const readError = new Error("Falha de rede simulada");
    const response = new Response(
        new ReadableStream({
            start(controller) {
                controller.enqueue(Uint8Array.from([1, 2, 3]));
                controller.error(readError);
            },
        }),
        {
            status: 200,
            headers: { "content-type": "video/mp4" },
        },
    );

    await assert.rejects(
        readResponseAsBlob(response),
        (error) => error === readError,
    );
});

test("interrompe a materialização quando o download já foi cancelado", async () => {
    const controller = new AbortController();
    controller.abort();

    const response = new Response("video-bytes", {
        status: 200,
        headers: { "content-type": "video/mp4" },
    });

    await assert.rejects(
        readResponseAsBlob(response, { signal: controller.signal }),
        { name: "AbortError" },
    );
});
