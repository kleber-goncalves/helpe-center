# Módulo PWA — Hauy Conecta

> **Estado:** módulo integrado à `main` e publicado na produção em 2026-11-01. Este README descreve a implementação existente; a arquitetura e o histórico das decisões estão em [docs/arquitetura-pwa-hauy-conecta.md](../../docs/arquitetura-pwa-hauy-conecta.md).

## Responsabilidades dos arquivos

- `config/manifest.js`: nome, idioma, escopo, modo standalone, cores e referências aos ícones.
- `config/cache-policy.js`: versão do app shell, lista de recursos essenciais, padrões de precache e limites dos caches.
- `client/register-service-worker.js`: registro do Service Worker e comunicação de estado/atualização com a aplicação.
- `service-worker/sw.js`: lógica Workbox, precache, rotas offline, cache runtime de imagens e atendimento de requisições Range para MP4 salvos.
- `service-worker/cache-cleanup.js`: limpeza de caches antigos do app shell sem remover pacotes de tutoriais ou imagens runtime.
- `downloads/tutorial-package.js`: coleta, download, validação, atualização, reparo, cancelamento e remoção de pacotes.
- `ui/components/TutorialOfflineButton.jsx`: interface do fluxo de salvar/atualizar/remover um tutorial.
- `ui/hooks/usePwaStatus.js`: estado de conectividade e eventos do PWA.
- `ui/components/PwaStatusBanner.jsx`: avisos gerais do PWA.

## Estratégia de armazenamento

A arquitetura utiliza três áreas independentes:

1. **App shell / precache Workbox:** código e recursos essenciais para abrir a aplicação e navegar quando a rede não está disponível.
2. **Cache runtime de imagens:** imagens da mesma origem são armazenadas conforme solicitadas, com limite de 1.000 entradas. Não existe download antecipado de toda a biblioteca.
3. **Pacotes opt-in de tutoriais:** cada tutorial possui cache próprio no Cache Storage; IndexedDB (`hauy-conecta-offline`, object store `tutorial-packages`) mantém metadados e a lista de recursos esperados.

A atualização do app shell limpa somente caches antigos do próprio shell. Não deve apagar caches dos pacotes nem o cache runtime de imagens.

## O que entra em um pacote

- Conteúdo textual e dados do tutorial, disponíveis pelo bundle da aplicação.
- Imagens locais das etapas e exemplos.
- Pôsteres locais associados a vídeos.
- Variantes responsivas produzidas pela geração de metadados.
- Vídeos MP4 locais somente quando a pessoa marca explicitamente a opção de incluí-los.

Vídeos são opcionais e desmarcados por padrão. Imagens são baixadas com até dois workers simultâneos; vídeos são processados sequencialmente, um por vez. O corpo de cada vídeo é lido por `ReadableStreamDefaultReader`, materializado em Blob e gravado no Cache Storage por uma nova Response. Essa estratégia corrige a falha observada ao armazenar diretamente grandes respostas em fluxo no ambiente Chromium testado e reduz o pico de memória.

O download possui progresso e cancelamento. Um pacote só é marcado como salvo depois que os recursos selecionados foram persistidos e validados. Atualizações usam cache temporário; o pacote anterior é preservado até que a nova versão esteja íntegra. Falhas e cancelamentos não devem deixar o tutorial marcado falsamente como disponível.

## Reprodução e navegação offline

O Service Worker reconhece solicitações locais de MP4 armazenados em pacotes. Para requisições Range, responde com HTTP 206 e cabeçalhos de faixa, permitindo carregar metadados e avançar/retroceder no vídeo sem rede.

URLs externas, incluindo YouTube, serviços de IA, Apps Script e provedores das ferramentas, continuam dependentes de internet. O PWA não transforma integrações externas em serviços offline.

Os pacotes ficam no navegador e na origem onde foram baixados; não são sincronizados automaticamente entre dispositivos.

## Build e publicação

O build é configurado em `vite.config.js` com `vite-plugin-pwa`, estratégia `injectManifest`, Workbox e registro manual. O manifesto vem de `src/pwa/config/manifest.js`.

O workflow `.github/workflows/prerender.yml` observa pushes em `main`, `dev` e `feat/pwa`. Executa `npm run build` e versiona `dist/` e `public/sitemap.xml`. A branch de diagnóstico `fix/pwa-video-cache-blob` e a instrumentação temporária foram encerradas após a integração da PR #17; não fazem parte do fluxo atual.

A Vercel publica o diretório `dist/` versionado, sem executar novamente Vite ou Astratra. Não edite `dist/` manualmente: modifique os arquivos-fonte e deixe o workflow gerar o artefato.

A release de produção de 2026-11-01 foi integrada pela PR #19. Os workflows Validate #249, Build prerender #103 e AI Context #191 passaram; o deployment final da Vercel está READY. Consulte o histórico de release na arquitetura principal.

## Testes

- `npm run test:pwa:unit`: testes unitários de manifesto, política de cache, coleta de mídia, fingerprints, integridade e limpeza.
- `npm run test:pwa:e2e`: testes de navegador com Playwright/Chromium, Service Worker e Vite Preview.
- `npm run test:pwa`: executa unitários e E2E.
- O workflow Validate executa testes PWA, ESLint, build/prerender/auditoria e demais testes do projeto.

Consulte [tests/pwa/README.md](../../tests/pwa/README.md) para cobertura e aceite manual.

## Limites e roadmap

O módulo atual não oferece um gerenciador central de todos os tutoriais salvos nem uma tela de monitoramento da quota total do navegador. Essas são propostas futuras, registradas na seção 28 da arquitetura. Não duplicar a lógica de Cache Storage/IndexedDB em componentes futuros; reutilizar as funções exportadas pelo módulo.

O armazenamento do navegador pode ser limitado ou removido pelo próprio navegador/sistema. Tratar falhas de quota e indisponibilidade como condições possíveis, mesmo quando uma estimativa de espaço parecer suficiente.
