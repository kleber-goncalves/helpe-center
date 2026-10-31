# Hauy Conecta — Contexto técnico para IAs

> Documento de continuidade do projeto. Leia este arquivo antes de propor mudanças, especialmente em um chat novo. Ele reúne propósito, funcionalidades, arquitetura, regras de manutenção, decisões, limitações e próximos passos. O snapshot no final é atualizado automaticamente pelo GitHub Actions.

## 1. Instruções para a IA que assumir o projeto

1. Leia este documento por inteiro antes de sugerir ou editar código.
2. Confirme a branch, o commit e o estado atual do repositório. O snapshot indica a revisão usada na última sincronização; commits posteriores podem existir.
3. Trate o código da branch aberta como fonte de verdade para o comportamento implementado. A documentação explica o contexto, mas pode ficar desatualizada entre atualizações.
4. Diferencie sempre: **implementado**, **decisão vigente**, **problema observado** e **planejado**. Não apresente uma ideia ou tarefa futura como funcionalidade pronta.
5. Preserve o propósito educacional e a linguagem acessível do Hauy Conecta. O público inclui pessoas iniciantes em tecnologia.
6. O projeto utiliza JavaScript e JSX. Não introduza TypeScript sem solicitação explícita.
7. Faça mudanças pequenas, coesas e proporcionais ao problema. Evite dependências, abstrações ou infraestrutura sem necessidade demonstrável.
8. Preserve compatibilidade com computador e celular, semântica HTML, acessibilidade, navegação por teclado e preferência por movimento reduzido.
9. Antes de alterar componentes centrais, leia os arquivos relacionados e verifique os efeitos sobre rotas, pré-renderização, imagens, acessibilidade e desempenho.
10. Não declare testes, Lighthouse, build ou deploy aprovados sem executar os comandos ou consultar os resultados correspondentes. Diferencie teste automatizado de inspeção manual em dispositivos reais.
11. Quando uma mudança alterar comportamento, arquitetura, regras do produto, segurança, acessibilidade, SEO ou publicação, atualize também a seção narrativa pertinente deste arquivo no mesmo trabalho.
12. Não edite manualmente a seção entre os marcadores de snapshot automatizado. Ela é gerada por scripts/update-ai-context.mjs.
13. Nunca inclua chaves, tokens, senhas, credenciais, valores de arquivos .env, dados pessoais ou informações privadas neste documento.
14. Não presuma que APIs externas funcionam offline. O PWA ainda está em planejamento; consulte docs/arquitetura-pwa-hauy-conecta.md antes de propor sua implementação.
15. Consulte também README.md, docs/DOCUMENTACAO_PRODUTO_HAUY_CONECTA.md, docs/DOCUMENTACAO_PROJETO.md e docs/REGRAS-DOS-TUTORIAIS.md quando a tarefa envolver produto, arquitetura ou conteúdo. Compare os documentos com o código atual, pois algumas documentações podem refletir revisões anteriores.
16. Mantenha o escopo fiel às necessidades da comunidade escolar. Novos recursos devem resolver problemas reais, não apenas aumentar a complexidade técnica.

## 2. Identidade e propósito do projeto

- **Nome:** Hauy Conecta.
- **Descrição:** Central de Ajuda Digital da Escola Estadual Hauy Petrucely Mairync.
- **Repositório:** https://github.com/kleber-goncalves/helpe-center
- **Site publicado:** https://hauy-conecta.vercel.app/
- **Hospedagem:** Vercel.
- **Público:** alunos, professores, funcionários e pessoas que estão começando a utilizar ferramentas digitais.
- **Propósito:** transformar dúvidas tecnológicas do cotidiano escolar em orientações claras, acessíveis e práticas.
- **Jornada principal:** **PESQUISAR → ENCONTRAR → APRENDER → RESOLVER**.

O portal procura diminuir a dependência de ajuda presencial para tarefas digitais recorrentes, organizando conteúdos em um único lugar. A prioridade é explicar atividades que aparecem no contexto escolar, como formatar trabalhos, utilizar planilhas, imprimir, digitalizar, compartilhar arquivos, criar apresentações e trabalhar com documentos PDF.

O projeto não pretende ser uma enciclopédia genérica de tecnologia. A evolução deve acompanhar as necessidades reais identificadas na comunidade escolar.

## 3. Funcionalidades do produto

### 3.1. Página inicial — /

Arquivo principal: src/pages/Home2.jsx.

Apresenta a proposta do portal, campo de busca, categorias, temas prioritários e acesso aos tutoriais em destaque. É o principal ponto de entrada para quem ainda não sabe onde encontrar uma orientação.

### 3.2. Categorias — /categorias

Arquivo: src/pages/Categories.jsx.

Apresenta as categorias cadastradas em src/data/categories.js.

### 3.3. Categoria específica — /categorias/:categoryId

Arquivo: src/pages/Category.jsx.

Mostra os tutoriais relacionados à categoria selecionada. O identificador da rota deve corresponder ao ID da categoria nos dados.

Categorias existentes no arquivo de dados analisado:

