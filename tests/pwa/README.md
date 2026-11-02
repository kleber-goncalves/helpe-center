# Testes do PWA — Hauy Conecta

> **Revisado em:** 01/11/2026. Comandos e cobertura conferidos com `package.json`, `tests/pwa/` e o workflow `Validate Hauy Conecta`. Relacione sempre o resultado de um run ao SHA que ele efetivamente testou.

Os testes específicos do PWA ficam fora de `src/`. A implementação e as decisões estão documentadas em `docs/arquitetura-pwa-hauy-conecta.md`.

## Estrutura

- `unit/`: regras puras, manifesto, políticas de cache, fingerprints e validação de recursos.
- `e2e/`: registro do Service Worker, navegação offline e fluxos reais de download, atualização e recuperação no navegador.

## Ferramentas e comandos

- Unitários: Node test runner (`node:test`) e `node:assert`.
- Navegador: Playwright com Chromium e Service Workers habilitados.
- `npm run test:pwa:unit`: executa os testes unitários.
- `npm run test:pwa:e2e`: executa os testes E2E com o build servido por Vite Preview.
- `npm run test:pwa`: executa unitários e E2E.

## Cobertura atual

### Unitários

- Manifesto: identidade, idioma, escopo, modo standalone e ícones.
- Política de cache: versão, limite por arquivo, recursos incluídos e exclusões.
- Catálogo de imagens e vídeos: seleção de recursos locais, deduplicação e exclusão de URLs externas.
- Fingerprints: estabilidade da serialização e detecção de alterações em texto, imagens e vídeos.
- Separação das versões: alterações nos MP4 opcionais não invalidam pacotes que não incluem vídeos.
- Integridade: rejeição de respostas ausentes, status inválido, MIME incompatível, recursos vazios e tamanho divergente.
- Ativação do Service Worker: remove apenas caches antigos do app shell e preserva caches runtime e pacotes offline.

### E2E

- Registro e controle do Service Worker.
- Navegação por rota direta sem conexão.
- Cache runtime de imagens.
- Download de pacote com imagens e pôsteres.
- Download de MP4 e reprodução/busca temporal offline.
- Cache do pacote removido: o tutorial passa a ser identificado como incompleto e pode ser reparado com novo cache validado.
- Conteúdo alterado: a interface indica pacote desatualizado, atualiza o pacote com sucesso e remove o cache anterior somente depois da substituição.
- Dados locais apagados: a interface volta a oferecer o download, sem declarar o pacote disponível.
- Quota excedida durante atualização: a versão anteriormente salva permanece associada ao registro.
- Recurso substituído por HTML inválido: o pacote é identificado como incompleto.
- Cancelamento durante a atualização: o pacote anterior é preservado e o cache temporário é removido.
- Arquivo necessário indisponível: o pacote não é registrado como salvo.

## Critérios de qualidade

- Usar recursos pequenos e sintéticos nos testes; não depender dos vídeos reais do portal (aproximadamente 298 MiB).
- Cada teste deve limpar somente os caches e bancos que criou.
- Não depender de YouTube, Gemini, APIs externas ou internet pública.
- Um pacote só pode ser apresentado como disponível quando o cache e todos os recursos esperados estiverem válidos.
- Falhas de quota, rede, cancelamento ou persistência não podem apagar a versão anterior que ainda esteja íntegra.
- O workflow Validate Hauy Conecta executa os testes unitários PWA, lint, build/prerender e testes E2E no runner Ubuntu.

## Aceite manual informado pelo responsável

Os seguintes cenários foram testados em dispositivos reais e reportados como funcionando:

- Chrome desktop: instalação nativa, abertura standalone, atualização do Service Worker e navegação offline.
- Samsung Galaxy A14 4G: instalação, navegação offline e reprodução de vídeos MP4 offline.
- Dispositivo Android TecToy: instalação nativa.
- Vídeos grandes: download e reprodução offline em dispositivos reais.

O Motorola E20 (Android 11) não apresenta instalação nem criação de atalhos no Chrome nem para `example.com/`, mesmo após atualização do navegador. É uma limitação observada no ambiente navegador/launcher e não um teste de falha do código do Hauy Conecta. iOS/Safari não faz parte do escopo de validação atual.

## Validações residuais após a primeira publicação de produção

A PWA foi integrada à `main` pela PR #19 em 01/11/2026. No ciclo de release, Validate Hauy Conecta #249 passou, incluindo testes unitários e E2E PWA, e a Vercel publicou a versão de produção em estado READY. A raiz do domínio oficial respondeu HTTP 200. Isso confirma o deployment e o HTML, mas não substitui os dois testes residuais:

- **Preservação entre publicações:** realizar uma segunda publicação na mesma origem definitiva e confirmar que os pacotes offline previamente salvos continuam íntegros e reproduzíveis.
- **Quota real/evicção:** observar manualmente o comportamento de quota e eventual remoção dos dados pelo navegador em um dispositivo real. Os E2E simulam quota excedida e remoção de dados, mas não substituem esse comportamento real.

A instalação, atualização, navegação offline e reprodução MP4 já aceitas manualmente não devem continuar marcadas como pendentes nos documentos de arquitetura.
