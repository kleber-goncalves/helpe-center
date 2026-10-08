# Hauy Conecta — Documentação completa do projeto

**Fonte desta documentação:** código atual da branch **feat/ferramentas**, complementado pelo README.md e pelos documentos técnicos existentes em src/docs/.

**Estado verificado:** commit 8905370698041b8d8a38e186aa39cb03ca6b985c

- Validate #79: sucesso
- Lighthouse #37: sucesso

Site: https://hauy-conecta.vercel.app/

Repositório: https://github.com/kleber-goncalves/helpe-center

---

# 1. O que é o Hauy Conecta?

O Hauy Conecta é a Central de Ajuda Digital da Escola Estadual Hauy Petrucely Mairync.

O projeto foi criado para transformar dúvidas tecnológicas do cotidiano escolar em orientações claras, acessíveis e práticas.

A ideia central é:

~~~text
PESQUISAR → ENCONTRAR → APRENDER → RESOLVER
~~~

O portal não foi pensado apenas como um site institucional. Ele funciona como uma pequena plataforma de apoio educacional.

O usuário pode:

- procurar tutoriais;
- navegar por categorias;
- seguir tutoriais passo a passo;
- ver imagens e vídeos;
- ampliar imagens dos tutoriais;
- consultar o FAQ;
- acessar ferramentas externas para PDF e imagens;
- enviar uma dúvida;
- usar o Assistente Hauy;
- alterar preferências de acessibilidade;
- alternar entre tema claro e escuro.

Não é necessário criar uma conta para navegar pelos conteúdos.

---

# 2. A arquitetura em linguagem simples

Para entender o projeto, pense nele como quatro grupos.

~~~text
FRONTEND
React + componentes + páginas
        ↓
DADOS
tutoriais + categorias + FAQ + ferramentas
        ↓
BACKEND
api/assistant.js + api/support.js
        ↓
ENTREGA
GitHub Actions + pré-render + Vercel
~~~

## Frontend

É o que o visitante vê no navegador.

Fica principalmente em:

~~~text
src/
~~~

## Dados

O conteúdo fica separado da interface.

Exemplos:

~~~text
src/data/tutorials.js
src/data/categories.js
src/data/faq.js
src/data/tools.js
~~~

## Backend

São funções executadas no servidor.

Ficam em:

~~~text
api/
~~~

## Entrega

É o processo que transforma o código em uma versão publicada.

Inclui:

~~~text
lint → build → pré-render → auditoria → dist → Vercel
~~~

---

# 3. Tecnologias utilizadas

## React

Constrói a interface com componentes reutilizáveis.

## JavaScript e JSX

O projeto principal utiliza JavaScript e JSX.

**Não existe TypeScript na arquitetura principal.**

## Vite

Responsável pelo ambiente de desenvolvimento e pelo build do frontend.

## Tailwind CSS

Responsável pela maior parte da estilização.

## React Router

Responsável pelas rotas e pela navegação entre páginas.

## GSAP

Responsável pelas animações.

Também existe a integração:

~~~text
@gsap/react
~~~

## Lucide React

Fornece ícones funcionais.

## SketchyIcons

Usado em partes da identidade visual ilustrativa.

## @thesvg/react

Usado em alguns SVGs e ícones específicos.

## Radix UI

Fornece primitivas acessíveis usadas nos componentes de interface.

## Zod

Valida dados do formulário no backend.

## Google GenAI

Usado pelo Assistente Hauy.

## Sharp

Processa imagens durante o build.

## Playwright

Fornece o navegador usado na pré-renderização.

## Astratra Prerender

Gera HTML pré-renderizado das páginas.

## GitHub Actions

Automatiza validação, build, pré-render e Lighthouse.

## Vercel

Publica o conteúdo final.

---

# 4. Estrutura do repositório

A estrutura importante do projeto é:

~~~text
helpe-center/
│
├── api/
│   ├── assistant.js
│   └── support.js
│
├── public/
│   ├── category.webp
│   ├── favicon.ico
│   ├── form-result.html
│   ├── iloveIMG.svg
│   ├── ilovePDF.svg
│   ├── logo.svg
│   ├── preview.png
│   ├── preview2.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── tutoriais/
│
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── docs/
│   ├── generated/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   └── schemas/
│
├── scripts/
│   ├── audit-images.mjs
│   ├── convert-section-images2.mjs
│   ├── convert-tutorial-images.mjs
│   ├── generate-image-metadata.mjs
│   └── generate-prerender-routes.mjs
│
├── .github/
│   └── workflows/
│       ├── lighthouse-feat-ferramentas.yml
│       ├── prerender.yml
│       └── validate-feat-ferramentas.yml
│
├── astratra.prerender.config.cjs
├── eslint.config.js
├── index.html
├── lighthouserc.json
├── package.json
├── package-lock.json
├── prerender-routes.json
├── vercel.json
├── vite.config.js
└── README.md
~~~

---

# 5. Os três lugares mais importantes para começar

