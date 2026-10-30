# Módulo PWA — Hauy Conecta

Este diretório concentra a implementação do Progressive Web App. A arquitetura completa está em docs/arquitetura-pwa-hauy-conecta.md.

## Implementação atual

- config/manifest.js define nome, escopo, modo de exibição, cores e ícones.
- config/cache-policy.js define a versão do cache, os tipos de arquivos do precache, exclusões e limite por arquivo.
- client/register-service-worker.js registra o Service Worker uma vez e publica eventos de atualização/preparação offline.
- service-worker/sw.js contém o código Workbox executado no contexto do Service Worker.
- ui/hooks/usePwaStatus.js adapta estado de conexão e eventos PWA para React.
- ui/components/PwaStatusBanner.jsx apresenta os avisos ao usuário.

## Limites de responsabilidade

1. Manter o PWA isolado em src/pwa; não espalhar lógica de cache ou Service Worker pelos componentes genéricos do portal.
2. A aplicação React conversa com o PWA por client e ui; não acessa diretamente detalhes internos do Service Worker.
3. O Service Worker tem contexto de execução próprio. Não importar React, hooks ou módulos que dependam do DOM da aplicação.
4. Centralizar políticas e limites em config.
5. Cache Storage armazena respostas HTTP. IndexedDB será usado para metadados dos pacotes, quando a fase de downloads começar.
6. Não misturar caches gerenciados pelo Workbox com caches de pacotes opt-in. Uma atualização do shell nunca deve apagar downloads do usuário.
7. Vídeos e arquivos de tutoriais não entram no precache inicial.
8. Criar cada subpasta somente quando a primeira responsabilidade correspondente for implementada. Não adicionar diretórios vazios ou .gitkeep.
9. Manter funções utilitárias próximas do domínio; utils é reservado a funções puras compartilhadas.

## Política atual de precache

O precache inclui JavaScript, CSS, HTML, favicon, manifesto e ícones PWA, com limite de 2 MiB por arquivo. Os caminhos de tutoriais, imagens e arquivos MP4 ficam fora da lista inicial.

A navegação tenta buscar a rota na rede para preservar o HTML pré-renderizado. Quando a rede falha, o Service Worker usa o app shell e deixa o React Router resolver a rota. public/offline.html é o fallback final.

## Próximas responsabilidades

As áreas storage, downloads, connection e updates avançados serão criadas quando as fases de Cache Storage/IndexedDB e downloads opt-in começarem. Não criar abstrações vazias antecipadamente.
