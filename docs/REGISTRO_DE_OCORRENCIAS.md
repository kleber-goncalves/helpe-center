# Registro de Ocorrências — Hauy Conecta

> **Finalidade:** manter um histórico rastreável de bugs, erros técnicos, vulnerabilidades e incidentes do Hauy Conecta. Este documento é público e contém somente informações avaliadas como seguras para divulgação.
>
> **Última atualização:** 2026-11-01  
> **Responsável pelo registro:** mantenedor do repositório.

**Revisão pós-release (01/11/2026):** a promoção de `dev` para `main` pela PR #19 e a publicação da PWA foram concluídas com workflows de release aprovados. O evento de publicação não foi classificado como BUG, ERR, VULN ou INC. Os registros históricos abaixo permanecem preservados; esta atualização não adiciona vulnerabilidade confirmada.

## 1. Como usar este registro

Este documento complementa o [AI_CONTEXT.md](./AI_CONTEXT.md):

- O **AI_CONTEXT** descreve o estado atual, a arquitetura, as decisões e as instruções de continuidade.
- O **Registro de Ocorrências** preserva problemas encontrados, investigação, causa raiz, correções, validações e prevenção de recorrência.
- O [SECURITY.md](../SECURITY.md) define como lidar com relatos e detalhes sensíveis de segurança.

O registro é histórico. Uma ocorrência resolvida não deve ser apagada ou reescrita para esconder o problema original. Correções de informação devem preservar a rastreabilidade, registrando a atualização na linha do tempo ou na descrição da própria ocorrência.

### Princípio de segurança para um repositório público

O Hauy Conecta é um projeto escolar e educacional, mas seu repositório é público. **A finalidade de estudo não autoriza divulgar dados sensíveis nem testar sistemas sem autorização.**

Este documento nunca deve conter:

- senhas, tokens, chaves, cookies, credenciais ou conteúdo de arquivos `.env`;
- dados pessoais de alunos, professores, funcionários ou responsáveis;
- URLs privadas, identificadores de contas, endereços internos ou configuração que aumente a superfície de ataque;
- prova de conceito explorável, payload, cadeia de exploração, bypass, sequência operacional de ataque ou detalhes que facilitem reproduzir uma vulnerabilidade ainda não corrigida;
- logs, capturas de tela, requisições ou respostas que exponham os itens anteriores.

Se um detalhe puder ajudar alguém a explorar um sistema antes da correção, ele não pertence ao registro público. Use um canal privado conforme a política em [SECURITY.md](../SECURITY.md). A classificação como pública ou restrita precisa ser avaliada por uma pessoa; o validador automatizado não substitui essa análise.

## 2. Categorias e identificadores

Cada ocorrência pública recebe um identificador permanente, único e sequencial dentro de sua categoria:

| Prefixo | Categoria | Quando usar |
|---|---|---|
| `BUG-0001` | Bug | Comportamento incorreto de uma funcionalidade ou regra do produto. |
| `ERR-0001` | Erro técnico | Falha de execução, integração, build, CI/CD, publicação ou infraestrutura. |
| `VULN-0001` | Vulnerabilidade | Fraqueza de segurança que pode afetar confidencialidade, integridade ou disponibilidade. |
| `INC-0001` | Incidente | Evento que causou ou poderia causar impacto operacional relevante; pode relacionar vários bugs ou erros. |

Regras dos IDs:

1. Cada prefixo possui sua própria sequência, iniciada em `0001`.
2. Um ID publicado nunca é reutilizado, mesmo após resolução, duplicidade ou reclassificação.
3. Ocorrências relacionadas devem referenciar seus IDs; não crie registros duplicados para o mesmo problema.
4. Um incidente pode agrupar registros `BUG`, `ERR` ou `VULN`, sem substituir seus históricos.
5. Achados de segurança mantidos em sigilo são rastreados no aviso privado do GitHub. O ID público `VULN-####` só é atribuído quando existir um resumo sanitizado aprovado para publicação.

## 3. Status

| Status | Significado |
|---|---|
| `ABERTO` | Ocorrência registrada, ainda sem investigação concluída. |
| `EM INVESTIGAÇÃO` | Evidências e hipóteses estão sendo analisadas. |
| `EM CORREÇÃO` | A causa ou mitigação foi identificada e a mudança está em desenvolvimento. |
| `MITIGADO` | O impacto foi reduzido, mas ainda existe correção definitiva ou risco residual. |
| `RESOLVIDO` | Correção aplicada e validada por evidências registradas. |
| `ACEITO (RISCO)` | Risco residual aceito conscientemente pelo responsável, com justificativa e data de revisão. |
| `NÃO REPRODUZIDO` | Não foi possível reproduzir com as evidências e condições disponíveis. Isso não prova inexistência do problema. |
| `DUPLICADO` | O registro aponta para outra ocorrência que representa o mesmo problema. |