Para uma pessoa iniciante, comece por estes arquivos:

## 5.1 src/main.jsx

É o ponto de entrada.

Ele:

1. inicializa acessibilidade;
2. carrega o CSS;
3. cria o root do React;
4. monta o App;
5. libera o boot shell criado no pré-render.

## 5.2 src/App.jsx

É o centro da aplicação.

Ele:

- cria o BrowserRouter;
- define as rotas;
- monta o Header;
- monta o Footer;
- monta o painel de acessibilidade;
- monta o Assistente global;
- controla o preloader;
- usa lazy loading para várias páginas.

## 5.3 src/data/tutorials.js

É a principal fonte de conteúdo educacional.

Se você quiser alterar um tutorial, normalmente começa aqui.

---

# 6. Como o App é montado

A estrutura geral é:

~~~text
App
└── BrowserRouter
    └── AppContent
        ├── Preloader
        ├── ScrollToTop
        ├── Header
        ├── AccessibilityMenu
        ├── ButtonReset
        ├── HauyAssistantWidget
        ├── Routes
        └── Footer
~~~

A ideia é separar a estrutura global da página específica.

---

# 7. Rotas atuais

As rotas declaradas em src/App.jsx são:

| Rota | Função |
| --- | --- |
| / | Página inicial |
| /categorias | Lista de categorias |
| /categorias/:categoryId | Categoria específica |
| /tutoriais | Biblioteca de tutoriais |
| /tutoriais/:tutorialId | Tutorial específico |
| /ferramentas | Ferramentas externas |
| /faq | Perguntas frequentes |
| /sobre | Sobre o projeto |
| /enviar-duvida | Envio de dúvida |
| /assistente | Assistente Hauy |
| * | Página 404 |

A parte :categoryId e :tutorialId significa que o valor muda conforme a URL.

Exemplo:

~~~text
/tutoriais/comecar-usar-excel
~~~

Nesse caso o tutorialId é:

~~~text
comecar-usar-excel
~~~

---

# 8. Code splitting

Várias páginas são carregadas com React.lazy.

Isso significa que o código da página é baixado quando necessário.

Exemplo conceitual:

~~~text
usuário entra no site
        ↓
App carrega
        ↓
usuário abre Tutoriais
        ↓
código de Tutoriais é carregado
~~~

Enquanto a página está sendo baixada aparece um fallback:

~~~text
Carregando...
~~~

Isso evita mandar todo o código de todas as páginas para o navegador logo no início.

---

# 9. Páginas

## Home2.jsx

Página inicial.

Mostra:

- apresentação;
- busca;
- categorias;
- assuntos prioritários;
- chamadas para conteúdo.

Título atual:

~~~text
Olá, como podemos ajudar?
~~~

## Categories.jsx

Lista as categorias.

## Category.jsx

Exibe uma categoria individual.

Usa useParams para pegar categoryId.

## Tutorials.jsx

É a biblioteca de tutoriais.

É responsável por:

- pesquisa;
- resultados;
- estado sem resultados;
- registro de pesquisas sem resultado;
- navegação para tutoriais;
- chamada para envio de nova dúvida.

## Tutorial.jsx

É a página individual do tutorial.

É responsável por:

- identificar o tutorial;
- identificar a categoria;
- controlar activeStep;
- mostrar o passo atual;
- navegar entre passos;
- mostrar conclusão;
- mostrar recomendações externas;
- mostrar tutoriais relacionados;
- configurar SEO do tutorial.

## Tools.jsx

Página de ferramentas externas.

Atualmente possui 23 ferramentas e dois provedores principais:

~~~text
iLovePDF
iLoveIMG
~~~

Permite pesquisar e filtrar as ferramentas.

## FAQ.jsx

Mostra o conteúdo de src/data/faq.js.

## About.jsx

Explica o projeto, o processo, a pesquisa e a equipe.

## SendQuestion.jsx

Apresenta a área de envio de dúvidas.

## Assistente.jsx

Página completa do Assistente Hauy.

## NotFound.jsx

Página 404 personalizada.

---

# 10. Categorias

Arquivo:

~~~text
src/data/categories.js
~~~

Existem atualmente oito categorias:

~~~text
Word
Excel
E-mail
Arquivos e PDF
Google Drive
Canva
Plataformas da Escola
Informática Básica
~~~

O mesmo arquivo possui priorityTopics, que representa assuntos que merecem destaque.

---

# 11. Tutoriais atuais

Arquivo:

~~~text
src/data/tutorials.js
~~~

Existem oito tutoriais ativos:

| ID | Título |
| --- | --- |
| comecar-usar-excel | Como começar a usar o Excel |
| formatar-trabalho-word | Como formatar um trabalho no Word |
| sumario-automatico-word | Como criar um sumário automático no Word |
| compartilhar-arquivo | Como compartilhar um arquivo |
| converter-documento-pdf | Como converter um documento para PDF |
| anexar-arquivo-email | Como anexar um arquivo no e-mail |
| salvar-google-drive | Como salvar um arquivo no Google Drive |
| apresentacao-canva | Como criar uma apresentação no Canva |