- Word.
- Excel.
- E-mail.
- Arquivos e PDF.
- Google Drive.
- Canva.
- Plataformas da Escola.
- Informática Básica.

Nem todas as categorias precisam ter tutoriais publicados neste momento. Não inventar conteúdo para categorias vazias.

### 3.4. Biblioteca de tutoriais — /tutoriais

Arquivo: src/pages/Tutorials.jsx.

Apresenta a biblioteca, recebe o termo de pesquisa pela query string q, mostra resultados e trata pesquisas sem correspondência. Quando não encontra o conteúdo procurado, oferece alternativas, incluindo tentar outras palavras, pesquisar no Google e enviar uma dúvida.

O campo de busca da página inicial está em src/components/SearchBar.jsx. A busca local utiliza src/lib/searchTutorials.js e os dados estáticos de tutoriais e categorias. As últimas cinco pesquisas são armazenadas no localStorage sob a chave hauy-conecta-recent-searches.

Quando uma consulta não encontra conteúdo, o frontend pode registrar a pesquisa por meio de POST /api/support, usando o tipo search-no-result. Esse registro depende da API e do serviço externo configurado.

### 3.5. Tutorial individual — /tutoriais/:tutorialId

Arquivo: src/pages/Tutorial.jsx.

Carrega o tutorial identificado pelo parâmetro da rota e permite navegar pelas etapas. A experiência pode apresentar:

- explicação passo a passo;
- exemplos;
- imagens de apoio;
- dicas;
- vídeos e pôsteres, quando cadastrados;
- ampliação de imagens por lightbox;
- navegação entre etapas;
- conclusão e indicação de conteúdos relacionados.

Os dados ficam em src/data/tutorials.js. O modelo de conteúdo utiliza informações como ID, título, categoria, dificuldade, duração, descrição, palavras-chave, objetivos de aprendizagem, etapas e materiais externos. Cada etapa pode possuir título, descrição, exemplos, dica, imagem, vídeo e pôster, conforme o conteúdo cadastrado.

Os IDs dos oito tutoriais registrados no arquivo analisado são:

- comecar-usar-excel
- formatar-trabalho-word
- sumario-automatico-word
- compartilhar-arquivo
- converter-documento-pdf
- anexar-arquivo-email
- salvar-google-drive
- apresentacao-canva

Os dados são estáticos no frontend. Para adicionar ou alterar um tutorial, consultar docs/REGRAS-DOS-TUTORIAIS.md e o procedimento documentado em docs/DOCUMENTACAO_PROJETO.md.

### 3.6. Ferramentas — /ferramentas

Arquivo: src/pages/Tools.jsx.

Apresenta um catálogo de ferramentas online para arquivos PDF e imagens. Oferece pesquisa e filtros por categoria e provedor. Os dados estão em src/data/tools.js e os provedores em src/data/toolProviders.js.

As ferramentas são serviços externos, principalmente iLovePDF e iLoveIMG. O processamento dos arquivos acontece nos sites desses provedores; não tratar esse recurso como processamento local do Hauy Conecta nem prometer controles de privacidade que o portal não administra. Deixar claro quando o usuário será direcionado a um serviço externo.

### 3.7. Perguntas frequentes — /faq

Arquivo: src/pages/FAQ.jsx.

Apresenta respostas para dúvidas recorrentes sobre o portal e sua utilização.

### 3.8. Sobre — /sobre

Arquivo: src/pages/About.jsx.

Apresenta informações institucionais e o contexto do projeto escolar.

### 3.9. Enviar uma dúvida — /enviar-duvida

Arquivos: src/pages/SendQuestion.jsx e src/components/QuestionForm.jsx.

Permite que a pessoa envie uma questão que ainda não esteja respondida na Central. O formulário solicita assunto/categoria, descrição da dúvida, nome, contato e dispositivo. Nome e contato podem ser opcionais conforme o schema; não tornar esses campos obrigatórios sem rever a regra do produto e o schema.

A validação compartilhada está em src/schemas/questionSchema.js, utilizando Zod. A interface envia a solicitação para POST /api/support, que encaminha os dados ao Google Apps Script configurado no ambiente do servidor.

### 3.10. Assistente Hauy — /assistente-hauy

Arquivos principais: src/pages/Assistente.jsx, src/components/HauyAssistant.jsx, src/components/HauyAssistantWidget.jsx, src/lib/assistant.js e api/assistant.js.

O assistente responde a dúvidas sobre tecnologia usando os tutoriais da Central como contexto. O widget também aparece globalmente nas demais rotas, exceto na página dedicada do assistente.

O backend procura conteúdos relevantes na biblioteca e envia até três tutoriais como contexto ao modelo Gemini. As instruções do assistente priorizam português do Brasil, explicações simples, conteúdo da Central e a proibição de inventar tutoriais ou etapas. Quando a base não oferece informação suficiente, o assistente deve informar essa limitação.

O Assistente Hauy complementa a Central; não substitui os tutoriais nem garante que existam respostas para todos os assuntos.

