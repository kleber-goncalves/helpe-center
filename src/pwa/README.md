# Módulo PWA — Hauy Conecta

Este diretório concentra a implementação do Progressive Web App. A arquitetura completa, as decisões e as fases estão em `docs/arquitetura-pwa-hauy-conecta.md`.

## Regras de organização

1. Manter o PWA isolado em `src/pwa/`; não espalhar lógica de cache, IndexedDB ou Service Worker pelos componentes genéricos do portal.
2. A aplicação React conversa com o PWA por `client/`, `ui/` e serviços de domínio; não acessa diretamente detalhes internos do Service Worker.
3. O Service Worker tem contexto de execução próprio. Não importar React, hooks ou módulos que dependam do DOM da aplicação.
4. Centralizar políticas e limites em `config/`; não repetir nomes de cache, versões ou limites em diversos arquivos.
5. Cache Storage armazena respostas HTTP. IndexedDB armazena metadados e estado dos pacotes. Não usar IndexedDB para duplicar arquivos de mídia.
6. Downloads devem ser orquestrados por serviços, persistidos por repositórios e apresentados por componentes/hooks separados.
7. Não misturar caches gerenciados pelo Workbox com caches de pacotes opt-in. Uma atualização do shell nunca deve apagar downloads do usuário.
8. Criar cada subpasta somente quando a primeira responsabilidade correspondente for implementada. Não adicionar diretórios vazios ou `.gitkeep`.
9. Manter funções utilitárias próximas do domínio; `utils/` é reservado a funções puras compartilhadas.

## Estrutura planejada

```text
src/pwa/
├── config/                  # Manifesto, versões e políticas de cache
├── client/                  # Registro, conexão e atualização
│   ├── connection/
│   └── updates/
├── service-worker/          # Código executado pelo Service Worker
│   ├── routes/
│   └── strategies/
├── storage/                 # Adaptadores de armazenamento
│   ├── cache/
│   └── indexed-db/
├── downloads/               # Pacotes offline por tutorial
│   ├── catalog/
│   ├── services/
│   └── repositories/
├── ui/                      # Integração com a interface React
│   ├── components/
│   └── hooks/
└── utils/                   # Helpers puros realmente compartilhados
```

## Limites importantes

- Não colocar vídeos no precache automático.
- Não baixar a biblioteca inteira de imagens.
- Não prometer funcionamento offline para Gemini, Apps Script, formulários ou outros serviços externos.
- Não marcar um pacote como disponível offline antes de validar todos os recursos obrigatórios.
- Não apagar caches opt-in ao ativar uma nova versão do Service Worker.
- Não introduzir uma biblioteca de estado global ou abstração de armazenamento sem necessidade comprovada.