---

# 12. Como funciona um tutorial

Um tutorial tem uma estrutura parecida com:

~~~js
{
    id: "exemplo",
    title: "Título",
    category: "word",
    difficulty: "Fácil",
    duration: "5 minutos",
    description: "Resumo",
    externalLearning: [],
    keywords: [],
    learning: [],
    steps: []
}
~~~

## id

Identificador usado na URL.

## title

Título mostrado para o usuário.

## category

Relaciona o tutorial com uma categoria.

## difficulty

Nível de dificuldade.

## duration

Tempo aproximado para concluir.

## description

Resumo.

## externalLearning

Lista de vídeos ou playlists externos recomendados no final.

## keywords

Termos utilizados pelo mecanismo de busca.

## learning

Objetivos do tutorial.

## steps

Passos detalhados.

---

# 13. Estrutura dos steps

Cada step pode possuir:

~~~js
{
    title: "Abra o programa",
    description: "Explicação...",
    examples: [],
    tip: "Dica...",
    video: null,
    poster: null
}
~~~

Um exemplo pode possuir imagem:

~~~js
{
    title: "Tela inicial",
    description: "Escolha esta opção.",
    image: "/tutoriais/exemplo/passo-1.webp",
    alt: "Tela inicial do programa."
}
~~~

Ou vídeo:

~~~js
{
    title: "Selecionar opção",
    description: "Clique na opção.",
    image: null,
    video: "/tutoriais/exemplo/passo-2.mp4",
    poster: "/tutoriais/exemplo/passo-2-poster.webp"
}
~~~

---

# 14. Como o TutorialStep funciona

Arquivo:

~~~text
src/components/TutorialStep.jsx
~~~

Esse componente:

1. recebe um step;
2. chama useTutorialStepMedia;
3. espera as mídias;
4. mostra TutorialStepPreloader;
5. depois renderiza o conteúdo.

O importante é que o componente mostra **o passo atual**, e não uma página gigante com todos os passos renderizados ao mesmo tempo.

---

# 15. Preload de mídias dos tutoriais

Arquivo:

~~~text
src/hooks/useTutorialStepMedia.js
~~~

Esse hook carrega somente as mídias do passo atual.

Ele usa:

~~~text
completedMedia
pendingMedia
~~~

completedMedia guarda mídias que já terminaram.

pendingMedia guarda carregamentos que ainda estão acontecendo.

Isso permite reutilizar mídia quando o usuário volta para um passo.

Existe também:

~~~text
MIN_LOADING_TIME = 1500
~~~

O preloader do passo permanece por pelo menos aproximadamente 1,5 segundo.

**Não substitua esse sistema por um preload de todos os tutoriais.**

A arquitetura foi feita justamente para evitar esse custo.

---

# 16. Imagens otimizadas

Arquivo:

~~~text
src/components/OptimizedImage.jsx
~~~

Ele utiliza metadata gerada automaticamente.

Pode obter:

- largura;
- altura;
- placeholder;
- versões responsivas;
- srcSet;
- sizes.

Isso ajuda a reduzir mudanças de layout e entregar uma imagem adequada ao tamanho da tela.

---

# 17. Geração dos metadados

Arquivo:

~~~text
scripts/generate-image-metadata.mjs
~~~

Ele analisa imagens de src/assets e public.

Gera:

~~~text
src/generated/imageMetadata.json
~~~

e versões responsivas em:

~~~text
public/_optimized/
~~~

As larguras consideradas pelo script são:

~~~text
320
480
640
768
1024
1440
1920
~~~

quando cabível.

Os diretórios generated e public/_optimized estão no .gitignore.

Não edite os arquivos gerados manualmente.

---

# 18. Auditoria das imagens

Arquivo:

~~~text
scripts/audit-images.mjs
~~~

Depois do build, o script examina o HTML em dist.

Em condições normais, ele exige:

~~~text
width
height
alt
~~~

Essa verificação ajuda a manter:

- estabilidade visual;
- acessibilidade;
- qualidade do HTML pré-renderizado.

---

# 19. Lightbox das imagens

Arquivo:

~~~text
src/components/ImageLightbox.jsx
~~~

É responsável pelo comportamento:

~~~text
imagem normal
      ↓
clique
      ↓
imagem ampliada
      ↓
botão X ao lado
~~~

O usuário pode clicar na imagem ou no restante da área do container que envolve a imagem.

Também existe um ícone de ampliação sobre a imagem.

---

# 20. Animação do Lightbox

O Lightbox usa GSAP.

Ao abrir:

~~~text
opacidade baixa + escala menor
           ↓
opacidade normal + escala 1
~~~

Ao fechar:

~~~text
escala 1
   ↓
escala menor + desaparecimento
~~~

O botão de fechar participa da animação.

O componente também usa useReducedMotion para reduzir ou evitar a animação quando necessário.