### 3.11. Página não encontrada — *

Arquivo: src/pages/NotFound.jsx.

Exibe uma página personalizada para rotas que não correspondem às páginas conhecidas.

### 3.12. Estrutura global da aplicação

src/App.jsx coordena:

- BrowserRouter e rotas;
- carregamento sob demanda das páginas com React.lazy e Suspense;
- cabeçalho e rodapé;
- preloader;
- menu de acessibilidade;
- botão de reset;
- widget do Assistente Hauy;
- componente de rolagem ao topo;
- camada de transição visual.

## 4. Arquitetura técnica

### 4.1. Stack

- **React 19:** interface baseada em componentes.
- **JavaScript e JSX:** linguagem e sintaxe da aplicação.
- **Vite 8:** servidor de desenvolvimento e build.
- **Tailwind CSS 4:** estilização.
- **React Router 7:** navegação client-side.
- **GSAP e @gsap/react:** animações e transições.
- **Lucide React:** ícones de interface.
- **Radix UI:** primitivas acessíveis utilizadas em componentes.
- **@sketchyicons/react e @thesvg/react:** ícones ilustrativos e SVGs de ferramentas.
- **Zod 4:** validação de dados do formulário de dúvidas.
- **Google GenAI:** comunicação com o modelo Gemini no backend.
- **Sharp:** processamento de imagens na automação.
- **Playwright:** navegador utilizado no processo de pré-renderização.
- **Astratra Prerender:** geração de HTML pré-renderizado.
- **GitHub Actions:** automação de validação e geração do conteúdo publicado.
- **Vercel:** hospedagem e publicação.

A lista exata de pacotes e versões é mantida automaticamente no snapshot ao final deste documento.

### 4.2. Organização em camadas

- **Frontend:** páginas, componentes, hooks, estilos e navegação em src/.
- **Dados estáticos:** categorias, tutoriais, ferramentas e provedores em src/data/.
- **Lógica compartilhada:** busca, acessibilidade, SEO e comunicação com o assistente em src/lib/.
- **Schemas:** validação do formulário em src/schemas/.
- **Backend serverless:** endpoints em api/.
- **Automação:** scripts em scripts/ e workflows em .github/workflows/.
- **Conteúdo público:** imagens, vídeos, ícones e demais arquivos em public/.

### 4.3. Arquivos importantes

| Caminho | Responsabilidade |
|---|---|
| src/main.jsx | Inicialização React e preferências de acessibilidade |
| src/App.jsx | Estrutura global e rotas |
| src/data/tutorials.js | Conteúdo dos tutoriais |
| src/data/categories.js | Categorias e temas prioritários |
| src/data/tools.js | Catálogo de ferramentas externas |
| src/data/toolProviders.js | Informações dos provedores de ferramentas |
| src/lib/searchTutorials.js | Busca e relevância de tutoriais |
| src/lib/assistant.js | Chamada frontend para o Assistente |
| src/lib/assistantResponse.js | Verificações relacionadas às respostas do Assistente |
| src/lib/accessibility.js | Inicialização de preferências de acessibilidade e tema |
| src/lib/accessibilityMotion.js | Preferência de movimento reduzido |
| src/lib/seo.js | Helpers de metadados e dados estruturados |
| src/schemas/questionSchema.js | Schema Zod do formulário de dúvidas |
| src/components/SearchBar.jsx | Campo de busca e histórico recente |
| src/components/QuestionForm.jsx | Formulário de envio de dúvidas |
| src/components/OptimizedImage.jsx | Renderização de imagens otimizadas |
| src/components/OptimizedVideo.jsx | Renderização de vídeos |
| src/hooks/useTutorialStepMedia.js | Pré-carregamento da mídia da etapa atual |
| api/assistant.js | Endpoint serverless do Gemini |
| api/support.js | Endpoint serverless do atendimento e pesquisas sem resultado |
| scripts/generate-image-metadata.mjs | Geração de metadados de imagens |
| scripts/generate-prerender-routes.mjs | Geração de rotas de pré-renderização e sitemap |
| scripts/audit-images.mjs | Auditoria das imagens no HTML gerado |
| astratra.prerender.config.cjs | Configuração da pré-renderização e boot shell |
| vercel.json | Configuração da publicação do diretório dist/ |

## 5. Busca e conteúdo

### 5.1. Busca local

A busca consulta a biblioteca estática de tutoriais. A lógica de normalização, pontuação e relevância deve permanecer centralizada em src/lib/searchTutorials.js; evitar recriar regras diferentes dentro de componentes.

O histórico recente é armazenado localmente no navegador. Isso não representa conta de usuário nem sincronização entre dispositivos.

### 5.2. Registro de pesquisas sem resultado

A página de tutoriais pode enviar consultas sem correspondência à API de suporte. O backend valida o texto e encaminha o registro ao Apps Script. Esse mecanismo depende de rede e de SUPPORT_APPS_SCRIPT_ENDPOINT configurado.

### 5.3. Conteúdo estruturado

