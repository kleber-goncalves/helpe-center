# Validação do Formulário — Frontend e Backend

## Visão geral

O formulário de envio de dúvidas do Hauy Conecta utiliza **camadas diferentes de validação**, cada uma com uma responsabilidade específica.

No frontend, o objetivo principal é proporcionar uma boa experiência ao usuário e impedir que dados inválidos sejam enviados desnecessariamente.

No backend, a validação existe como uma **segunda barreira de proteção**, garantindo que os dados recebidos sejam novamente analisados antes de serem armazenados.

A arquitetura pode ser resumida assim:

```text
USUÁRIO
   │
   ▼
┌──────────────────────────────┐
│           FRONTEND           │
│                              │
│ HTML                         │
│ required / maxLength         │
│                              │
│ Zod                          │
│ validação e UX               │
└──────────────┬───────────────┘
               │
               ▼
             fetch
               │
               ▼
┌──────────────────────────────┐
│        VERCEL API            │
│                              │
│ Zod                          │
│ Rate limit                   │
│ Origin                       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        APPS SCRIPT           │
│                              │
│ valida categoria             │
│ valida dispositivo           │
│ valida tamanho               │
│ honeypot                     │
│ anti-duplicação              │
│ proteção do Sheets           │
│ LockService                  │
└──────────────┬───────────────┘
               │
               ▼
        GOOGLE SHEETS
```

---

# 1. Responsabilidade do frontend

O frontend é responsável pela **validação imediata dos dados durante a interação do usuário com o formulário**.

Essa camada possui duas partes principais:

### Validação nativa do HTML

O próprio HTML fornece algumas restrições básicas, como:

* `required`
* `maxLength`

Essas regras ajudam a impedir que determinados campos sejam enviados vazios ou com tamanho acima do permitido.

### Validação com Zod

O Zod é utilizado para realizar uma validação mais estruturada dos dados antes do envio.

Nesse contexto, o Zod tem como principal objetivo:

* validar os dados preenchidos;
* fornecer feedback ao usuário;
* melhorar a experiência de uso;
* impedir o envio de informações que já estejam claramente inválidas.

A ideia é que o usuário receba o erro **antes que a requisição seja enviada**.

---

# 2. SEO não pertence ao `QuestionForm`

Existe uma separação importante entre o componente do formulário e a página que o utiliza.

O `QuestionForm` é responsável pelo funcionamento e pela interface do formulário.

Já informações relacionadas a SEO, como:

* `<title>`;
* `<meta>`;
* informações específicas da página;

pertencem à página **SendQuestion**, e não ao componente `QuestionForm`.

Isso mantém cada parte do sistema com uma responsabilidade mais bem definida.

```text
SendQuestion
│
├── SEO da página
│
└── QuestionForm
    ├── campos
    ├── validação
    ├── mensagens
    └── envio
```

O formulário é, portanto, um componente da página, e não a própria página.

---

# 3. Envio dos dados

Depois que os dados passam pela validação inicial do frontend, o formulário realiza uma requisição utilizando `fetch`.

O fluxo começa no navegador e segue para a API hospedada na Vercel.

```text
Formulário
    │
    ▼
HTML
    │
    ▼
Zod
    │
    ▼
fetch
    │
    ▼
Vercel API
```

A validação no frontend, entretanto, **não substitui a validação do backend**.

---

# 4. Validação na Vercel API

Ao receber a requisição, a API da Vercel realiza novas verificações.

Nesse estágio são utilizadas medidas como:

### Zod

Os dados recebidos são novamente validados.

Isso é importante porque o backend não deve confiar apenas no que foi validado pelo navegador.

O cliente pode enviar uma requisição diretamente para a API, sem passar pelo formulário visual da aplicação.

### Rate limit

O rate limit controla a quantidade de requisições permitidas em determinado período.

Seu objetivo é reduzir abusos e requisições excessivas.

### Origin