---

# 21. Vídeos

Arquivos importantes:

~~~text
src/components/TutorialVideo.jsx
src/components/OptimizedVideo.jsx
~~~

O vídeo utiliza:

- poster;
- width;
- height;
- controls;
- playsInline;
- preload;
- track de captions quando fornecido.

O poster também pode fornecer dimensões ao componente.

---

# 22. Componentes de interface

Arquivo principal:

~~~text
src/components/ui.jsx
~~~

Componentes disponíveis incluem:

~~~text
Button
Card
Badge
Separator
Input
Textarea
Field
FieldGroup
FieldLabel
FieldDescription
FieldError
Select
SelectValue
SelectTrigger
SelectContent
SelectItem
Accordion
AccordionItem
AccordionTrigger
AccordionContent
Sheet
SheetTrigger
SheetTitle
SheetDescription
SheetClose
SheetContent
~~~

A ideia é não criar estilos totalmente diferentes para o mesmo tipo de controle em cada página.

---

# 23. Header

O componente:

~~~text
src/components/Header.jsx
~~~

decide entre:

~~~text
DesktopNavbar
MobileHeader
~~~

com base no tamanho da tela.

## DesktopNavbar

Possui:

- navegação;
- estado ativo;
- menu Mais;
- tema;
- botão Precisa de ajuda?;
- animação no scroll.

A navbar pode se transformar em uma pequena barra flutuante conforme a rolagem.

## MobileHeader

Possui:

- menu lateral;
- navegação;
- acessibilidade;
- tema;
- botão de ajuda.

O ícone do menu também usa GSAP.

---

# 24. Busca

Arquivo principal:

~~~text
src/lib/searchTutorials.js
~~~

A busca não compara apenas uma igualdade simples.

Ela normaliza o texto e calcula uma pontuação.

A prioridade atual inclui:

| Correspondência | Pontos |
| --- | ---: |
| frase no título | 100 |
| frase em keyword | 70 |
| frase na descrição | 40 |
| frase na categoria | 30 |
| palavra no título | 25 |
| palavra em keyword | 18 |
| palavra na descrição | 8 |
| palavra na categoria | 6 |

O sistema separa resultados em:

~~~text
relevant
related
none
~~~

relevant significa correspondência forte.

related significa correspondência parcial útil.

none significa que o conteúdo não deve aparecer.

---

# 25. Busca sem resultado

Quando não há um tutorial útil, a página de Tutoriais pode registrar a busca.

O frontend utiliza:

~~~text
/api/support
~~~

com:

~~~text
type=search-no-result
~~~

O objetivo é descobrir novas necessidades da comunidade escolar.

---

# 26. Assistente Hauy

Componentes:

~~~text
src/components/HauyAssistant.jsx
src/components/HauyAssistantWidget.jsx
~~~

Backend:

~~~text
api/assistant.js
~~~

A busca usada pelo Assistente vem de:

~~~text
src/lib/searchTutorials.js
~~~

O fluxo é:

~~~text
usuário
   ↓
HauyAssistant
   ↓
POST /api/assistant
   ↓
validação
   ↓
busca local
   ↓
até 3 tutoriais relevantes
   ↓
contexto
   ↓
Gemini
   ↓
resposta
~~~

---

# 27. Regras do Assistente

O prompt do servidor orienta o modelo a:

- responder em português do Brasil;
- considerar que o usuário pode ser iniciante;
- ser simples e objetivo;
- usar os conteúdos encontrados como fonte principal;
- não inventar tutoriais;
- não inventar etapas ausentes;
- não pedir informações pessoais para responder;
- informar quando a Central não possui conteúdo suficiente;
- evitar tabelas;
- evitar emojis.

---

# 28. Limites do Assistente

A API possui atualmente:

~~~text
body máximo: 10.000 bytes
mensagem máxima: 1.000 caracteres
contexto: até 3 tutoriais
rate limit: 20 solicitações / 10 minutos / IP
~~~

As respostas usam:

~~~text
Cache-Control: no-store
X-Content-Type-Options: nosniff
~~~

---

# 29. Rate limit

A implementação utiliza Map em memória.

Isso é uma proteção de melhor esforço.

Em serverless, diferentes execuções podem ocorrer em instâncias diferentes.

Portanto:

> esse rate limit não é uma proteção distribuída e absoluta.

Para uma aplicação de escala maior, seria necessário um mecanismo compartilhado.

---

# 30. Envio de dúvidas

Os arquivos mais importantes são:

~~~text
src/components/QuestionForm.jsx
src/schemas/questionSchema.js
api/support.js
~~~

O formulário possui os campos principais:

~~~text
category
message
name
contact
device
~~~

---

# 31. Validação com Zod

O schema valida:

- categoria válida;
- mensagem entre 10 e 2000 caracteres;
- quantidade suficiente de letras;
- ausência de repetição abusiva;
- nome válido;
- contato válido;
- dispositivo válido.

Dispositivos aceitos:

