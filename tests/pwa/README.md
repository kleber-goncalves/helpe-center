# Testes do PWA — Hauy Conecta

Os testes específicos do PWA ficam fora de src/, separados por nível. A implementação e as decisões estão documentadas em docs/arquitetura-pwa-hauy-conecta.md.

## Estrutura

- unit/: regras puras, manifesto e políticas de cache.
- integration/: interação real entre Service Worker, Cache Storage e IndexedDB.
- e2e/: registro/atualização, navegação offline e ciclo de vida dos downloads.
- fixtures/: dados sintéticos e pequenos arquivos de teste.

## Ferramentas e comandos

- Unitários: Node test runner (node:test) e node:assert, sem instalar Vitest/Jest para regras puras.
- Navegador: Playwright com Chromium e Service Workers habilitados.
- npm run test:pwa: executa unitários e E2E.
- npm run test:pwa:unit: executa os testes sem navegador.
- npm run test:pwa:e2e: valida o build servido por Vite Preview em HTTP local.

## Testes já criados

- Manifesto: identidade, idioma, escopo, modo standalone e ícones.
- Política de cache: versão, limite por arquivo, tipos incluídos e exclusão de tutorial/MP4.
- E2E: registro/controle do Service Worker e navegação direta para uma rota de tutorial quando a rede é desligada.

## Critérios

- Fixtures pequenas e sintéticas; nunca depender dos vídeos reais do portal (aproximadamente 298 MiB).
- Isolamento: cada teste deve limpar somente os caches e bancos de teste que criou.
- Determinismo: evitar depender de internet externa, YouTube, Gemini ou APIs reais.
- Acessibilidade: validar nomes acessíveis, foco por teclado e mensagens de progresso nos fluxos de interface.
- O workflow Validate Hauy Conecta executa os testes unitários PWA antes do lint e os testes de navegador depois do build/prerender.

A execução E2E ainda precisa ser confirmada no runner Ubuntu do GitHub Actions; o Chromium encerrou dentro do sandbox remoto Vercel durante a pré-renderização.
