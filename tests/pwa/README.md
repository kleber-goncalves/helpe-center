# Testes do PWA — Hauy Conecta

> **Estado:** testes integrados ao workflow principal de validação e executados na release de produção em 2026-11-01. O aceite manual e as validações residuais estão separados dos resultados automatizados.

Os testes específicos da PWA ficam fora de `src/`. A implementação está em `src/pwa/`; as decisões completas ficam em [docs/arquitetura-pwa-hauy-conecta.md](../../docs/arquitetura-pwa-hauy-conecta.md).

## Estrutura

- `unit/`: manifesto, políticas de cache, coleta de recursos, fingerprints, integridade e limpeza.
- `e2e/`: registro do Service Worker, navegação offline, downloads, atualização/reparo e reprodução de vídeos no navegador.

## Ferramentas e comandos

- Unitários: Node test runner (`node:test`) e `node:assert`.
- E2E: Playwright com Chromium e Service Workers habilitados.
- `npm run test:pwa:unit`: executa testes unitários.
- `npm run test:pwa:e2e`: executa E2E com build servido por Vite Preview.
- `npm run test:pwa`: executa os dois conjuntos.

## Cobertura unitária

- Identidade, idioma, escopo, modo standalone e ícones do manifesto.
- Versão e limites da política de cache, recursos precacheados e exclusões.
- Coleta de imagens, pôsteres e vídeos locais, deduplicação e exclusão de URLs externas.
- Fingerprints e detecção de alterações em textos, imagens e vídeos.
- Separação da versão dos vídeos opcionais, para não invalidar pacotes sem vídeos.
- Rejeição de respostas ausentes, status inválido, MIME incompatível, conteúdo vazio e tamanho divergente.
- Limpeza de caches antigos do app shell sem apagar caches runtime ou pacotes.

## Cobertura E2E

- Registro e controle do Service Worker.
- Navegação por rota direta sem conexão.
- Cache runtime de imagens.
- Download de pacote com imagens e pôsteres.
- Download de MP4 e reprodução/busca temporal offline.
- Reparo após cache de pacote ausente.
- Atualização quando o conteúdo muda, preservando o pacote anterior até a conclusão da nova versão.
- Remoção de dados locais e identificação de pacotes incompletos.
- Quota excedida durante atualização, mantendo o pacote anterior íntegro.
- Resposta HTML inválida no lugar de recurso de mídia.
- Cancelamento e indisponibilidade de recurso sem registrar pacote como salvo.

Os testes utilizam recursos pequenos/sintéticos e não dependem do download dos vídeos reais do portal. Também não dependem de YouTube, Gemini, Apps Script ou internet pública.

## Resultado automatizado da release

Na promoção da PWA para `main`, o workflow [Validate Hauy Conecta #249](https://github.com/kleber-goncalves/helpe-center/actions/runs/41273723214) concluiu com sucesso, incluindo testes unitários PWA, ESLint, build/prerender, auditoria de imagens e testes E2E. O workflow [Build prerendered site #103](https://github.com/kleber-goncalves/helpe-center/actions/runs/41273723224) também concluiu com sucesso. A [Vercel publicou o artefato em estado READY](https://vercel.com/kleber-goncalves-s-projects/helpe-center/3RnqTbNbWFHvRErRKEYnpKwwpzVS).

Esses resultados comprovam execução automatizada no runner. Não representam teste de todos os modelos de aparelho, versões de navegador ou condições de armazenamento.

## Aceite manual informado pelo responsável

Foram reportados como funcionando nos testes anteriores à promoção:

- Chrome desktop: instalação nativa, abertura standalone, atualização do Service Worker e navegação offline.
- Samsung Galaxy A14 4G: instalação, navegação offline e reprodução de vídeos MP4 offline.
- Dispositivo Android TecToy: instalação nativa.
- Vídeos grandes: download e reprodução offline em dispositivos reais; pacote completo do Canva validado no Preview.

Foi observado que o Motorola E20 com Android 11 não apresentava instalação/criação de atalho no Chrome nem para `example.com/`. Isso foi registrado como comportamento do ambiente navegador/launcher, sem evidência de que seja defeito do Hauy Conecta. iOS/Safari não faz parte do escopo de validação desta etapa.

## Validações manuais pós-release

A publicação inicial em produção foi concluída, mas ainda é necessário:

1. Salvar um tutorial na origem oficial, realizar uma próxima publicação nessa mesma origem e confirmar que o pacote continua disponível e íntegro.
2. Verificar em aparelhos reais o comportamento com quota próxima do limite e eventual evicção/remoção pelo navegador.
3. Repetir um smoke test de instalação, abertura standalone, navegação offline e reprodução de um pacote no domínio oficial.

Os testes E2E simulam quota excedida e perda de dados, mas não substituem o comportamento real do navegador/sistema.

## Critérios de qualidade

- Um pacote só pode ser indicado como disponível quando todos os recursos esperados estiverem válidos.
- Atualização deve usar cache temporário e preservar a versão anterior até a validação da nova versão.
- Falhas de rede, quota ou cancelamento não podem registrar um pacote incompleto como salvo.
- Cada teste deve limpar somente caches e bancos que criou.
- Alterações no Service Worker, versão de cache ou coleta de mídia exigem revisar unitários, E2E e a documentação de arquitetura.
