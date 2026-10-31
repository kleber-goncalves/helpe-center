# Módulo PWA — Hauy Conecta

Este diretório concentra a implementação do Progressive Web App. A arquitetura completa está em docs/arquitetura-pwa-hauy-conecta.md.

## Implementação atual

- `config/manifest.js` define nome, escopo, modo de exibição, cores e ícones.
- `config/cache-policy.js` centraliza versões, recursos do precache e limites dos caches.
- `client/register-service-worker.js` registra o Service Worker uma vez e publica eventos de atualização/preparação offline.
- `service-worker/sw.js` contém o código Workbox executado no contexto do Service Worker.
- `downloads/tutorial-package.js` cataloga e armazena os recursos necessários aos pacotes de tutoriais.
- `ui/components/TutorialOfflineButton.jsx` integra o fluxo de salvar, atualizar, cancelar e remover um tutorial.
- `ui/hooks/usePwaStatus.js` adapta estado de conexão e eventos PWA para React.
- `ui/components/PwaStatusBanner.jsx` apresenta os avisos gerais do PWA.

## Limites de responsabilidade

1. Manter o PWA isolado em `src/pwa`; não espalhar regras de cache ou Service Worker pelos componentes genéricos do portal.
2. A aplicação React utiliza os serviços e a interface do módulo PWA. O Service Worker mantém seu próprio contexto e não importa React.
3. Centralizar políticas e limites em `config`.
4. Cache Storage armazena respostas HTTP. IndexedDB mantém metadados dos pacotes, como tutorial, versão, cache associado e recursos esperados.
5. Não misturar o cache runtime de imagens com os caches de pacotes opt-in. Uma atualização do shell não pode apagar downloads do usuário.
6. Vídeos MP4 e links externos não são incluídos no pacote offline padrão.
7. Criar subpastas somente quando a responsabilidade correspondente for implementada; não adicionar diretórios vazios ou `.gitkeep`.
8. Manter funções utilitárias próximas do domínio; `utils` é reservado a funções puras compartilhadas.

## Política de armazenamento

### App shell e recursos essenciais

O precache Workbox inclui JavaScript, CSS, HTML, favicon, manifesto, ícones PWA e os logotipos estáticos `logo.svg`, `iloveIMG.svg` e `ilovePDF.svg`. O limite de precache é de 2 MiB por arquivo.

Os caminhos de tutoriais e arquivos MP4 continuam fora do precache inicial. O conteúdo textual dos tutoriais está no código JavaScript da aplicação, que é incluído no precache.

### Imagens gerais

O Service Worker intercepta solicitações de imagens da mesma origem. Quando uma imagem é solicitada online, a resposta é guardada em `hauy-conecta-runtime-images-v1`. Isso cobre imagens de seções, equipe, logos e imagens otimizadas em `/_optimized/` à medida que são carregadas.

- O limite atual é de 1.000 entradas.
- O cache runtime é independente do precache e dos pacotes de tutoriais.
- Imagens que nunca foram solicitadas não são baixadas antecipadamente.
- Ícones e logos essenciais explicitamente listados permanecem no precache.

### Pacotes de tutoriais

O bloco de conclusão de cada tutorial exibe a ação **Salvar tutorial offline**.

O pacote inclui:

- Conteúdo textual e dados do tutorial, já disponíveis no bundle pré-cacheado.
- Imagens das etapas e exemplos.
- Pôsteres associados a vídeos.
- Variantes responsivas geradas pelo script de metadados em `/_optimized/`.

Cada pacote tem um cache próprio no Cache Storage. O IndexedDB guarda metadados e a lista de arquivos esperados. O pacote só é marcado como salvo depois de baixar e validar todos os recursos. Downloads usam concorrência limitada, exibem progresso, permitem cancelamento e podem ser removidos do dispositivo.

O pacote permanece no navegador/dispositivo em que foi salvo; não sincroniza automaticamente com outros dispositivos.

**Vídeos MP4 não fazem parte do pacote padrão.** O botão informa essa limitação. Vídeos locais, videoaulas do YouTube, playlists e outros links externos ainda exigem internet. Não incluir MP4 automaticamente, pois a biblioteca totaliza centenas de MiB e poderia consumir dados móveis e armazenamento inesperadamente.

## Navegação offline

A navegação tenta buscar a rota na rede para preservar o HTML pré-renderizado. Quando a rede falha, o Service Worker usa o app shell e deixa o React Router resolver a rota. `public/offline.html` é o fallback final.

## Testes

- `npm run test:pwa:unit`: políticas e coleta de recursos de tutoriais.
- `npm run test:pwa:e2e`: registro do Service Worker, navegação offline, cache runtime de imagem e download de pacote de tutorial.
- `npm run test:pwa`: executa os testes unitários e E2E.
