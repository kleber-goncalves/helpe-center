import fs from "node:fs";

const architecturePath = "docs/arquitetura-pwa-hauy-conecta.md";
let architecture = fs.readFileSync(architecturePath, "utf8");

architecture = architecture.replace(
    /> \*\*Status:\*\* auditoria da Fase 0 registrada; implementação do PWA ainda não iniciada\./,
    "> **Status:** Fase 1 parcialmente implementada na branch feat/pwa; validação do build completo com Astratra e E2E no GitHub Actions pendentes.",
);

const phase1Start = architecture.indexOf(
    "### Fase 1 --- PWA instalável e offline básico",
);
const phase2Start = architecture.indexOf(
    "### Fase 2 --- Imagens runtime e downloads de tutoriais",
);

if (phase1Start === -1 || phase2Start === -1 || phase2Start <= phase1Start) {
    throw new Error("Não foi possível localizar os limites da Fase 1.");
}

const phase1 = [
    "### Fase 1 --- PWA instalável e offline básico",
    "",
    "-   [x] Integrar vite-plugin-pwa 2.0.0 com estratégia injectManifest.",
    "-   [x] Criar manifesto e script de geração de ícones.",
    "-   [x] Criar e registrar o Service Worker customizado.",
    "-   [x] Definir precache inicial para arquivos JS/CSS/HTML/ICO/manifesto e ícones.",
    "-   [x] Excluir caminhos de tutoriais e vídeos do precache.",
    "-   [x] Criar fallback offline e navegação network-first com fallback para app shell.",
    "-   [x] Implementar indicador online/offline, aviso de preparação offline e atualização com confirmação.",
    "-   [x] Criar testes unitários do manifesto e da política de cache.",
    "-   [x] Criar testes E2E de registro do Service Worker e navegação offline.",
    "-   [x] Integrar testes PWA unitários e E2E ao workflow de validação.",
    "-   [ ] Validar build completo com Astratra no runner Ubuntu do GitHub Actions.",
    "-   [ ] Confirmar no preview da Vercel instalação e navegação offline em navegador real.",
    "",
    "**Implementação atual:** o app shell inclui JavaScript, CSS, HTML, favicon, manifesto e ícones. O Service Worker tenta a rede primeiro para as navegações; quando a rede falha, usa o app shell precacheado para o React Router resolver a rota localmente. A página offline estática é a última alternativa.",
    "",
    "**Limite desta entrega:** não existe cache runtime de imagens, download de tutoriais, IndexedDB de pacotes ou vídeo offline nesta fase.",
    "",
    "**Saída esperada:** instalação e navegação básica offline confirmadas pelo CI e por teste manual no preview.",
].join("\n");

architecture =
    architecture.slice(0, phase1Start) +
    phase1 +
    "\n\n" +
    architecture.slice(phase2Start);

architecture = architecture.replace(
    /Este documento descreve uma arquitetura proposta\. Não confirma que[\s\S]*?auditoria técnica da Fase 0\./,
    "Este documento registra a arquitetura e o andamento da implementação. A Fase 1 está parcialmente implementada na branch feat/pwa; não declarar o PWA pronto para produção até concluir a validação E2E no GitHub Actions e o teste manual no preview da Vercel.\n\n**Estado:** Fase 0 auditada parcialmente; Fase 1 em implementação.\\\n**Próxima etapa:** validar o fluxo de instalação e navegação offline no CI e no preview.",
);