As categorias e tutoriais são dados JavaScript, não registros carregados de um banco SQL. Ao adicionar conteúdo, manter IDs estáveis, referências de mídia válidas, textos claros, descrições acessíveis e coerência entre categorias, busca, rotas e pré-renderização.

## 6. Tutoriais, imagens e vídeos

### 6.1. Mídia dos tutoriais

Os arquivos de mídia são referenciados pelos dados dos tutoriais e ficam em caminhos públicos, especialmente dentro de public/tutoriais/. Imagens, vídeos e pôsteres são apresentados por componentes próprios.

### 6.2. Pré-carregamento atual

src/hooks/useTutorialStepMedia.js prepara imagens e vídeos associados à etapa atual. O hook utiliza estruturas em memória da sessão, como Set e Map, para evitar repetir carregamentos enquanto a aplicação está aberta.

**Isso não é cache offline persistente.** Não afirmar que o usuário já consegue acessar tutoriais ou vídeos sem internet por causa desse hook.

### 6.3. Otimização e auditoria

O build gera metadados de imagens e executa uma auditoria sobre os arquivos HTML gerados. A auditoria verifica presença de atributos width, height e alt nas imagens encontradas.

Não remover a geração de metadados ou a auditoria sem compreender seu impacto em OptimizedImage, no HTML pré-renderizado e no desempenho.

### 6.4. Vídeos externos

Recomendações e links externos podem apontar para plataformas como YouTube. A disponibilidade e o comportamento desses recursos dependem dos serviços externos.

## 7. Assistente Hauy — backend e limites

### 7.1. API

O endpoint fica em api/assistant.js e utiliza @google/genai. O segredo da API é lido no servidor por GEMINI_API_KEY, nunca no bundle do navegador.

GEMINI_MODEL pode definir o modelo. Na ausência dessa variável, o código usa gemini-3.5-flash-lite como padrão declarado no momento desta documentação.

### 7.2. Contexto e instruções

A API usa a busca local para selecionar até três tutoriais relevantes. O contexto enviado ao Gemini inclui identificação, título, categoria, descrição, objetivos e etapas dos conteúdos selecionados.

O assistente deve explicar de forma direta e acessível, sem inventar tutoriais ou etapas. O limite de saída configurado no código é de 700 tokens.

### 7.3. Proteções atualmente presentes

A implementação analisada contém:

- limite de 10.000 bytes para o corpo da requisição;
- limite de 1.000 caracteres para a mensagem;
- limite de 20 solicitações por janela de 10 minutos por IP;
- validação básica de origem;
- resposta JSON sem cache (Cache-Control: no-store);
- cabeçalho X-Content-Type-Options: nosniff;
- verificação de configuração da chave Gemini.

**Limitação importante:** o rate limit utiliza um Map em memória dentro da função serverless. Ele é uma proteção de melhor esforço, não um limitador distribuído e persistente compartilhado entre instâncias.

A verificação atual permite requisições sem cabeçalho Origin. Não descrever essa verificação como autenticação ou proteção completa contra abuso.

## 8. Envio de dúvidas e integração externa

### 8.1. Fluxo

1. O formulário coleta categoria, descrição, nome, contato e dispositivo.
2. O schema em src/schemas/questionSchema.js valida e normaliza os dados.
3. O frontend envia a requisição para POST /api/support.
4. api/support.js valida novamente no servidor.
5. O endpoint encaminha os dados para o Google Apps Script.
6. O Apps Script integra o processo de registro externo, documentado no projeto como integração com Google Sheets.

O campo honeypot utilizado pelo backend é website. A API também atende a funcionalidade de registro de pesquisa sem resultado.

### 8.2. Variáveis de ambiente

- GEMINI_API_KEY: chave privada para o Gemini, usada somente no backend.
- GEMINI_MODEL: modelo Gemini opcional.
- SUPPORT_APPS_SCRIPT_ENDPOINT: endpoint do Google Apps Script para atendimento e registro de pesquisas sem resultado.
- VERCEL_OIDC_TOKEN: variável presente no arquivo de exemplo do ambiente; não inventar nem publicar seu valor.

Os valores reais devem ficar em arquivos locais ignorados pelo Git ou nas configurações seguras do ambiente de hospedagem. Nunca copiar valores de ambiente para o AI_CONTEXT, README, logs públicos ou commits.

### 8.3. Limitações

A API de suporte também usa rate limit em memória, com limite declarado de 20 solicitações por janela de 10 minutos por IP. O armazenamento é de melhor esforço e não é distribuído. O endpoint possui limite de corpo de 10.000 bytes, validação de origem, timeout na comunicação externa e respostas sem cache.

Requisições sem Origin são aceitas pelo código atual. Não afirmar que a verificação de origem equivale a autenticação.

O envio depende da disponibilidade e configuração do Apps Script. Não prometer que formulários funcionam offline.

## 9. Ferramentas online e privacidade

O catálogo de ferramentas direciona o usuário a provedores externos de processamento de PDF e imagem. O Hauy Conecta não controla o processamento realizado nesses serviços.

Ao modificar a experiência das ferramentas:

- deixar clara a natureza externa do serviço;
- não prometer que os arquivos são processados localmente;
- não prometer políticas de retenção, exclusão ou privacidade que dependem do provedor;
- preservar links externos seguros e comportamento acessível.

O portal não exige login para consultar o conteúdo principal. Os dados dos tutoriais e categorias são mantidos em arquivos estáticos do projeto. As integrações externas devem ser descritas separadamente da aplicação frontend.

## 10. Acessibilidade, tema e experiência

A acessibilidade é tratada como recurso transversal.

Implementações identificadas:

- ajuste de escala do texto, com opções armazenadas localmente;
- alto contraste;
- redução de movimento;
- tema claro/escuro, considerando preferências armazenadas e do sistema;
- leitor de conteúdo que utiliza a API de síntese de voz do navegador quando disponível;
- estados de foco e controles semânticos;
- suporte a telas pequenas e navegação por computador;
- opção de reset das preferências de acessibilidade.

Arquivos centrais: src/components/AccessibilityMenu.jsx, src/components/AccessibilityFontSize.jsx, src/lib/accessibility.js e src/lib/accessibilityMotion.js.

O leitor depende das vozes e do suporte do navegador/dispositivo. Não prometer uma voz específica ou sotaque regional. Respeitar prefers-reduced-motion e a preferência explícita do usuário em novas animações.

## 11. SEO, pré-renderização e entrega

### 11.1. SEO por rota

src/lib/seo.js centraliza a manipulação de:

- título da página;
- meta description;
- Open Graph;
- Twitter Cards;
- canonical;
- JSON-LD.

As páginas relevantes configuram seus metadados conforme o conteúdo exibido.

### 11.2. Geração de rotas

scripts/generate-prerender-routes.mjs carrega os módulos de categorias e tutoriais por meio do Vite, monta as rotas públicas, gera prerender-routes.json e atualiza public/sitemap.xml.

### 11.3. Astratra e boot shell

astratra.prerender.config.cjs configura a pré-renderização com Astratra/Playwright e injeta a estrutura inicial do preloader no HTML gerado. src/main.jsx libera esse shell quando o preloader React está pronto, mantendo um fallback para não bloquear a aplicação indefinidamente.

Não alterar o boot shell, os seletores ou os marcadores sem entender a interação entre HTML pré-renderizado, React e preloader.

### 11.4. Build

O comando npm run build executa esta sequência:

1. scripts/generate-image-metadata.mjs;
2. scripts/generate-prerender-routes.mjs;
3. vite build;
4. astratra-prerender;
5. scripts/audit-images.mjs.

A lista exata de scripts npm é mantida no snapshot automatizado.

### 11.5. Publicação

O workflow .github/workflows/prerender.yml é responsável pela build e pré-renderização da branch main. Ele instala dependências, instala Chromium/Playwright, executa o build, remove o arquivo temporário de rotas e publica as alterações geradas em dist/ e public/sitemap.xml.

A Vercel publica o conteúdo já pré-renderizado de dist/. O vercel.json atual define esse diretório como saída e usa um comando que não refaz a pré-renderização na Vercel.

**Atenção:** dist/ é versionado no repositório e integra o fluxo de publicação. Não mudar essa estratégia sem revisar Actions, Vercel, pré-renderização e artefatos.

## 12. Analytics

O site possui integração com Google Analytics 4 declarada em index.html.

Em src/pages/Tutorial.jsx, o código registra os eventos:

- tutorial_begin: quando um tutorial é aberto, se a função gtag estiver disponível em produção;
- tutorial_complete: quando a navegação avança para a última etapa, se a função gtag estiver disponível em produção.

Os eventos incluem o ID e a categoria do tutorial. A telemetria não deve bloquear a leitura do conteúdo nem ser considerada requisito de funcionamento offline.

Não adicionar dados pessoais aos eventos.

## 13. Testes e validação

Comandos atualmente declarados no package.json incluem:

- npm run lint: ESLint;
- npm run test:search: testes Node da busca e da lógica de resposta do assistente;
- npm run build: build completo, pré-renderização e auditoria de imagens;
- npm run audit:images: auditoria de imagens no diretório gerado.

Antes de executar validações, confira os scripts e dependências atuais. Não assuma que o conjunto de testes permanece igual ao snapshot de uma revisão anterior.

O workflow `.github/workflows/validate-feat-ferramentas.yml` executa validações em pull requests direcionadas a `dev` e `main`, além de pushes nessas branches. O pipeline usa Node.js 24, instala dependências com `npm ci`, executa os testes unitários declarados, ESLint, instala Chromium/Playwright e roda `npm run build`, que inclui build Vite, pré-renderização Astratra e auditoria de imagens. O Lighthouse permanece em workflow separado e específico para a branch de ferramentas. Um workflow verde não substitui testes manuais de layout, navegação e uso em celular.

## 14. Estado atual do PWA

**Status: Fase 1 parcialmente implementada na branch feat/pwa; o PWA ainda não está liberado como funcionalidade de produção.**