**Critério de encerramento:** alteração de código, isoladamente, não comprova resolução. Para usar `RESOLVIDO`, registre o que foi validado, em qual ambiente e qual evidência sustenta a conclusão. Para vulnerabilidades, a decisão de divulgar detalhes também depende de avaliação de risco e divulgação coordenada.

## 4. Prioridade e severidade

Para bugs, erros e incidentes, registre a prioridade operacional:

- **Crítica:** indisponibilidade ampla, perda relevante de dados ou bloqueio de função essencial.
- **Alta:** impacto importante em uma função central ou grupo significativo de usuários.
- **Média:** impacto limitado, com alternativa ou contorno disponível.
- **Baixa:** impacto pequeno, visual ou localizado, sem bloqueio relevante.

Para vulnerabilidades, registre a severidade de segurança (**Crítica, Alta, Média, Baixa ou Informativa**) somente após avaliação técnica. CVSS pode ser incluído quando calculado de forma justificada; não atribua nota por impressão.

Prioridade operacional e severidade de segurança são conceitos diferentes. Não use CVSS para classificar um bug funcional que não represente vulnerabilidade.

## 5. Processo de registro

1. **Registrar:** descrever o comportamento observado sem antecipar a causa.
2. **Reproduzir:** indicar ambiente, condições e frequência, quando conhecido.
3. **Investigar:** separar evidências, hipóteses descartadas e causa raiz confirmada.
4. **Avaliar impacto:** indicar funcionalidades, usuários e ambientes afetados, sem expor dados pessoais.
5. **Corrigir ou mitigar:** apontar a mudança e as limitações que permanecerem.
6. **Validar:** relacionar testes automatizados e verificações manuais, distinguindo o que foi realmente executado.
7. **Prevenir:** registrar testes, monitoramento, documentação ou controles que reduzam recorrência.
8. **Atualizar o status:** registrar data, justificativa e referência da decisão.

### Regras específicas para segurança

- Não publicar detalhes técnicos de uma vulnerabilidade enquanto a correção ou divulgação coordenada não estiver aprovada.
- Não fazer varreduras, tentativas de exploração, força bruta, testes de negação de serviço ou testes em contas e dados reais sem autorização explícita do responsável pelo ambiente.
- Para estudos, prefira ambiente local, Preview autorizado e dados sintéticos.
- Não inclua evidências com nomes, e-mails, matrículas, imagens identificáveis ou informações escolares privadas.
- Ao descobrir possível exposição de segredo, interrompa a divulgação, notifique o responsável e revogue/rotacione o segredo. Apagar o valor do commit não invalida uma credencial exposta.
- Consulte [SECURITY.md](../SECURITY.md) antes de registrar ou divulgar um achado de segurança.

## 6. Modelo para novas ocorrências

Copie o modelo abaixo e substitua os campos. Mantenha todas as seções; quando algo ainda não for conhecido, escreva explicitamente `Pendente` ou `Não determinado`.

**Metadados obrigatórios:**

- **Status:** ABERTO
- **Data de registro:** YYYY-MM-DD
- **Data de descoberta:** YYYY-MM-DD ou Não determinada
- **Data de resolução:** YYYY-MM-DD ou —
- **Componente:** nome da área ou módulo
- **Prioridade:** Crítica, Alta, Média ou Baixa
- **Severidade:** Crítica, Alta, Média, Baixa, Informativa ou Não se aplica
- **Divulgação:** PÚBLICA (resumo sanitizado) ou RESTRITA (não publicar detalhes)

**Seções obrigatórias:**

- **Resumo:** descrição objetiva.
- **Impacto:** comportamento esperado, comportamento observado e consequência.
- **Investigação e causa raiz:** evidências, hipóteses e causa confirmada ou pendente.
- **Correção ou mitigação:** alteração realizada ou plano de ação.
- **Validação:** testes executados, ambiente, resultado e limitações.
- **Prevenção:** controles para evitar recorrência.
- **Referências:** PRs, commits, Actions, arquivos ou relatórios privados apropriados.

