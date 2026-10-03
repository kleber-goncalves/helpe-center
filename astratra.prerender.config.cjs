const fs = require("node:fs");
const path = require("node:path");

const routes = JSON.parse(
    fs.readFileSync(
        path.resolve("prerender-routes.json"),
        "utf8",
    ),
);

const INITIAL_PRELOADER_STYLE = `
<style id="initial-preloader-style">
    html[data-hauy-boot="pending"] #root {
        visibility: hidden !important;
    }

    #initial-preloader-shell {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: #ffffff;
    }

    #initial-preloader-shell__content {
        display: flex;
        width: 100%;
        max-width: 320px;
        flex-direction: column;
        align-items: center;
        text-align: center;
        font-family: "Source Sans 3", ui-sans-serif, system-ui, sans-serif;
        color: #26231f;
    }

    #initial-preloader-shell__logo {
        display: block;
        width: 112px;
        height: auto;
    }

    #initial-preloader-shell__title {
        margin: 20px 0 0;
        font-family: "Nunito", ui-sans-serif, system-ui, sans-serif;
        font-size: 24px;
        line-height: 1.15;
        font-weight: 800;
        letter-spacing: -0.01em;
    }

    #initial-preloader-shell__subtitle {
        margin: 4px 0 0;
        font-size: 14px;
        line-height: 1.6;
        color: #6b6861;
    }

    #initial-preloader-shell__bar {
        width: 192px;
        height: 4px;
        margin-top: 32px;
        overflow: hidden;
        border-radius: 999px;
        background: #ded7cc;
    }

    #initial-preloader-shell__bar::after {
        content: "";
        display: block;
        width: 34%;
        height: 100%;
        border-radius: inherit;
        background: #d35400;
        animation: initial-preloader-progress 1.1s ease-in-out infinite;
    }

    @keyframes initial-preloader-progress {
        0% {
            transform: translateX(-140%);
        }
        100% {
            transform: translateX(320%);
        }
    }
</style>
`;

const INITIAL_PRELOADER_MARKUP = `
<div
    id="initial-preloader-shell"
    aria-hidden="true"
>
    <div id="initial-preloader-shell__content">
        <img
            id="initial-preloader-shell__logo"
            src="/logo.svg"
            alt=""
            decoding="async"
            fetchpriority="high"
        />
        <h1 id="initial-preloader-shell__title">Hauy Conecta</h1>
        <p id="initial-preloader-shell__subtitle">Central de Ajuda Digital</p>
        <div id="initial-preloader-shell__bar"></div>
    </div>
</div>
`;

function addBootShell(html) {
    let output = html;

    output = output.replace(
        /<html\\b([^>]*)>/i,
        (match, attributes) => {
            const cleanAttributes = attributes
                .replace(/\\sdata-hauy-boot="[^"]*"/i, "");

            return `<html${cleanAttributes} data-hauy-boot="pending">`;
        },
    );

    if (!output.includes('id="initial-preloader-style"')) {
        output = output.replace(
            /<\\/head>/i,
            `${INITIAL_PRELOADER_STYLE}</head>`,
        );
    }

    if (!output.includes('id="initial-preloader-shell"')) {
        output = output.replace(
            /<body([^>]*)>/i,
            (match) => `${match}${INITIAL_PRELOADER_MARKUP}`,
        );
    }

    output = output.replace(
        / data-hauy-preloader-ready="true"/g,
        "",
    );

    return output;
}

module.exports = {
    distDir: "dist",
    siteUrl: "https://hauy-conecta.vercel.app",
    routes,
    waitFor: 'meta[name="description"]',

    async isReady(page) {
        await page.waitForFunction(
            () =>
                document.documentElement.getAttribute(
                    "data-hauy-preloader-ready",
                ) === "true",
            undefined,
            { timeout: 15000 },
        );
    },

    transformHtml(html) {
        return addBootShell(html);
    },
};