A arquitetura e o histórico estão em docs/arquitetura-pwa-hauy-conecta.md. O código PWA fica isolado em src/pwa/ e os testes automatizados em tests/pwa/.

A implementação atual usa vite-plugin-pwa 2.0.0 com injectManifest e Workbox 7.4.1. O manifesto é definido em src/pwa/config/manifest.js; os ícones PNG são gerados de public/logo.svg por scripts/generate-pwa-icons.mjs antes de dev/build.

O Service Worker em src/pwa/service-worker/sw.js faz precache de JS, CSS, HTML, favicon, manifesto e ícones, com limite de 2 MiB por arquivo. Os caminhos de tutoriais e arquivos MP4 são excluídos. A navegação tenta a rede primeiro e usa o app shell quando a rede falha; public/offline.html é fallback final.

O registro e a atualização ficam em src/pwa/client/register-service-worker.js. A interface React usa src/pwa/ui/hooks/usePwaStatus.js e src/pwa/ui/components/PwaStatusBanner.jsx para sinalizar conexão, preparação offline e atualização disponível. A atualização é prompt: precisa de ação explícita da pessoa.

Scripts novos: npm run pwa:icons, npm run test:pwa:unit, npm run test:pwa:e2e e npm run test:pwa. O workflow Validate Hauy Conecta executa testes unitários antes do lint e testes E2E após build/prerender.

Validação realizada no sandbox Node 24: Vite build passou, ESLint passou com duas advertências preexistentes em ImageLightbox.jsx e useTutorialStepMedia.js, e quatro testes unitários PWA passaram. O build completo chegou à etapa Astratra, mas o sandbox remoto encerrou o Chromium; a execução E2E precisa ser confirmada no GitHub Actions/Ubuntu. Não declarar instalação ou uso offline validado até essa execução e um teste manual no preview.

Ainda não foram implementados cache runtime de imagens, pacotes offline por tutorial, IndexedDB, downloads ou vídeo offline. A decisão híbrida permanece: vídeos não entram no precache automático.
## 15. Limitações e cuidados conhecidos

1. **Rate limit serverless:** os Map de rate limit são locais à instância e não formam um controle distribuído.
2. **Verificação de origem:** APIs permitem requisições sem Origin; isso não é autenticação.
3. **Serviços externos:** Gemini, Apps Script, iLovePDF, iLoveIMG e plataformas de vídeo dependem de serviços de terceiros.
4. **Busca recente:** o histórico fica no localStorage do navegador, não em conta sincronizada.
5. **Pré-carregamento de mídia:** a preparação de mídia das etapas é em memória e limitada à sessão.
6. **Conteúdo estático:** mudanças em tutoriais e categorias exigem atualizar os dados versionados e regenerar as rotas pré-renderizadas.
7. **Pré-renderização:** a integração entre Vite, Astratra, Playwright, dist/ e Vercel é sensível à ordem do build.
8. **Mídia pesada:** revisar tamanho e formato dos vídeos e imagens antes de aumentar o acervo.
9. **Compatibilidade real:** testar em dispositivos e navegadores reais quando a tarefa envolver celular, acessibilidade, voz, mídia ou desempenho.
10. **Documentação:** arquivos técnicos podem ter sido escritos em revisões anteriores. Confirmar cada caminho, comando e comportamento no código atual.

## 16. Regras de manutenção de conteúdo e código

### Ao adicionar um tutorial

- Consultar docs/REGRAS-DOS-TUTORIAIS.md.
- Definir ID estável e único.
- Escolher categoria existente ou justificar a criação de nova categoria.
- Escrever título, descrição e etapas para pessoas iniciantes.
- Incluir texto alternativo útil nas imagens.
- Conferir caminhos de imagens, vídeos e pôsteres.
- Verificar busca, rota direta, página de categoria e pré-renderização.
- Executar testes e build pertinentes.
- Atualizar este contexto se a estrutura de dados ou comportamento mudar.

### Ao adicionar uma categoria

- Atualizar src/data/categories.js.
- Conferir ícone, descrição, slug/ID e uso na interface.
- Verificar os efeitos na busca e geração de rotas.

### Ao adicionar uma ferramenta

- Atualizar src/data/tools.js e, se necessário, src/data/toolProviders.js.
- Identificar claramente o provedor externo.
- Conferir URL, rótulo, categoria, filtros e comportamento em mobile.
- Preservar orientações de privacidade para serviços externos.

### Ao modificar APIs

- Validar novamente no servidor; não depender somente do frontend.
- Preservar limites de tamanho, timeout, respostas e tratamento de erro.
- Não expor segredo no cliente.
- Rever rate limiting, origem e dados enviados.
- Atualizar as regras e limitações documentadas.

### Ao modificar o pipeline

- Verificar geração de metadados, rotas, sitemap, Astratra, Playwright, auditoria, dist/, GitHub Actions e Vercel.
- Não remover etapas sem entender seus efeitos.
- Verificar o resultado gerado, não somente o comando isolado.

## 17. Documentação do projeto

