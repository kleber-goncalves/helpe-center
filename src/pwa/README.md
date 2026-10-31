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
6. Vídeos MP4 são opcionais e desmarcados por padrão; links externos continuam fora do pacote offline.
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

**Vídeos MP4 são opcionais e desmarcados por padrão.** O catálogo de mídia gerado no build registra o tamanho real de cada arquivo local. A interface mostra a quantidade e o tamanho estimado dos vídeos antes do download e alerta sobre consumo de dados e armazenamento.

Quando a pessoa marca **Incluir vídeos para assistir sem internet**, os MP4 locais dos passos e exemplos são baixados integralmente para o mesmo cache individual do tutorial. O progresso informa arquivos concluídos e bytes transferidos dos vídeos. O pacote só é marcado como salvo depois que imagens, pôsteres e vídeos selecionados foram persistidos e validados. Cancelamento ou falha remove o cache temporário e preserva um pacote anterior que já estava salvo.

O Service Worker reconhece solicitações locais de MP4 e procura os arquivos nos caches dos pacotes. Quando o player envia uma requisição Range, o Service Worker responde com HTTP 206, Content-Range, Content-Length e Accept-Ranges, permitindo carregar metadados, reproduzir e avançar/retroceder sem rede. Vídeos que não foram selecionados continuam sendo solicitados pela rede. Videoaulas do YouTube, playlists e outros links externos permanecem dependentes de internet.

A biblioteca atual tem 18 MP4 locais e aproximadamente 298,38 MiB no total. O tamanho varia por tutorial; o pacote Canva, por exemplo, é muito maior que Excel e Google Drive. Por isso, não existe download automático em massa.

## Navegação offline

A navegação tenta buscar a rota na rede para preservar o HTML pré-renderizado. Quando a rede falha, o Service Worker usa o app shell e deixa o React Router resolver a rota. `public/offline.html` é o fallback final.

## Testes

- `npm run test:pwa:unit`: políticas e coleta de recursos de tutoriais.
- `npm run test:pwa:e2e`: registro do Service Worker, navegação offline, cache runtime, download de pacote com MP4 e reprodução/busca offline.
- `npm run test:pwa`: executa os testes unitários e E2E.


## Atualização e recuperação de pacotes

A atualização do Service Worker usa o modo prompt. A nova versão só é ativada após a confirmação da pessoa. Durante a ativação, a limpeza remove exclusivamente caches antigos do app shell (\`hauy-conecta-app-shell-*\`); caches de tutoriais (\`hauy-conecta-tutorial-package-*\`) e o cache runtime de imagens ficam fora dessa limpeza.

Cada pacote registra fingerprints separados para o conteúdo textual/imagens e para os vídeos opcionais. A geração de metadados calcula SHA-256 para imagens e MP4, além de manter o tamanho dos arquivos. A alteração de texto, imagem, vídeo ou metadados relevantes permite identificar um pacote desatualizado sem exigir que um pacote sem vídeos seja atualizado só porque o catálogo de vídeos mudou.

A consulta de disponibilidade verifica:
- se o cache associado ao registro ainda existe;
- se cada URL esperada está presente;
- se a resposta armazenada tem status HTTP 200 e corpo;
- se o MIME type corresponde ao tipo de recurso;
- se o tamanho registrado é positivo e, quando existe \`Content-Length\`, corresponde ao valor armazenado.

Um pacote com recurso ausente ou inválido é identificado como \`incomplete\`. Um pacote íntegro cuja fingerprint não corresponde ao conteúdo atual é \`outdated\`. Somente um pacote íntegro e atualizado recebe o estado \`saved\`.

A atualização usa cache temporário separado. O novo registro do IndexedDB só é gravado após todos os recursos serem baixados, persistidos e validados. O cache anterior só é removido depois que o novo registro foi salvo. Em caso de cancelamento, falha de rede ou quota, o cache temporário é descartado e o estado do pacote anterior é consultado novamente, evitando informar falsamente que o tutorial foi perdido.

Quando o navegador remove Cache Storage ou os metadados deixam de existir, o botão não declara o tutorial disponível. Se o cache desaparecer e o registro continuar no IndexedDB, o pacote é \`incomplete\` e oferece reparo. Se os dados do site forem apagados, o registro não existe e o usuário recebe a ação de salvar novamente.

O limite dessa verificação deve ser entendido corretamente: Cache Storage não oferece uma verificação criptográfica automática do corpo a cada consulta. A gravação é validada durante o download, os metadados registram o tamanho recebido e a consulta detecta ausência, resposta inválida, MIME incompatível e divergência de tamanho quando o cabeçalho está disponível. As fingerprints SHA-256 são usadas para detectar alteração dos arquivos publicados, não para re-hash dos arquivos a cada abertura do tutorial.