architecture = architecture.replace(
    /## 23\. Registro de implementação[\s\S]*$/,
    [
        "## 23. Registro de implementação",
        "",
        "- Branch de trabalho: feat/pwa; main e dev permanecem intocadas.",
        "- Dependências adicionadas como devDependencies: vite-plugin-pwa 2.0.0, workbox-core 7.4.1, workbox-precaching 7.4.1 e workbox-routing 7.4.1.",
        "- O manifesto é definido em src/pwa/config/manifest.js.",
        "- Os ícones são gerados de public/logo.svg pelo script scripts/generate-pwa-icons.mjs, acionado por predev e build; PNGs gerados não precisam ser versionados como fontes.",
        "- O Service Worker usa injectManifest, nomes de cache versionados e navegação network-first com fallback ao app shell; a página estática public/offline.html é alternativa final.",
        "- O precache inicial inclui JS, CSS, HTML, favicon, manifesto e ícones, com limite por arquivo de 2 MiB. Imagens e vídeos de tutoriais são excluídos.",
        "- A interface apresenta estado de conexão, confirmação de preparação offline e aviso de atualização com ação explícita.",
        "- Testes unitários e E2E foram criados e adicionados ao workflow Validate Hauy Conecta.",
        "- npx vite build, ESLint e os quatro testes unitários passaram no sandbox Node 24. O build completo parou na etapa Astratra porque o Chromium encerra dentro do sandbox remoto; o E2E ainda deve ser confirmado no runner Ubuntu do GitHub Actions.",
        "- Nenhum cache runtime de imagens, pacote de tutorial, IndexedDB ou vídeo offline foi implementado nesta fase.",
        "- Os diretórios de domínio serão criados progressivamente junto com o primeiro arquivo de cada responsabilidade para evitar scaffolding vazio.",
        "",
        "## 24. Decisões e validação da Fase 1",
        "",
        "- O Service Worker é construído por injectManifest para manter o roteamento e a política offline sob controle do projeto.",
        "- O registro é feito pela aplicação React por meio do módulo client; componentes não manipulam diretamente o registro do navegador.",
        "- O tipo de atualização é prompt: a versão nova só é aplicada quando a pessoa aciona Atualizar agora.",
        "- A navegação tenta a rede primeiro para preservar o HTML pré-renderizado e SEO. Se a rede falhar, o Service Worker devolve o app shell para o React Router tratar a rota.",
        "- O precache é limitado por tipo de arquivo e tamanho; mídia de tutoriais não é baixada automaticamente.",
        "- Os ícones são artefatos gerados no início de dev/build, evitando manter PNGs derivados no controle de versão.",
        "- O workflow Validate Hauy Conecta executa testes unitários PWA antes de lint e testes de navegador após o build/prerender.",
        "- A validação em sandbox executou Vite build, ESLint e quatro testes unitários. O sandbox remoto não conseguiu manter Chromium ativo; a aprovação E2E depende da execução no runner Ubuntu do CI.",
    ].join("\n"),
);

fs.writeFileSync(architecturePath, architecture);

const aiPath = "docs/AI_CONTEXT.md";
let ai = fs.readFileSync(aiPath, "utf8");
const sectionStart = ai.indexOf("## 14. Estado atual do PWA");
const sectionEnd = ai.indexOf("\n## 15.", sectionStart);

if (sectionStart === -1 || sectionEnd === -1) {
    throw new Error("Não foi possível localizar a seção 14 do AI_CONTEXT.");
}

const pwaSection = [
    "## 14. Estado atual do PWA",
    "",
    "**Status: Fase 1 parcialmente implementada na branch feat/pwa; o PWA ainda não está liberado como funcionalidade de produção.**",
    "",
    "A arquitetura e o histórico estão em docs/arquitetura-pwa-hauy-conecta.md. O código PWA fica isolado em src/pwa/ e os testes automatizados em tests/pwa/.",
    "",
    "A implementação atual usa vite-plugin-pwa 2.0.0 com injectManifest e Workbox 7.4.1. O manifesto é definido em src/pwa/config/manifest.js; os ícones PNG são gerados de public/logo.svg por scripts/generate-pwa-icons.mjs antes de dev/build.",
    "",
    "O Service Worker em src/pwa/service-worker/sw.js faz precache de JS, CSS, HTML, favicon, manifesto e ícones, com limite de 2 MiB por arquivo. Os caminhos de tutoriais e arquivos MP4 são excluídos. A navegação tenta a rede primeiro e usa o app shell quando a rede falha; public/offline.html é fallback final.",
    "",
    "O registro e a atualização ficam em src/pwa/client/register-service-worker.js. A interface React usa src/pwa/ui/hooks/usePwaStatus.js e src/pwa/ui/components/PwaStatusBanner.jsx para sinalizar conexão, preparação offline e atualização disponível. A atualização é prompt: precisa de ação explícita da pessoa.",
    "",
    "Scripts novos: npm run pwa:icons, npm run test:pwa:unit, npm run test:pwa:e2e e npm run test:pwa. O workflow Validate Hauy Conecta executa testes unitários antes do lint e testes E2E após build/prerender.",
    "",
    "Validação realizada no sandbox Node 24: Vite build passou, ESLint passou com duas advertências preexistentes em ImageLightbox.jsx e useTutorialStepMedia.js, e quatro testes unitários PWA passaram. O build completo chegou à etapa Astratra, mas o sandbox remoto encerrou o Chromium; a execução E2E precisa ser confirmada no GitHub Actions/Ubuntu. Não declarar instalação ou uso offline validado até essa execução e um teste manual no preview.",
    "",
    "Ainda não foram implementados cache runtime de imagens, pacotes offline por tutorial, IndexedDB, downloads ou vídeo offline. A decisão híbrida permanece: vídeos não entram no precache automático.",
].join("\n");

ai = ai.slice(0, sectionStart) + pwaSection + ai.slice(sectionEnd);
fs.writeFileSync(aiPath, ai);