Documentos de referência existentes:

- README.md — apresentação geral, execução e publicação.
- docs/DOCUMENTACAO_PRODUTO_HAUY_CONECTA.md — visão funcional e jornada do produto.
- docs/DOCUMENTACAO_PROJETO.md — arquitetura e manutenção técnica detalhadas; verificar a revisão de código citada no próprio documento.
- docs/REGRAS-DOS-TUTORIAIS.md — regras para criação e manutenção dos tutoriais.
- docs/GUIA-SVGICON-E-ICONS-DE-FERRAMENTAS.md — orientação de ícones/SVG.
- docs/TUTORIAIS_E_CATEGORIAS.json — referência estruturada de tutoriais e categorias.
- docs/MANIFESTO-MIDIAS-CURSOR.json — inventário/manifesto de mídia.
- docs/arquitetura-pwa-hauy-conecta.md — planejamento do PWA híbrido.
- docs/AI_CONTEXT.md — este contexto para IAs.

Em caso de divergência, verificar a implementação na branch/commit em análise e registrar a correção na documentação pertinente.

## 18. Como o AI_CONTEXT é mantido

Este arquivo possui duas partes com responsabilidades diferentes:

### Parte narrativa — manutenção humana/assistida

As seções 1 a 18 explicam propósito, comportamento, arquitetura, decisões, limitações e planos. A automação não consegue inferir com segurança a intenção de produto ou o motivo de uma decisão apenas observando um diff.

Quando um PR ou commit muda essas informações, a pessoa responsável ou a IA que executa a tarefa deve atualizar a parte narrativa no mesmo trabalho. Não reescrever o documento inteiro sem necessidade; alterar somente as seções afetadas, mantendo os estados e fatos corretos.

### Snapshot — manutenção automatizada

A seção delimitada pelos comentários HTML de início e fim é produzida por scripts/update-ai-context.mjs. O snapshot reúne informações objetivas do repositório, como commit de referência, branch, scripts npm, dependências, variáveis declaradas no .env.example (somente nomes), workflows, scripts de automação, diretórios e arquivos principais e histórico recente.

O workflow .github/workflows/ai-context.yml executa a sincronização:

- depois de pushes em branches;
- ao abrir, sincronizar ou reabrir PRs do mesmo repositório;
- sem criar um novo commit quando o snapshot já estiver atualizado;
- usando um commit de documentação criado pelo github-actions[bot].

No fluxo de PR, a sincronização utiliza o evento `pull_request` e só atualiza branches do próprio repositório; PRs originados de forks não recebem escrita automática. O gerador confiável é carregado da branch padrão do repositório, não da branch-base do PR. A sincronização também é ignorada quando a branch de origem é a própria branch padrão (`main`) ou quando o evento foi disparado pelo `github-actions[bot]`. Esse último controle evita que um commit automático do snapshot provoque uma nova sincronização que gere outro commit em sequência. Como pushes feitos com `GITHUB_TOKEN` podem colocar os workflows de `pull_request` subsequentes em estado de aprovação obrigatória, esses eventos do bot precisam ser aprovados manualmente para que as validações da PR sejam executadas.

**Importante:** a automação atualiza o snapshot técnico, não a narrativa semântica. Não presumir que o texto sobre funcionalidades e decisões mudou automaticamente só porque o GitHub Actions criou um commit.

## 19. Prioridades e evolução

A prioridade contínua é manter o portal simples, acessível e útil para a comunidade escolar.

Direções de evolução documentadas incluem:

- ampliar tutoriais de acordo com dúvidas reais;
- melhorar a descoberta de conteúdo e a busca;
- evoluir a experiência de ferramentas e tutoriais;
- continuar fortalecendo acessibilidade, SEO e desempenho;
- manter as integrações externas claras e seguras;
- planejar e validar a implementação do PWA híbrido em etapas.

Ideias futuras não devem ser registradas como compromissos nem funcionalidades existentes sem decisão explícita.

---

<!-- BEGIN AUTO-GENERATED SECTION -->

## Snapshot automatizado do repositório

> Gerado por scripts/update-ai-context.mjs. Não edite manualmente o conteúdo entre os marcadores.

- **Commit de referência:** 559f3ee9a433d8530379200b34e7325cc62424fe
- **Data do commit:** 2026-10-30T22:17:41-03:00
- **Mensagem do commit:** ci(pwa): limpar working tree antes do rebase
- **Branch desta execução:** feat/pwa
- **Projeto declarado:** helpe-center@0.0.0
- **Scripts npm:** 12
- **Dependências de runtime:** 16
- **Dependências de desenvolvimento:** 18
- **Workflows:** 4
- **Scripts de automação:** 7

### Scripts npm