Para uma vulnerabilidade ainda restrita, não crie uma seção pública com detalhes de exploração. Mantenha o material técnico no fluxo privado de segurança.

## 7. Histórico de ocorrências

### BUG-0001 — Falha ao armazenar vídeos MP4 grandes no Cache Storage

- **Status:** RESOLVIDO
- **Data de registro:** 2026-11-01
- **Data de descoberta:** Investigação anterior consolidada em 2026-11-01; início exato não determinado.
- **Data de resolução:** 2026-11-01
- **Componente:** PWA — download de pacotes de tutoriais, vídeos MP4 e Cache Storage.
- **Prioridade:** Alta
- **Severidade:** Não se aplica — bug funcional, não classificado como vulnerabilidade.
- **Divulgação:** PÚBLICA — resumo sanitizado.

#### Resumo

Durante o download de um pacote de tutoriais com vídeos grandes, o armazenamento de algumas respostas MP4 falhava no Chrome/Chromium no ambiente em que o problema foi reproduzido. A falha impedia a conclusão confiável do pacote para uso offline.

#### Impacto

O pacote de vídeos poderia não ser salvo integralmente, comprometendo o acesso offline ao conteúdo. O problema foi observado em perfis e condições específicos de teste; não deve ser interpretado como uma falha universal de todos os navegadores Chromium ou de todos os dispositivos.

#### Investigação e causa raiz

- A gravação direta no Cache Storage de uma resposta de rede com corpo em fluxo (`ReadableStream`) falhava no cenário reproduzido.
- Testes isolados mostraram que a leitura progressiva do corpo e a criação de um `Blob` antes de chamar `Cache.put()` funcionavam nesse mesmo cenário.
- A causa prática foi a incompatibilidade do caminho de armazenamento utilizado com o fluxo grande de resposta no ambiente observado; não foi estabelecido que o problema fosse um defeito geral do navegador.
- O tratamento anterior da falha também dificultava distinguir o erro original durante o diagnóstico.

#### Correção ou mitigação

- A leitura do corpo do vídeo passou a usar `ReadableStreamDefaultReader`, acumulando os blocos recebidos.
- Após a leitura completa, o código materializa um `Blob`, confere o tamanho e grava uma nova `Response(blob)` no Cache Storage.
- Os vídeos são processados sequencialmente para limitar o pico de memória; imagens continuam com até dois workers simultâneos.
- Foram preservados cancelamento, validação de MIME/tamanho, cache temporário e atualização do registro no IndexedDB somente após a conclusão do pacote.

#### Validação

- Testes unitários cobrem integridade do conteúdo materializado, progresso por bloco, erro de leitura e cancelamento.
- O workflow de validação executou testes unitários, ESLint, build/prerender, auditoria de imagens e testes E2E do PWA com sucesso.
- O pacote completo do Canva, com 14 vídeos e aproximadamente 275 MiB de mídia, foi baixado com sucesso no Preview após a atualização do artefato.
- O funcionamento offline, reprodução, navegação e busca temporal foram confirmados nos testes manuais relatados pelo responsável pelo projeto.
- A validação automatizada não substitui testes em todos os navegadores, dispositivos e condições de memória.

#### Prevenção

- Manter testes unitários para leitura progressiva, integridade, falha e cancelamento.
- Preservar processamento sequencial dos vídeos para controlar o uso de memória.
- Revalidar download e reprodução offline quando o fluxo de cache ou os formatos de mídia forem alterados.

#### Referências