~~~text
Computador
Celular
Tablet
Não sei informar
~~~

---

# 32. Por que validar duas vezes?

A validação do frontend melhora a experiência do usuário.

Mas o backend não pode confiar apenas no navegador.

Por isso o servidor também executa:

~~~js
questionSchema.safeParse(...)
~~~

A ideia é:

~~~text
frontend valida para o usuário
        +
backend valida para segurança/consistência
~~~

---

# 33. Apps Script

O endpoint support encaminha os dados para o:

~~~text
SUPPORT_APPS_SCRIPT_ENDPOINT
~~~

O Apps Script pode então registrar as informações no sistema utilizado pelo projeto, incluindo Google Sheets.

Existe documentação mais detalhada sobre esse fluxo em:

~~~text
src/docs/hauy_conecta_arquitetura_validacao.md
~~~

---

# 34. Honeypot

O formulário possui o campo:

~~~text
website
~~~

Esse campo fica escondido.

Bots simples que o preencham podem ser filtrados.

É uma camada complementar, não uma proteção absoluta.

---

# 35. Acessibilidade

Principais recursos:

- tamanho do texto;
- alto contraste;
- redução de movimento;
- leitor de conteúdo;
- foco visível;
- atributos ARIA;
- suporte a teclado.

Arquivo de inicialização:

~~~text
src/lib/accessibility.js
~~~

Arquivo de movimento:

~~~text
src/lib/accessibilityMotion.js
~~~

---

# 36. Tamanho da fonte

As escalas atuais são:

~~~text
small  → 1
medium → 1.15
large  → 1.3
~~~

A preferência é aplicada na variável:

~~~text
--accessibility-font-scale
~~~

e armazenada no localStorage.

---

# 37. Redução de movimento

A aplicação considera:

1. preferência salva pelo usuário;
2. preferência do navegador/sistema.

A função:

~~~text
shouldReduceMotion()
~~~

combina as duas.

Componentes com animação utilizam:

~~~js
useReducedMotion()
~~~

para decidir como se comportar.

---

# 38. Leitor de página

O AccessibilityMenu utiliza a API de síntese de voz do navegador.

O fluxo é:

~~~text
texto
 ↓
preparação
 ↓
divisão em blocos
 ↓
voz do navegador
 ↓
SpeechSynthesisUtterance
 ↓
leitura
~~~

---

# 39. Tema claro e escuro

O componente principal é:

~~~text
src/components/ThemeToggle.jsx
~~~

A escolha fica no localStorage usando a chave:

~~~text
theme
~~~

O tema é aplicado por meio da classe:

~~~html
<html class="dark">
~~~

O estado inicial também pode considerar a preferência do sistema.

---

# 40. Identidade visual

O arquivo principal é:

~~~text
src/App.css
~~~

A paleta utiliza tokens como:

~~~text
ink
muted-ink
paper
mist
mist2
mist3
line
coral
coral-soft
background
foreground
~~~

As fontes principais são:

~~~text
Nunito
Source Sans 3
~~~

A interface procura manter uma estética:

- acolhedora;
- educacional;
- editorial;
- simples;
- com pouco ruído.

---

# 41. SEO

Arquivo:

~~~text
src/lib/seo.js
~~~

Centraliza operações de:

- title;
- meta description;
- Open Graph;
- Twitter Card;
- canonical;
- JSON-LD.

Cada página pode configurar seus próprios metadados.

---

# 42. Pré-renderização

O projeto usa:

~~~text
Astratra + Playwright
~~~

para gerar HTML das rotas.

O script que cria a lista de rotas é:

~~~text
scripts/generate-prerender-routes.mjs
~~~

Ele consulta os dados de:

~~~text
src/data/categories.js
src/data/tutorials.js
~~~

e gera rotas de categorias e tutoriais.

---

# 43. Boot shell

O arquivo:

~~~text
astratra.prerender.config.cjs
~~~

adiciona um shell de carregamento ao HTML.

A finalidade é evitar mostrar conteúdo pré-renderizado antes que o React esteja pronto.

Em main.jsx, quando o Preloader React existe, esse shell é removido.

Existe também um fallback para impedir que o site fique permanentemente bloqueado caso o preloader não seja encontrado.

---

# 44. Build completo

O comando:

~~~bash
npm run build
~~~

executa:

~~~text
generate-image-metadata.mjs
        ↓
generate-prerender-routes.mjs
        ↓
vite build
        ↓
astratra-prerender
        ↓
audit-images.mjs
~~~

Cada etapa tem uma responsabilidade específica.

---

# 45. Scripts npm

| Comando | Finalidade |
| --- | --- |
| npm run dev | ambiente de desenvolvimento |
| npm run build | build completo |
| npm run lint | ESLint |
| npm run preview | testa a build localmente |
| npm run audit:images | auditoria de imagens |
| npm run predev | metadata antes do dev |
| npm run prelint | metadata antes do lint |

---

# 46. Como executar localmente

## 1. Clonar