A origem da requisição também é verificada como parte da proteção da API.

Dessa forma, a requisição passa por uma nova camada de controle antes de continuar para o próximo serviço.

```text
            VERCEL API
                 │
        ┌────────┼────────┐
        │        │        │
       Zod   Rate limit  Origin
        │        │        │
        └────────┼────────┘
                 │
                 ▼
           APPS SCRIPT
```

---

# 5. Validação no Apps Script

Depois da API da Vercel, os dados chegam ao **Google Apps Script**.

Nesse ponto existe uma nova camada de validação e proteção.

O Apps Script verifica:

### Categoria

Confirma se a categoria recebida é válida.

### Dispositivo

Confirma se o dispositivo enviado pertence ao conjunto esperado.

### Tamanho

Verifica se os dados possuem tamanho permitido.

### Honeypot

Utiliza um campo que funciona como mecanismo contra envios automatizados.

A ideia é identificar comportamentos típicos de bots sem interferir na utilização normal do formulário.

### Anti-duplicação

Verifica situações em que uma mesma informação possa estar sendo enviada repetidamente.

### Proteção do Google Sheets

O armazenamento também precisa ser protegido para evitar operações inadequadas ou concorrentes.

### LockService

O `LockService` ajuda a controlar acessos concorrentes ao processo de gravação.

---

# 6. Armazenamento

Somente depois de passar pelas validações anteriores os dados seguem para o **Google Sheets**.

O fluxo completo é:

```text
USUÁRIO
   │
   ▼
QUESTIONFORM
   │
   ├── HTML
   │
   ├── Zod
   │
   ▼
FETCH
   │
   ▼
VERCEL API
   │
   ├── Zod
   ├── Rate limit
   └── Origin
   │
   ▼
APPS SCRIPT
   │
   ├── Categoria
   ├── Dispositivo
   ├── Tamanho
   ├── Honeypot
   ├── Anti-duplicação
   ├── Proteção
   └── LockService
   │
   ▼
GOOGLE SHEETS
```

---

# 7. Por que existem várias validações?

A existência de validações em mais de uma camada é intencional.

A validação do frontend existe principalmente para **UX e prevenção de erros durante o preenchimento**.

A validação do backend existe para **não confiar no cliente e proteger o fluxo de recebimento e armazenamento dos dados**.

Em outras palavras:

```text
FRONTEND
↓
Evita erros e melhora a experiência

BACKEND
↓
Confere novamente e protege o sistema
```

Uma validação não elimina a necessidade da outra.

---

# 8. Separação de responsabilidades

A arquitetura pode ser entendida da seguinte maneira:

| Camada          | Responsabilidade principal                        |
| --------------- | ------------------------------------------------- |
| HTML            | Restrições básicas do formulário                  |
| Zod no frontend | Validação e experiência do usuário                |
| QuestionForm    | Interface e comportamento do formulário           |
| SendQuestion    | Página e informações relacionadas à página/SEO    |
| Vercel API      | Entrada da requisição e proteções da API          |
| Apps Script     | Validação final e controle antes do armazenamento |
| Google Sheets   | Armazenamento dos dados                           |

Essa divisão evita concentrar todas as responsabilidades em um único lugar e torna o fluxo mais organizado.

---

# 9. Fluxo resumido

O processo completo pode ser resumido em quatro etapas:

```text
PREENCHER
    ↓
VALIDAR
    ↓
PROTEGER
    ↓
ARMAZENAR
```

Ou, de forma mais detalhada:

```text
Usuário
   ↓
Formulário
   ↓
HTML + Zod
   ↓
Vercel API
   ↓
Zod + Rate limit + Origin
   ↓
Apps Script
   ↓
Validações + Proteções
   ↓
Google Sheets
```

A arquitetura segue, portanto, uma lógica de **validação em camadas**, em que cada parte do sistema atua dentro da sua própria responsabilidade.
