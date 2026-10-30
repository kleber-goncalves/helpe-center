import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

import { pwaManifest } from "./src/pwa/config/manifest.js";
import {
    MAX_PRECACHE_FILE_SIZE_BYTES,
    PRECACHE_GLOB_IGNORES,
    PRECACHE_GLOB_PATTERNS,
} from "./src/pwa/config/cache-policy.js";

export default defineConfig({
    server: {
        host: "0.0.0.0", // não usa loopback
        port: 5173, // porta ALTA (fora de políticas)
        strictPort: true,
        hmr: {
            port: 5173,
            protocol: "ws",
        },
    },
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            strategies: "injectManifest",
            srcDir: "src/pwa/service-worker",
            filename: "sw.js",
            injectRegister: false,
            registerType: "prompt",
            manifest: pwaManifest,
            includeAssets: ["favicon.ico", "icons/apple-touch-icon.png"],
            injectManifest: {
                globPatterns: PRECACHE_GLOB_PATTERNS,
                globIgnores: PRECACHE_GLOB_IGNORES,
                maximumFileSizeToCacheInBytes: MAX_PRECACHE_FILE_SIZE_BYTES,
            },
            devOptions: {
                enabled: false,
            },
        }),
    ],
});
