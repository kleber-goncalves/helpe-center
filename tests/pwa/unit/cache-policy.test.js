import assert from "node:assert/strict";
import test from "node:test";

import {
    APP_SHELL_CACHE_VERSION,
    MAX_PRECACHE_FILE_SIZE_BYTES,
    PRECACHE_GLOB_IGNORES,
    PRECACHE_GLOB_PATTERNS,
} from "../../../src/pwa/config/cache-policy.js";

test("política inicial limita o tamanho e possui versão explícita", () => {
    assert.equal(APP_SHELL_CACHE_VERSION, "v1");
    assert.equal(MAX_PRECACHE_FILE_SIZE_BYTES, 2 * 1024 * 1024);
});

test("precache inclui código e HTML, mas não a biblioteca de mídia", () => {
    assert.ok(PRECACHE_GLOB_PATTERNS.some((pattern) => pattern.includes("js")));
    assert.ok(PRECACHE_GLOB_PATTERNS.some((pattern) => pattern.includes("html")));
    assert.ok(PRECACHE_GLOB_PATTERNS.includes("icons/*.png"));

    assert.ok(PRECACHE_GLOB_IGNORES.includes("**/tutoriais/**"));
    assert.ok(PRECACHE_GLOB_IGNORES.includes("**/*.mp4"));

    assert.equal(
        PRECACHE_GLOB_PATTERNS.some((pattern) => pattern.includes("webp")),
        false,
    );
});