| Comando | Definição |
|---|---|
| npm run dev | vite |
| npm run build | node scripts/generate-image-metadata.mjs && node scripts/generate-pwa-icons.mjs && node scripts/generate-prerender-routes.mjs && vite build && astratra-prerender && node scripts/audit-images.mjs |
| npm run audit:images | node scripts/audit-images.mjs |
| npm run lint | eslint . |
| npm run preview | vite preview |
| npm run predev | node scripts/generate-image-metadata.mjs && node scripts/generate-pwa-icons.mjs |
| npm run prelint | node scripts/generate-image-metadata.mjs |
| npm run test:search | node --test src/lib/searchTutorials.test.js src/lib/assistantResponse.test.js |
| npm run pwa:icons | node scripts/generate-pwa-icons.mjs |
| npm run test:pwa:unit | node --test tests/pwa/unit/*.test.js |
| npm run test:pwa:e2e | node --test tests/pwa/e2e/*.test.js |
| npm run test:pwa | npm run test:pwa:unit && npm run test:pwa:e2e |

### Variáveis declaradas no .env.example

> Somente os nomes são listados. Valores nunca são lidos nem publicados.

- GEMINI_API_KEY
- GEMINI_MODEL
- SUPPORT_APPS_SCRIPT_ENDPOINT
- VERCEL_OIDC_TOKEN

### Dependências de runtime

| Pacote | Versão declarada |
|---|---|
| @google/genai | ^2.24.0 |
| @gsap/react | ^2.1.2 |
| @radix-ui/react-accordion | ^1.2.20 |
| @radix-ui/react-dialog | ^1.1.23 |
| @radix-ui/react-select | ^2.3.7 |
| @radix-ui/react-slot | ^1.3.3 |
| @sketchyicons/react | ^0.5.0 |
| @thesvg/react | ^3.3.8 |
| clsx | ^2.1.1 |
| gsap | ^3.15.0 |
| lucide-react | ^1.47.0 |
| react | ^19.2.8 |
| react-dom | ^19.2.8 |
| react-router-dom | ^7.18.4 |
| tailwind-merge | ^3.7.0 |
| zod | ^4.6.5 |

### Dependências de desenvolvimento

| Pacote | Versão declarada |
|---|---|
| @astratra/prerender | ^0.2.0 |
| @eslint/js | ^10.0.1 |
| @tailwindcss/vite | ^4.3.3 |
| @types/react | ^19.2.18 |
| @types/react-dom | ^19.2.7 |
| @vitejs/plugin-react | ^6.1.1 |
| eslint | ^10.10.0 |
| eslint-plugin-react-hooks | ^7.1.1 |
| eslint-plugin-react-refresh | ^0.5.6 |
| globals | ^17.12.0 |
| playwright | ^1.63.0 |
| sharp | ^0.35.5 |
| tailwindcss | ^4.3.3 |
| vite | ^8.3.0 |
| vite-plugin-pwa | ^2.0.0 |
| workbox-core | ^7.4.1 |
| workbox-precaching | ^7.4.1 |
| workbox-routing | ^7.4.1 |

### Workflows do GitHub Actions

- .github/workflows/ai-context.yml — AI Context — Synchronize
- .github/workflows/lighthouse-feat-ferramentas.yml — Lighthouse feat/ferramentas
- .github/workflows/prerender.yml — Build prerendered site
- .github/workflows/validate-feat-ferramentas.yml — Validate Hauy Conecta

### Scripts de automação

- scripts/audit-images.mjs
- scripts/convert-section-images2.mjs
- scripts/convert-tutorial-images.mjs
- scripts/generate-image-metadata.mjs
- scripts/generate-prerender-routes.mjs
- scripts/generate-pwa-icons.mjs
- scripts/update-ai-context.mjs

### Arquivos de página

- src/pages/About.jsx
- src/pages/Assistente.jsx
- src/pages/Categories.jsx
- src/pages/Category.jsx
- src/pages/FAQ.jsx
- src/pages/Home2.jsx
- src/pages/NotFound.jsx
- src/pages/SendQuestion.jsx
- src/pages/Tools.jsx
- src/pages/Tutorial.jsx
- src/pages/Tutorials.jsx

### Endpoints serverless

- api/assistant.js
- api/support.js

### Diretórios principais de src/

- src/assets/
- src/components/
- src/data/
- src/docs/
- src/hooks/
- src/lib/
- src/pages/
- src/pwa/
- src/schemas/
- src/test/

### Oito commits recentes até o commit de referência

| Commit | Data | Mensagem |
|---|---|---|
| 559f3ee | 2026-10-30 | ci(pwa): limpar working tree antes do rebase |
| ee3563f | 2026-10-31 | docs(ai-context): atualizar snapshot automaticamente |
| f00dd2c | 2026-10-30 | ci(pwa): evitar conflito na publicação do dist |
| af94016 | 2026-10-31 | docs(ai-context): atualizar snapshot automaticamente |
| f1e60c8 | 2026-10-30 | ci(pwa): gerar dist na branch de preview |
| deba47e | 2026-10-30 | docs(ai-context): atualizar snapshot do pull request |
| 8a0a6d8 | 2026-10-30 | chore(pwa): sincronizar lockfile e documentação |
| 634d0f9 | 2026-10-30 | docs(ai-context): atualizar snapshot automaticamente |

<!-- END AUTO-GENERATED SECTION -->