~~~bash
git clone https://github.com/kleber-goncalves/helpe-center.git
cd helpe-center
~~~

## 2. Instalar

~~~bash
npm install
~~~

## 3. Configurar ambiente

Crie:

~~~text
.env.local
~~~

## 4. Iniciar

~~~bash
npm run dev
~~~

## 5. Abrir

~~~text
http://localhost:5173
~~~

---

# 47. Variáveis de ambiente

O .env.example atual contém:

~~~env
SUPPORT_APPS_SCRIPT_ENDPOINT=
VERCEL_OIDC_TOKEN=
GEMINI_API_KEY=
GEMINI_MODEL=
~~~

Nunca coloque uma chave real diretamente no código.

Em especial:

~~~text
GEMINI_API_KEY
~~~

deve existir somente no ambiente do servidor.

---

# 48. GitHub Actions

Há três workflows.

## validate-feat-ferramentas.yml

Executa na branch:

~~~text
feat/ferramentas
~~~

Faz:

1. checkout;
2. Node 24;
3. npm ci;
4. Playwright;
5. lint;
6. build/prerender.

## lighthouse-feat-ferramentas.yml

Executa na mesma branch e roda Lighthouse nas páginas configuradas.

## prerender.yml

Executa na main e gera a versão pré-renderizada de produção.

---

# 49. Concorrência dos Actions

Os workflows utilizam:

~~~yaml
cancel-in-progress: true
~~~

Portanto uma sequência como esta é normal:

~~~text
commit A → Action inicia
commit B → Action novo inicia
commit A → pode ser cancelado
commit B → continua
~~~

Por isso, quando um run aparece como cancelled, sempre confira primeiro o commit mais recente.

---

# 50. Lighthouse

Arquivo:

~~~text
lighthouserc.json
~~~

Hoje ele analisa pelo menos:

- performance;
- LCP;
- CLS;
- TBT;
- SEO;
- document title;
- html lang;
- meta description;
- canonical.

As regras de performance utilizam warn.

Algumas regras estruturais usam error.

Portanto:

~~~text
warning ≠ necessariamente falha
~~~

---

# 51. Vercel

Arquivo:

~~~text
vercel.json
~~~

A configuração indica que a Vercel publica:

~~~text
dist/
~~~

e usa um build command simplificado porque a geração pesada já foi feita pelo processo do projeto.

A ideia é evitar repetir o pré-render com Playwright na etapa de publicação.

---

# 52. Fluxo de produção

O ciclo pode ser visualizado assim:

~~~text
alteração no código
       ↓
git push
       ↓
GitHub Actions
       ↓
npm ci
       ↓
npm run build
       ↓
pré-render
       ↓
dist/
       ↓
produção
       ↓
Vercel
~~~

---

# 53. Como adicionar um novo tutorial

1. Abra src/data/tutorials.js.
2. Crie um novo objeto de tutorial.
3. Escolha uma category existente.
4. Crie um id único.
5. Adicione keywords.
6. Adicione learning.
7. Adicione steps.
8. Coloque imagens e vídeos em public/tutoriais/.
9. Preencha os alt das imagens.
10. Rode lint e build.

Exemplo mínimo:

~~~js
{
    id: "como-usar-powerpoint",
    title: "Como usar o PowerPoint",
    category: "informatica-basica",
    difficulty: "Fácil",
    icon: SignalLow,
    duration: "5 minutos",
    description: "Aprenda os primeiros passos.",
    externalLearning: [],
    keywords: ["powerpoint", "apresentação", "slides"],
    learning: [
        "Abrir o PowerPoint",
        "Criar uma apresentação"
    ],
    steps: [
        {
            title: "Abra o PowerPoint",
            description: "Abra o programa.",
            examples: [],
            tip: "Confirme se abriu o programa correto.",
            video: null
        }
    ]
}
~~~

---

# 54. Como adicionar uma imagem

Coloque o arquivo em:

~~~text
public/tutoriais/
~~~

Depois use:

~~~js
image: "/tutoriais/powerpoint/passo-1.webp"
~~~

Sempre adicione:

~~~js
alt: "Descrição clara do que a imagem mostra."
~~~

Não edite imageMetadata.json manualmente.

---

# 55. Como adicionar vídeo

Exemplo:

~~~js
video: "/tutoriais/powerpoint/passo-1.mp4",
poster: "/tutoriais/powerpoint/passo-1-poster.webp"
~~~

O poster deve existir e preferencialmente ter dimensões corretas para a mídia.

---

# 56. Como adicionar recomendação externa

Exemplo:

~~~js
externalLearning: [
    {
        type: "video",
        title: "Nome da videoaula",
        description: "Descrição curta.",
        url: "https://www.youtube.com/watch?v=..."
    }
]
~~~

Também existe:

~~~text
type: "playlist"
~~~

A interface de conclusão usa esses dados para criar a recomendação.

---

# 57. Como adicionar uma ferramenta

Arquivo:

