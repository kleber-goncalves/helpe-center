# Testes do PWA — Hauy Conecta

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
- Cache do pacote removido: o tutorial passa a ser identificado como incompleto.
- Conteúdo alterado: a interface indica pacote desatualizado sem excluir o cache anterior.
- Dados locais apagados: a interface volta a oferecer o download, sem declarar o pacote disponível.
- Quota excedida durante atualização: a versão anteriormente salva permanece associada ao registro.
- Recurso substituído por HTML inválido: o pacote é identificado como incompleto.
- Cancelamento durante a gravação: o cache temporário é removido.
- Arquivo necessário indisponível: o pacote não é registrado como salvo.

## Critérios de qualidade

- Usar recursos pequenos e sintéticos nos testes; não depender dos vídeos reais do portal (aproximadamente 298 MiB).
- Cada teste deve limpar somente os caches e bancos que criou.
- Não depender de YouTube, Gemini, APIs externas ou internet pública.
- Um pacote só pode ser apresentado como disponível quando o cache e todos os recursos esperados estiverem válidos.
- Falhas de quota, rede, cancelamento ou persistência não podem apagar a versão anterior que ainda esteja íntegra.
- O workflow Validate Hauy Conecta executa os testes unitários PWA, lint, build/prerender e testes E2E no runner Ubuntu.

A simulação automatizada de quota não substitui o aceite manual em navegador real. Também devem ser verificados manualmente limites de armazenamento, remoção de dados pelo navegador, instalação, atualização e uso offline em Chrome desktop e Android.
