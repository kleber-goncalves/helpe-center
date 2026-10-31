import assert from "node:assert/strict";
import test from "node:test";

import {
    collectTutorialImageResources,
    collectTutorialVideoResources,
    estimateTutorialVideoSize,
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