~~~text
src/data/tools.js
~~~

Estrutura:

~~~js
{
    id: "exemplo",
    name: "Nome",
    category: "PDF",
    description: "Descrição",
    provider: "iLovePDF",
    href: "https://...",
    icon: FileOutput,
    featured: false
}
~~~

Se o provedor ainda não existir, confira:

~~~text
src/data/toolProviders.js
~~~

---

# 58. Como adicionar FAQ

Arquivo:

~~~text
src/data/faq.js
~~~

Formato:

~~~js
{
    question: "Pergunta?",
    answer: "Resposta."
}
~~~

---

# 59. Como adicionar uma categoria

Arquivo:

~~~text
src/data/categories.js
~~~

Depois de criar uma categoria, confira:

- tutoriais;
- busca;
- página de categoria;
- navegação;
- pré-render;
- SEO.

Uma categoria nova não deve existir apenas nos dados se o restante do sistema não souber utilizá-la.

---

# 60. Regras para manutenção

## Conteúdo

Conteúdo grande deve ficar em src/data/.

## Componentes

Interface reutilizável deve ficar em src/components/.

## Hooks

Comportamento reutilizável deve ir para src/hooks/.

## Funções auxiliares

Lógica independente de interface deve ir para src/lib/.

## Backend

Código executado no servidor deve ficar em api/.

## Scripts

Automação de build e processamento deve ficar em scripts/.

---

# 61. O que não editar manualmente

Evite editar diretamente:

~~~text
src/generated/
public/_optimized/
dist/
~~~

Esses itens são derivados do código-fonte ou do processo de build.

A fonte de verdade está nos arquivos de código, dados e configurações.

---

# 62. Erro comum: editar generated

Se uma informação em imageMetadata.json estiver errada, não corrija o JSON manualmente.

Corrija a origem ou o script:

~~~text
scripts/generate-image-metadata.mjs
~~~

e gere novamente.

---

# 63. Erro comum: confiar somente no frontend

Não use validação do React como única proteção.

A pessoa pode enviar requisições sem utilizar o formulário.

Por isso o backend valida novamente.

---

# 64. Erro comum: preload de tudo

Não transforme useTutorialStepMedia em um sistema que carregue todas as imagens e vídeos de todos os tutoriais logo na entrada.

Isso aumentaria o consumo e poderia prejudicar dispositivos mais fracos.

O sistema atual foi desenhado para trabalhar por passo.

---

# 65. Erro comum: ignorar reduced motion

Qualquer nova animação em GSAP ou CSS deve considerar:

~~~text
useReducedMotion()
~~~

ou os mecanismos de reduced motion existentes no projeto.

---

# 66. Erro comum: alterar o layout sem testar celular

Uma boa parte do público pode acessar o portal pelo celular.

Ao alterar:

- navbar;
- tutorial;
- imagem;
- modal;
- filtros;
- formulário;

teste também em largura pequena.

---

# 67. Imagens dos tutoriais: arquitetura completa

A imagem segue esta cadeia:

~~~text
tutorials.js
      ↓
TutorialStep
      ↓
ImageLightbox
      ↓
OptimizedImage
      ↓
imageMetadata
      ↓
arquivo public/
~~~

Isso explica por que uma alteração na forma de renderizar imagem pode afetar:

- preload;
- dimensões;
- acessibilidade;
- Lighthouse;
- Lightbox.

---

# 68. Formulário: arquitetura completa

~~~text
QuestionForm
      ↓
api/support.js
      ↓
questionSchema
      ↓
Apps Script
      ↓
Google Sheets
~~~

O frontend melhora a experiência.

O backend garante a validação do lado do servidor.

---

# 69. Assistente: arquitetura completa

~~~text
HauyAssistant
      ↓
api/assistant.js
      ↓
searchTutorialsWithRelevance()
      ↓
top 3 tutoriais relevantes
      ↓
Gemini
      ↓
resposta
~~~

---

# 70. SEO: arquitetura completa

~~~text
dados
 ↓
página React
 ↓
seo.js
 ↓
metadados
 ↓
pré-render
 ↓
HTML final
~~~

---

# 71. Imagens: arquitetura de performance

~~~text
imagem original
      ↓
Sharp
      ↓
metadata
      +
placeholder
      +
variantes responsivas
      ↓
OptimizedImage
      ↓
navegador
~~~

---

# 72. Estado atual dos conteúdos

A análise da branch atual encontrou aproximadamente:

~~~text
8 tutoriais ativos
61 referências de imagens locais nos dados
18 referências de vídeo local nos dados
23 ferramentas externas
8 categorias
8 recomendações externalLearning
~~~

Esses números podem mudar naturalmente quando novos conteúdos forem adicionados.

---

# 73. Observações encontradas durante a análise

A documentação do README continua sendo importante, mas alguns trechos representam uma versão anterior do projeto.

Entre as diferenças:

