# Ícones do PWA — Hauy Conecta

Os ícones usados pelo manifesto são artefatos gerados a partir de public/logo.svg.

O script scripts/generate-pwa-icons.mjs usa Sharp, já presente no projeto, e cria:

- icon-192.png: 192 × 192, uso geral.
- icon-512.png: 512 × 512, uso geral.
- icon-maskable-512.png: 512 × 512, com margem segura maior para máscaras do sistema.
- apple-touch-icon.png: 180 × 180, para tela inicial do iOS.

A geração acontece automaticamente nos scripts predev e build, antes de o Vite ler a pasta public. Também pode ser executada isoladamente com npm run pwa:icons.

Os PNGs gerados não são fontes manuais nem precisam ser versionados. O script e o SVG original são as fontes de verdade. Se a identidade visual mudar, revisar cor de fundo, escala, contraste e margem segura e executar novamente a geração.