- [PR #17 — materializar vídeos antes do Cache Storage](https://github.com/kleber-goncalves/helpe-center/pull/17)
- [Validação do PR #17 — GitHub Actions](https://github.com/kleber-goncalves/helpe-center/actions/runs/41270021606)
- [Validação após merge — GitHub Actions #243](https://github.com/kleber-goncalves/helpe-center/actions/runs/41270912557)
- Arquivos: `src/pwa/downloads/tutorial-package.js` e `tests/pwa/unit/tutorial-package.test.js`.

### ERR-0001 — Artefato dist desatualizado na branch dev

- **Status:** RESOLVIDO
- **Data de registro:** 2026-11-01
- **Data de descoberta:** 2026-11-01
- **Data de resolução:** 2026-11-01
- **Componente:** Publicação — GitHub Actions, artefato `dist/` e integração com Vercel.
- **Prioridade:** Média
- **Severidade:** Não se aplica — erro de pipeline/publicação, não classificado como vulnerabilidade.
- **Divulgação:** PÚBLICA — sem dados sensíveis.

#### Resumo

Alterações feitas na branch `dev` podiam não ser refletidas no `dist/` versionado porque o workflow de prerender não era disparado por pushes nessa branch. Como consequência, a Vercel podia publicar artefatos antigos em vez do código-fonte mais recente.

#### Impacto

O Preview associado à `dev` poderia servir JavaScript ou Service Worker de uma versão anterior. Isso dificultava a confirmação de alterações e podia levar a diagnósticos incorretos, pois o código-fonte e o código efetivamente publicado não correspondiam.

Não há evidência registrada nesta ocorrência de que a produção tenha sido afetada.

#### Investigação e causa raiz

- O workflow `.github/workflows/prerender.yml` não incluía `dev` entre as branches observadas no gatilho de push.
- A configuração de publicação da Vercel utiliza `dist/` como diretório de saída e um comando de build informativo; a Vercel não recompila a aplicação a partir dos arquivos-fonte nesse fluxo.
- Assim, sem uma execução do prerender que atualizasse e versionasse o artefato, o Preview podia continuar publicando a versão anterior de `dist/`.

#### Correção ou mitigação

- A branch `dev` foi adicionada aos gatilhos de push do workflow de prerender.
- O workflow executa `npm run build` e cria o commit `build: update prerendered site` quando os artefatos gerados diferem dos versionados.
- A documentação passou a explicar que `dist/` é um artefato gerado e não deve ser editado manualmente.

#### Validação

Após a integração da PR #17 na `dev`:

- [Build prerendered site #101](https://github.com/kleber-goncalves/helpe-center/actions/runs/41270912635) concluiu com sucesso e criou o commit [`829d174`](https://github.com/kleber-goncalves/helpe-center/commit/829d174eee56080be10e772a1bcbe6059c68b258), com a mensagem `build: update prerendered site`.
- [Validate Hauy Conecta #243](https://github.com/kleber-goncalves/helpe-center/actions/runs/41270912557) concluiu todas as etapas com sucesso.
- A Vercel publicou o commit `829d174` em estado `READY`.
- A página inicial, o Service Worker e o bundle do tutorial responderam com HTTP 200.
- O conteúdo publicado de `dist/sw.js` e do bundle do tutorial foi comparado com os arquivos da branch `dev` e estava idêntico.

#### Prevenção

- Manter `dev` no gatilho do workflow de prerender.
- Não editar `dist/` manualmente; alterar as fontes e deixar o build gerar os artefatos.
- Após mudanças relevantes, conferir a execução do workflow, o commit gerado e o SHA da implantação Vercel.
- Se o workflow não gerar novo commit porque não existem diferenças no artefato, confirmar que o `dist/` versionado já corresponde ao build esperado.

#### Referências

- [Build prerendered site #101](https://github.com/kleber-goncalves/helpe-center/actions/runs/41270912635)
- [Validação Hauy Conecta #243](https://github.com/kleber-goncalves/helpe-center/actions/runs/41270912557)
- [Commit do dist #829d174](https://github.com/kleber-goncalves/helpe-center/commit/829d174eee56080be10e772a1bcbe6059c68b258)
- Arquivos: `.github/workflows/prerender.yml`, `vercel.json` e diretório `dist/`.

## 8. Situação inicial do histórico de segurança

Na criação desta primeira versão, não foram incluídas ocorrências individuais da categoria `VULN`, pois não há evidência de uma vulnerabilidade específica confirmada neste histórico que possa ser registrada com precisão.

**Isso não significa que o projeto tenha sido auditado ou que esteja livre de vulnerabilidades.** Significa apenas que nenhum achado de segurança foi documentado aqui nesta versão. Novos achados devem seguir a política de divulgação do [SECURITY.md](../SECURITY.md).

## 9. Manutenção do documento

- Atualize este arquivo no mesmo trabalho em que a ocorrência for investigada ou encerrada, sempre que possível.
- Registre fatos observados separadamente de hipóteses.
- Não invente datas, métricas, ambientes, causas ou resultados de testes ausentes.
- Vincule PRs, commits e execuções reais; não use um link como prova de um teste que não foi executado.
- Se uma ocorrência mudar de status, preserve a justificativa e a data na linha do tempo ou na descrição da própria ocorrência.
- O script `npm run check:occurrences` valida IDs, campos, status e estrutura mínima. Ele não avalia a correção técnica, a severidade real nem se um texto está seguro para divulgação; essa revisão continua humana.
