import assert from "node:assert/strict";
import test from "node:test";

import {
    cleanupOldAppShellCaches,
} from "../../../src/pwa/service-worker/cache-cleanup.js";

test("remove caches antigos do app shell sem apagar pacotes offline ou cache runtime", async () => {
    const existingCaches = [
        "hauy-conecta-app-shell-v1",
        "hauy-conecta-app-shell-v2",
        "hauy-conecta-tutorial-package-v1-comecar-usar-excel-abc123",
        "hauy-conecta-runtime-images-v1",
    ];
    const deletedCaches = [];
    const cacheStorage = {
        async keys() {
            return existingCaches;
        },
        async delete(cacheName) {
            deletedCaches.push(cacheName);
            return true;
        },
    };

    const deleted = await cleanupOldAppShellCaches(
        cacheStorage,
        "hauy-conecta-app-shell-v2",
    );

    assert.deepEqual(deleted, ["hauy-conecta-app-shell-v1"]);
    assert.deepEqual(deletedCaches, ["hauy-conecta-app-shell-v1"]);
    assert.ok(existingCaches.includes(
        "hauy-conecta-tutorial-package-v1-comecar-usar-excel-abc123",
    ));
    assert.ok(existingCaches.includes("hauy-conecta-runtime-images-v1"));
});

test("falha ao excluir cache antigo não impede a ativação da nova versão", async () => {
    const cacheStorage = {
        async keys() {
            return [
                "hauy-conecta-app-shell-v1",
                "hauy-conecta-app-shell-v2",
            ];
        },
        async delete() {
            throw new Error("Falha simulada ao excluir cache antigo.");
        },
    };

    const deleted = await cleanupOldAppShellCaches(
        cacheStorage,
        "hauy-conecta-app-shell-v2",
    );

    assert.deepEqual(deleted, []);
});
