# Ícones do PWA — Hauy Conecta

> **Revisão:** 2026-11-01. Este documento descreve a geração usada pela PWA integrada à `main`.

Os ícones do manifesto são artefatos gerados a partir de `public/logo.svg`. A fonte de verdade é o SVG original junto do script `scripts/generate-pwa-icons.mjs`.

O script utiliza Sharp e gera em `public/icons/`:

- `icon-192.png`: 192 × 192, uso geral.
- `icon-512.png`: 512 × 512, uso geral.
- `icon-maskable-512.png`: 512 × 512, com margem segura maior para máscaras do sistema.
- `apple-touch-icon.png`: 180 × 180, para a tela inicial em dispositivos Apple.

A geração ocorre automaticamente antes do Vite nos scripts `predev` e `build`; também pode ser executada isoladamente com `npm run pwa:icons`.

Os PNGs em `public/icons/*.png` são ignorados pelo Git e regenerados a partir do SVG. Isso não significa que os ícones estejam ausentes do site publicado: o build os copia para `dist/icons/`, e o diretório `dist/` é versionado como artefato de publicação. Não edite manualmente esses PNGs nem os arquivos correspondentes em `dist/`.

Se a identidade visual mudar, revise fundo, escala, contraste, área segura e compatibilidade com o manifesto em `src/pwa/config/manifest.js`. Depois execute a geração e valide instalação/ícones nos navegadores e dispositivos alvo.