- a árvore do README ainda possui uma estrutura antiga de componentes;
- o projeto atual possui src/components/ui.jsx;
- o logo atual é public/logo.svg;
- existem APIs e componentes atuais que não aparecem na árvore antiga do README;
- o Lightbox de imagens é mais recente que parte da documentação original.

Por isso esta documentação usa o código atual como referência principal.

---

# 74. Atenção ao prerender-routes.json

O arquivo atualmente versionado ainda apresenta referências a:

~~~text
/tutoriais/digitalizar-documento
/tutoriais/imprimir-documento
~~~

Esses tutoriais não estão entre os oito tutoriais ativos de src/data/tutorials.js.

O script de geração atual usa os dados atuais para criar as rotas.

Portanto, não use prerender-routes.json como fonte oficial da lista de tutoriais.

A fonte oficial é:

~~~text
src/data/tutorials.js
~~~

---

# 75. Arquivo outres.js

Existe:

~~~text
src/data/outres.js
~~~

Ele atualmente contém grandes trechos comentados e não funciona como a coleção principal usada pelo runtime.

Os tutoriais atuais estão em:

~~~text
src/data/tutorials.js
~~~

---

# 76. Documentos técnicos existentes

Além desta documentação, existem:

~~~text
src/docs/appScrips.md
src/docs/appScriptV2.md
src/docs/assintenty-ia.md
src/docs/hauy_conecta_arquitetura_validacao.md
src/docs/validaçãoFormFront.md
~~~

Esses documentos entram em mais detalhe em assuntos específicos.

Este documento deve funcionar como porta de entrada geral.

---

# 77. Como estudar o projeto

Uma ordem amigável para iniciante é:

~~~text
1. main.jsx
2. App.jsx
3. pages/
4. data/
5. components/
6. hooks/
7. lib/
8. schemas/
9. api/
10. scripts/
11. GitHub Actions
12. Vercel
~~~

Não tente entender tudo de uma vez.

Primeiro entenda o fluxo:

~~~text
rota
 ↓
página
 ↓
componente
 ↓
dados
~~~

Depois avance para:

~~~text
hooks
 ↓
libs
 ↓
backend
 ↓
build
~~~

---

# 78. O que estudar em JavaScript

Para navegar por este código com menos dificuldade, vale dominar:

~~~text
const
let
if
for
map
filter
find
some
Set
Map
Promise
async/await
destructuring
template strings
import/export
~~~

---

# 79. O que estudar em React

A sequência recomendada:

~~~text
componentes
 ↓
props
 ↓
state
 ↓
eventos
 ↓
useEffect
 ↓
useRef
 ↓
useMemo
 ↓
useCallback
 ↓
lazy
 ↓
Suspense
 ↓
React Router
~~~

---

# 80. Checklist antes de fazer commit

~~~text
[ ] O arquivo está no lugar correto?
[ ] O conteúdo ficou em src/data quando deveria?
[ ] Acessibilidade foi considerada?
[ ] Teclado foi considerado?
[ ] Reduced motion foi considerado?
[ ] O componente continua reutilizável?
[ ] Nenhum arquivo generated foi editado manualmente?
[ ] npm run lint passou?
[ ] npm run build passou?
[ ] Validate passou?
[ ] Lighthouse passou?
~~~

---

# 81. Checklist para adicionar tutorial

~~~text
[ ] ID único
[ ] título
[ ] categoria existente
[ ] dificuldade
[ ] duração
[ ] descrição
[ ] keywords
[ ] learning
[ ] steps
[ ] alt das imagens
[ ] mídia no public/tutoriais
[ ] poster de vídeo quando necessário
[ ] externalLearning quando houver recomendação
[ ] lint
[ ] build
[ ] Actions
~~~

---

# 82. Regra principal para evolução

O projeto não deve crescer apenas porque uma tecnologia nova parece interessante.

O ciclo recomendado é:

~~~text
problema real
   ↓
necessidade real
   ↓
conteúdo útil
   ↓
implementação simples
   ↓
acessibilidade
   ↓
validação
   ↓
publicação
~~~

O melhor recurso é aquele que resolve uma necessidade real da comunidade escolar e continua fácil de manter depois.

---

# 83. Resumo final

Se você guardar somente uma ideia sobre este projeto, guarde esta:

~~~text
PÁGINAS
   ↓
usam COMPONENTES
   ↓
recebem DADOS
   ↓
usam HOOKS e LIBS
   ↓
chamam APIs quando necessário
   ↓
passam pelo BUILD
   ↓
são VALIDADAS
   ↓
chegam à VERCEL
~~~

E para os tutoriais:

~~~text
dados do tutorial
      ↓
Tutorial
      ↓
TutorialStep
      ↓
preload do passo
      ↓
imagem/vídeo
      ↓
Lightbox ou player
      ↓
próximo passo
      ↓
conclusão
~~~
---

## Hauy Conecta

Central de Ajuda Digital da Escola Estadual Hauy Petrucely Mairync.

~~~text
PESQUISAR → ENCONTRAR → APRENDER → RESOLVER
~~~
