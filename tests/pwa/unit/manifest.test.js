import assert from "node:assert/strict";
import test from "node:test";

import { pwaManifest } from "../../../src/pwa/config/manifest.js";

test("manifest identifica o Hauy Conecta como aplicativo instalável", () => {
    assert.equal(pwaManifest.name, "Hauy Conecta — Central de Ajuda Digital");
    assert.equal(pwaManifest.short_name, "Hauy Conecta");
    assert.equal(pwaManifest.start_url, "/");
    assert.equal(pwaManifest.scope, "/");
    assert.equal(pwaManifest.display, "standalone");
    assert.equal(pwaManifest.lang, "pt-BR");
});

test("manifest declara ícones padrão e maskable nos tamanhos esperados", () => {
    const icons = pwaManifest.icons;

    assert.ok(icons.some((icon) => icon.src === "/icons/icon-192.png" && icon.sizes === "192x192"));
    assert.ok(icons.some((icon) => icon.src === "/icons/icon-512.png" && icon.sizes === "512x512"));
    assert.ok(
        icons.some(
            (icon) =>
                icon.src === "/icons/icon-maskable-512.png" &&
                icon.sizes === "512x512" &&
                icon.purpose === "maskable",
        ),
    );
});
