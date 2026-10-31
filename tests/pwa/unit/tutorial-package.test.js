import assert from "node:assert/strict";
import test from "node:test";

import {
    collectTutorialImageResources,
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

    assert.equal(resources.some((resource) => resource.endsWith(".mp4")), false);
    assert.equal(resources.some((resource) => resource.includes("cdn.example.com")), false);
});

test("ignora caminhos inválidos e retorna lista vazia quando o tutorial não possui imagens", () => {
    const resources = collectTutorialImageResources([
        {
            image: "https://example.com/image.webp",
            poster: "//cdn.example.com/poster.webp",
            examples: [{ image: null, poster: "data:image/png;base64,abc" }],
        },
    ]);

    assert.deepEqual(resources, []);
});
