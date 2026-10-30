import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";

import { initializeAccessibility } from "./lib/accessibility";

initializeAccessibility();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);

/*
 * Em produção, o HTML pré-renderizado recebe um
 * "boot shell" estático pelo Astratra para impedir
 * que o conteúdo apareça antes do React montar.
 *
 * Assim que o Preloader React existir, removemos
 * somente esse shell inicial e liberamos o conteúdo.
 */
function releaseInitialBootShell() {
    let attempts = 0;

    function check() {
        const preloader = document.getElementById("site-preloader");

        if (preloader) {
            document.documentElement.removeAttribute("data-hauy-boot");
            document.getElementById("initial-preloader-shell")?.remove();
            document.getElementById("initial-preloader-style")?.remove();
            return;
        }

        attempts += 1;

        if (attempts < 120) {
            requestAnimationFrame(check);
            return;
        }

        /*
         * Fallback de segurança:
         * nunca deixa a aplicação permanentemente bloqueada.
         */
        document.documentElement.removeAttribute("data-hauy-boot");
        document.getElementById("initial-preloader-shell")?.remove();
        document.getElementById("initial-preloader-style")?.remove();
    }

    requestAnimationFrame(check);
}

releaseInitialBootShell();
