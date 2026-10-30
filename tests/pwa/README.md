# Testes do PWA — Hauy Conecta

Os testes específicos do PWA ficam fora de `src/`, separados por nível. A implementação e as decisões estão documentadas em `docs/arquitetura-pwa-hauy-conecta.md`.

## Estrutura

```text
tests/pwa/
├── unit/         # Regras puras e transições de estado
├── integration/  # Service Worker, Cache Storage e IndexedDB
├── e2e/          # Instalação, atualização, navegação e downloads offline
└── fixtures/     # Dados sintéticos e arquivos pequenos de teste
```

## Ferramentas e critérios

- **Unitários:** usar `node:test` e `node:assert` do Node 24 para regras puras. Não adicionar Vitest/Jest apenas para criar a estrutura.
- **Integração:** usar Playwright em Chromium com Service Workers habilitados e APIs reais do navegador sempre que possível.
- **E2E:** validar build servido em HTTP local, registro do Service Worker, rotas diretas, estado offline, atualização e ciclo de vida dos pacotes.
- **Fixtures:** usar imagens pequenas e sintéticas. Nunca depender dos vídeos reais do portal (aproximadamente 298 MiB) para executar o conjunto de testes.
- **Isolamento:** cada teste deve limpar somente os caches e bancos de teste que criou; não assumir nomes de cache de produção nos testes.
- **Determinismo:** evitar depender de internet externa, APIs reais, YouTube ou Gemini.
- **Acessibilidade:** validar nomes acessíveis, foco por teclado e mensagens de progresso nos fluxos de interface.

## Integração com scripts e CI

Quando o primeiro teste for criado, adicionar um script próprio `npm run test:pwa` e incluí-lo no workflow `Validate Hauy Conecta`. Manter `npm run test:search` independente. Não renomear `src/test/`: essa pasta atual contém componentes de experimentação do portal, não a suíte automatizada do PWA.

Nenhum teste PWA foi criado ainda; este arquivo registra a convenção que deverá ser seguida nas próximas fases.