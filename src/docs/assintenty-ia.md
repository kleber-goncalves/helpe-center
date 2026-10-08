# Assistente de IA — Hauy Conecta

## Visão geral

O Hauy Conecta possui um **assistente de inteligência artificial** criado para ajudar o usuário a encontrar orientação dentro do conteúdo disponível no portal.

A ideia do assistente não é substituir os tutoriais existentes, mas utilizar o conteúdo do próprio Hauy Conecta como contexto para produzir respostas mais direcionadas às dúvidas do usuário.

No MVP, o assistente utiliza o **Gemini 3.5 Flash-Lite** e o SDK oficial `@google/genai` para Node.js. A documentação atual considerada neste projeto indica entrada e saída sem custo financeiro no Free Tier.

---

# 1. Objetivo do assistente

O assistente existe para facilitar o acesso ao conteúdo do Hauy Conecta.

Em vez de o usuário precisar navegar manualmente por várias páginas para descobrir qual tutorial pode ajudá-lo, ele pode apresentar sua dúvida diretamente ao assistente.

O funcionamento pode ser resumido como:

```text
DÚVIDA DO USUÁRIO
        ↓
ASSISTENTE
        ↓
ENCONTRA TUTORIAIS RELACIONADOS
        ↓
USA OS TUTORIAIS COMO CONTEXTO
        ↓
GEMINI
        ↓
RESPOSTA AO USUÁRIO
```

---

# 2. Tecnologia utilizada

O MVP utiliza:

```text
Gemini 3.5 Flash-Lite
        +
@google/genai
        +
Node.js
```

O `@google/genai` é o SDK oficial utilizado para realizar a comunicação com o modelo no ambiente Node.js.

---

# 3. Fluxo do assistente

O processamento da pergunta segue uma sequência definida.

```text
React
   ↓
POST /api/assistant
   ↓
searchTutorials()
   ↓
top 3 tutoriais
   ↓
Gemini 3.5 Flash-Lite
   ↓
resposta
```

Cada etapa possui uma função específica.

---

## 3.1 React

O processo começa na aplicação React.

É nessa camada que o usuário escreve sua dúvida e solicita ajuda ao assistente.

Exemplo de interação:

```text
Usuário:
"Como faço um sumário no Word?"
```

A pergunta é então enviada para a API do assistente.

---

## 3.2 `POST /api/assistant`

A pergunta é enviada através de uma requisição `POST` para:

```text
/api/assistant
```

Essa rota funciona como o ponto de entrada do processamento.

O React não precisa conversar diretamente com o modelo de inteligência artificial.

O fluxo fica separado:

```text
React
   ↓
API
   ↓
IA
```

Essa separação permite que o processamento do assistente fique concentrado no lado do servidor.

---

## 3.3 `searchTutorials()`

Antes de solicitar uma resposta ao Gemini, o sistema procura quais conteúdos do Hauy Conecta possuem relação com a dúvida.

Para isso, é utilizado:

```text
searchTutorials()
```

O objetivo dessa etapa é identificar os tutoriais mais relevantes para a pergunta.

Por exemplo:

```text
Pergunta:
"Como fazer um sumário no Word?"

        ↓

Busca nos tutoriais

        ↓

Tutorial relacionado:
"Como criar um sumário automático no Word"
```

Dessa maneira, a inteligência artificial recebe informações relacionadas ao conteúdo real disponível no portal.

---

# 4. Seleção dos tutoriais

Depois da busca, o sistema seleciona os **3 tutoriais mais relevantes**.

O fluxo é:

```text
TODOS OS TUTORIAIS
        ↓
searchTutorials()
        ↓
RANKING DE RELEVÂNCIA
        ↓
TOP 3
```

Esses três tutoriais são utilizados como contexto para a próxima etapa.

A intenção é evitar enviar todo o conteúdo disponível para o modelo quando apenas uma pequena parte é necessária.

---

# 5. Gemini 3.5 Flash-Lite

Depois que os tutoriais relevantes são identificados, o sistema utiliza o **Gemini 3.5 Flash-Lite** para gerar a resposta.

O modelo recebe:

```text
Pergunta do usuário
        +
Contexto dos tutoriais relevantes
        ↓
Gemini 3.5 Flash-Lite
        ↓
Resposta
```

Assim, o modelo consegue utilizar os conteúdos encontrados na etapa anterior para elaborar sua resposta.

---

# 6. Resposta ao usuário

Depois do processamento do Gemini, a resposta retorna para a aplicação e é apresentada ao usuário.

O fluxo completo fica:

```text
┌──────────────────────┐
│       USUÁRIO        │
│  envia uma dúvida    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│        REACT         │
│ envia a pergunta     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│    /api/assistant    │
│ recebe a requisição  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  searchTutorials()   │
│ encontra conteúdos   │
│ relacionados         │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│       TOP 3          │
│ tutoriais relevantes │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ GEMINI 3.5 FLASH-LITE│
│ gera a resposta      │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│        REACT         │
│ exibe a resposta     │
└──────────────────────┘
```

---

# 7. Por que buscar os tutoriais antes da IA?

O assistente não depende apenas do conhecimento geral do modelo.

Primeiro, o sistema procura informações relacionadas dentro do próprio conteúdo do Hauy Conecta.

Isso cria uma relação entre:

```text
DÚVIDA
  ↓
CONTEÚDO DO HAUY CONECTA
  ↓
IA
  ↓
RESPOSTA
```

O objetivo é fazer com que a resposta esteja relacionada ao material que o portal realmente possui.

---

# 8. Arquitetura simplificada

A arquitetura do assistente pode ser representada assim:

```text
                    HAUY CONECTA

┌───────────────┐
│    USUÁRIO    │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│     REACT     │
└───────┬───────┘
        │
        │ POST
        ▼
┌───────────────────┐
│  /api/assistant   │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ searchTutorials() │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│     TOP 3         │
│    TUTORIAIS      │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Gemini 3.5        │
│ Flash-Lite        │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│     RESPOSTA      │
└───────────────────┘
```

---

# 9. Resumo

O assistente do Hauy Conecta funciona através de uma sequência simples:

```text
PERGUNTA
   ↓
BUSCA
   ↓
3 TUTORIAIS MAIS RELEVANTES
   ↓
GEMINI
   ↓
RESPOSTA
```

O React é responsável pela interação com o usuário, a API recebe e processa a solicitação, `searchTutorials()` encontra os conteúdos relacionados e o Gemini 3.5 Flash-Lite utiliza essas informações para gerar a resposta.

Essa estrutura permite que o assistente esteja conectado diretamente ao conteúdo de aprendizagem do Hauy Conecta, em vez de funcionar como uma IA completamente separada do portal.
