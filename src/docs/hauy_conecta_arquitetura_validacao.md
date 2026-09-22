# Hauy Conecta — Arquitetura, validação, segurança e fluxo de dados

Este documento explica, do zero, como funciona o sistema de envio de dúvidas do **Hauy Conecta — Central de Ajuda Digital**.

A ideia é separar claramente o papel de cada tecnologia:

- **React + HTML** → interface e experiência do usuário.
- **Zod** → validação no frontend.
- **fetch** → transporte dos dados por HTTP.
- **Google Apps Script** → backend do formulário.
- **Google Sheets** → armazenamento e acompanhamento das dúvidas.
- **Google Forms** → pesquisa inicial do projeto, separada do atendimento.

---

## 1. Visão geral

O projeto possui **dois fluxos diferentes**.

### 1.1 Pesquisa inicial

A pesquisa foi usada para descobrir quais dificuldades os alunos tinham.

```text
Aluno
  ↓
Google Forms
  ↓
Google Sheets
  ↓
Respostas ao formulário 1
  ↓
Análise das respostas
  ↓
Definição dos temas/tutoriais do Hauy Conecta
```

Essa parte serve para responder:

> "Quais dificuldades existem?"

### 1.2 Atendimento do portal

O formulário atual é feito no próprio React.

```text
Aluno
  ↓
Formulário React
  ↓
HTML + validação de UI
  ↓
Zod
  ↓
fetch / POST
  ↓
Google Apps Script
  ↓
validação no servidor
  ↓
Google Sheets
  ↓
Atendimento
```

Essa parte serve para responder:

> "Qual dúvida uma pessoa enviou agora?"

**O formulário React não usa mais o Google Forms para atendimento.**

---

# 2. Quem faz o quê?

Uma forma simples de memorizar:

```text
React
→ mostra e controla a interface

HTML
→ regras básicas do formulário

Zod
→ valida os dados no frontend

fetch
→ envia os dados

Apps Script
→ recebe, valida e processa

Google Sheets
→ armazena e organiza

Google Forms
→ pesquisa inicial
```

Arquitetura:

```text
┌────────────────────────────────────┐
│              USUÁRIO               │
│                                    │
│ "Não consigo criar sumário..."     │
└─────────────────┬──────────────────┘
                  ↓
┌────────────────────────────────────┐
│          REACT / FRONTEND           │
│                                    │
│ Formulário, campos, estados, UX    │
└─────────────────┬──────────────────┘
                  ↓
┌────────────────────────────────────┐
│               ZOD                  │
│                                    │
│ Validação dos dados no cliente     │
└─────────────────┬──────────────────┘
                  ↓
┌────────────────────────────────────┐
│          HTTP POST / fetch         │
└─────────────────┬──────────────────┘
                  ↓
┌────────────────────────────────────┐
│          GOOGLE APPS SCRIPT        │
│                                    │
│ Backend + validação + regras       │
└─────────────────┬──────────────────┘
                  ↓
┌────────────────────────────────────┐
│           GOOGLE SHEETS            │
│                                    │
│            Atendimento             │
└────────────────────────────────────┘
```

---

# 3. O que é o frontend?

Frontend é tudo aquilo que roda no navegador e com o qual o usuário interage.

No Hauy Conecta, o frontend é React.

Ele é responsável por:

1. Mostrar os campos.
2. Guardar o que foi digitado.
3. Mostrar erros.
4. Contar caracteres.
5. Desabilitar o botão durante o envio.
6. Mostrar `Enviando...`.
7. Enviar os dados.
8. Mostrar `Dúvida enviada!`.

O frontend também é responsável por acessibilidade e experiência.

Por exemplo:

```jsx
<button disabled={submitting}>
    {submitting ? "Enviando..." : "Enviar dúvida"}
</button>
```

Isso é comportamento de interface.

---

# 4. O frontend NÃO é uma camada de segurança suficiente

Isto é muito importante.

Imagine que o React tenha:

```js
if (form.message.length < 10) {
    mostrarErro();
}
```

Isso ajuda o usuário.

Mas uma pessoa pode ignorar o React completamente e enviar uma requisição diretamente ao endpoint do Apps Script.

```text
Atacante
   ↓
POST direto
   ↓
Apps Script
```

Nesse caso:

```text
React não participou.
Zod não participou.
HTML não participou.
```

Por isso:

> **Tudo que vem do navegador deve ser tratado como entrada não confiável.**

É por isso que o projeto possui validação no frontend **e** no backend.

---

# 5. O que é o Zod?

Zod é uma biblioteca de validação para JavaScript.

Você cria um `schema` com as regras que os dados devem obedecer.

Exemplo:

```text
Categoria
→ obrigatória
→ precisa pertencer à lista permitida

Dúvida
→ obrigatória
→ 10 até 2000 caracteres

Nome
→ opcional
→ máximo de 100 caracteres

Contato
→ opcional
→ máximo de 200 caracteres

Dispositivo
→ obrigatório
→ precisa pertencer à lista permitida
```

---

# 6. Schema Zod do Hauy Conecta

Arquivo:

```text
src/schemas/questionSchema.js
```

```js
import { z } from "zod";

export const categories = [
    "Excel",
    "Word",
    "PowerPoint",
    "Canva",
    "PDF",
    "E-mail",
    "Google Drive",
    "Impressão",
    "Digitalização",
    "Plataforma da escola",
    "Informática básica",
    "Outro",
];

export const devices = [
    "Computador",
    "Celular",
    "Tablet",
    "Não sei informar",
];

export const questionSchema = z.object({
    category: z
        .string()
        .trim()
        .min(
            1,
            "Escolha o assunto da sua dúvida.",
        )
        .refine(
            (value) => categories.includes(value),
            "Escolha uma categoria válida.",
        ),

    message: z
        .string()
        .trim()
        .min(
            10,
            "Explique um pouco mais sua dúvida.",
        )
        .max(
            2000,
            "A dúvida pode ter no máximo 2000 caracteres.",
        ),

    name: z
        .string()
        .trim()
        .max(
            100,
            "O nome pode ter no máximo 100 caracteres.",
        ),

    contact: z
        .string()
        .trim()
        .max(
            200,
            "O contato pode ter no máximo 200 caracteres.",
        ),

    device: z
        .string()
        .trim()
        .min(
            1,
            "Informe onde está tentando realizar a tarefa.",
        )
        .refine(
            (value) => devices.includes(value),
            "Escolha um dispositivo válido.",
        ),
});
```

---

# 7. O que significa cada parte do Zod?

## `z.string()`

Significa:

> "Esse valor precisa ser uma string."

```js
z.string()
```

## `.trim()`

Remove espaços nas extremidades.

```text
"   Word   "
     ↓
"Word"
```

## `.min(10)`

Exige pelo menos 10 caracteres.

```text
"oi" → inválido
"Não consigo abrir" → válido
```

## `.max(2000)`

Define o máximo de caracteres.

## `.refine(...)`

Permite criar uma regra personalizada.

```js
.refine(
    (value) => categories.includes(value),
    "Escolha uma categoria válida.",
)
```

Isso significa:

```text
Word → permitido
Excel → permitido
PDF → permitido

Hack → rejeitado
Xbox → rejeitado
```

Esse conceito é chamado de **allowlist**:

> Em vez de tentar adivinhar tudo que é proibido, você define aquilo que é permitido.

---

# 8. `safeParse()`

No React fazemos:

```js
const result =
    questionSchema.safeParse(form);
```

Se estiver inválido:

```js
result.success === false
```

Se estiver válido:

```js
result.success === true
```

Quando é válido, podemos usar:

```js
const validData = result.data;
```

---

# 9. Por que Zod fica no frontend?

Principalmente por organização e experiência.

Sem Zod, você pode acabar com muitas regras espalhadas:

```js
if (!form.category) ...
if (form.message.length < 10) ...
if (form.message.length > 2000) ...
if (!devices.includes(...)) ...
```

Com Zod:

```js
questionSchema
```

centraliza as regras.

Isso facilita manutenção.

---

# 10. HTML também valida

O HTML possui mecanismos próprios:

```jsx
<select required>
```

```jsx
<textarea
    minLength={10}
    maxLength={2000}
/>
```

```jsx
<input maxLength={100} />
```

Eles complementam Zod.

Podemos enxergar assim:

```text
HTML
→ interação e restrições básicas

Zod
→ validação estruturada do frontend

Apps Script
→ validação do servidor
```

---

# 11. Por que ter `maxLength` e Zod ao mesmo tempo?

Porque eles não têm exatamente a mesma função.

### HTML

```jsx
maxLength={2000}
```

Limita a interação enquanto o usuário digita.

### Zod

```js
.max(2000)
```

Confere os dados antes de enviar.

### Backend

O servidor confere novamente.

Assim existem três camadas:

```text
usuário
 ↓
HTML
 ↓
Zod
 ↓
Apps Script
```

---

# 12. O que é `fetch`?

`fetch()` é a API do navegador usada para fazer requisições HTTP.

No projeto:

```js
await fetch(
    SUPPORT_ENDPOINT,
    {
        method: "POST",
        mode: "no-cors",
        body,
    },
);
```

Significa:

```text
enviar uma requisição
para SUPPORT_ENDPOINT
usando POST
com os dados em body
```

---

# 13. O que é POST?

De forma simples:

```text
GET
→ normalmente usado para obter dados

POST
→ normalmente usado para enviar dados
```

Como estamos criando um novo registro de atendimento, usamos POST.

---

# 14. Por que usamos `no-cors`?

O React está em um domínio/origem e o Apps Script em outro.

Exemplo no desenvolvimento:

```text
React:
http://192.168.1.142:5173

Apps Script:
https://script.google.com/...
```

O navegador aplica as regras de CORS para comunicação entre origens diferentes.

No projeto usamos:

```js
mode: "no-cors"
```

para permitir o envio simples.

Mas existe uma consequência:

> O React não consegue ler normalmente o corpo da resposta.

Por isso não fazemos:

```js
response.text()
```

nem usamos a resposta para confirmar o conteúdo retornado.

O backend já valida e grava os dados.

---

# 15. Limitação do `no-cors`

Com:

```js
mode: "no-cors"
```

o resultado da resposta é opaco.

Então:

```js
await fetch(...)
```

não significa:

> "Eu li uma resposta do servidor dizendo que tudo deu certo."

Significa mais aproximadamente:

> "A requisição terminou sem uma falha de rede que o navegador tenha exposto ao JavaScript."

No nosso caso, isso é aceitável porque o backend foi testado separadamente e a gravação no Sheets foi confirmada.

---

# 16. O que é o Google Apps Script?

O Google Apps Script é o **backend** usado pelo Hauy Conecta.

Ele roda no ambiente do Google.

Nosso React roda no navegador.

Então:

```text
NAVEGADOR
React
   ↓
HTTP POST
   ↓
SERVIDOR
Apps Script
```

O Apps Script é quem conversa com o Google Sheets.

---

# 17. `doPost(e)`

A principal função do backend é:

```js
function doPost(e) {
    ...
}
```

Quando o Web App recebe uma requisição POST, o Apps Script chama `doPost`.

O objeto:

```js
e
```

contém os dados da requisição.

Os parâmetros enviados pelo formulário podem ser acessados com:

```js
e.parameter.category
e.parameter.message
e.parameter.name
e.parameter.contact
e.parameter.device
```

---

# 18. O backend não confia no frontend

Esse é um dos conceitos mais importantes.

Mesmo que o Zod diga:

```text
Categoria = Word
```

o Apps Script deve conferir novamente.

Por exemplo:

```js
if (!CATEGORIES.includes(category)) {
    throw new Error(
        "Categoria inválida.",
    );
}
```

Se alguém enviar:

```text
category=Hack
```

diretamente para o endpoint:

```text
React não participa
      ↓
Apps Script
      ↓
categoria inválida
      ↓
rejeita
```

---

# 19. Validação da categoria no Apps Script

O backend possui:

```js
const CATEGORIES = [
    "Excel",
    "Word",
    "PowerPoint",
    "Canva",
    "PDF",
    "E-mail",
    "Google Drive",
    "Impressão",
    "Digitalização",
    "Plataforma da escola",
    "Informática básica",
    "Outro",
];
```

Depois:

```js
if (!CATEGORIES.includes(category)) {
    throw new Error(
        "Categoria inválida.",
    );
}
```

Isso impede categorias inventadas.

---

# 20. Validação do dispositivo

Também temos:

```js
const DEVICES = [
    "Computador",
    "Celular",
    "Tablet",
    "Não sei informar",
];
```

e:

```js
if (!DEVICES.includes(device)) {
    throw new Error(
        "Dispositivo inválido.",
    );
}
```

---

# 21. Validação de tamanho no backend

O frontend possui:

```jsx
maxLength={2000}
```

Mas um atacante pode ignorar isso.

Por isso o Apps Script também usa limites:

```js
const LIMITS = {
    category: 100,
    message: 2000,
    name: 100,
    contact: 200,
    device: 50,
};
```

O servidor é a autoridade final.

---

# 22. `cleanText()`

A função:

```js
function cleanText(value, maxLength) {
    if (
        value === undefined ||
        value === null
    ) {
        return "";
    }

    const text =
        String(value)
            .normalize("NFKC")
            .replace(
                /[ --]/g,
                "",
            )
            .trim();

    if (text.length > maxLength) {
        throw new Error(
            "Um dos campos excede o tamanho permitido.",
        );
    }

    return text;
}
```

faz várias tarefas.

### Converte para string

```js
String(value)
```

### Normaliza Unicode

```js
normalize("NFKC")
```

### Remove alguns caracteres de controle

```js
replace(...)
```

### Remove espaços das extremidades

```js
trim()
```

### Aplica o limite de tamanho

```js
if (text.length > maxLength)
```

---

# 23. Honeypot

O frontend contém um campo escondido:

```jsx
<input
    id="website"
    name="website"
    type="text"
    tabIndex={-1}
    autoComplete="off"
/>
```

Um usuário normal não deve preencher esse campo.

O backend verifica:

```js
const website =
    cleanText(
        e.parameter.website,
        100,
    );

if (website) {
    return createTextResponse("OK");
}
```

Um bot simples que preencher esse campo é descartado.

### Limitação

Honeypot não é proteção definitiva.

Um bot mais sofisticado pode descobrir o campo.

---

# 24. Proteção contra fórmula no Sheets

Isso é especialmente importante quando dados externos são escritos em uma planilha.

Temos:

```js
function safeForSheet(value) {
    if (!value) {
        return "";
    }

    const text = String(value);

    if (/^[=+\-@]/.test(text)) {
        return "'" + text;
    }

    return text;
}
```

Se alguém tentar enviar um valor começando com:

```text
=
+
-
@
```

o sistema adiciona uma aspa simples antes do conteúdo para que ele seja tratado como texto.

Exemplo:

```text
Entrada:
=alguma-coisa

Armazenamento:
'=alguma-coisa
```

A intenção é evitar que conteúdo fornecido pelo usuário seja interpretado como fórmula pelo Sheets.

---

# 25. `LockService`

Usamos:

```js
const lock =
    LockService.getScriptLock();

lock.waitLock(5000);
```

Pense no lock como uma porta.

```text
Pessoa A
 ↓
abre a porta
 ↓
grava
 ↓
fecha

Pessoa B
 ↓
espera
 ↓
abre
 ↓
grava
 ↓
fecha
```

Isso ajuda a evitar conflitos quando múltiplas execuções tentam modificar o mesmo recurso.

---

# 26. `CacheService`

Também existe uma proteção contra duplicações recentes.

O sistema cria uma chave baseada em:

```text
categoria
+
dúvida
+
nome
+
contato
+
dispositivo
```

Essa informação é transformada em um hash e guardada temporariamente no cache.

Se a mesma combinação aparecer novamente dentro da janela definida, o envio pode ser ignorado.

A ideia é evitar coisas como:

```text
duplo envio acidental
spam simples
vários cliques
```

### Importante

Isso não é um sistema completo contra spam.

O cache é temporário e não deve ser tratado como armazenamento permanente.

---

# 27. Por que usamos hash para a duplicação?

Em vez de colocar diretamente no cache toda a dúvida, criamos uma representação curta.

Conceitualmente:

```text
"Word|Não consigo...|Kleber|teste|Computador"
                         ↓
                       HASH
                         ↓
                    dup_xxxxx
```

Isso evita usar o texto completo como chave.

O conteúdo original continua sendo armazenado apenas na planilha quando o envio é aceito.

---

# 28. O que é o Google Sheets?

O Google Sheets é o **armazenamento dos registros de atendimento**.

Na arquitetura:

```text
React
 ↓
interface

Apps Script
 ↓
backend

Google Sheets
 ↓
armazenamento
```

A aba que recebe as dúvidas é:

```text
Atendimento
```

---

# 29. Estrutura da aba Atendimento

A sua estrutura é:

| Coluna | Campo |
|---|---|
| A | Data |
| B | Categoria |
| C | Dúvidas |
| D | Nome |
| E | Contato |
| F | Dispositivo |
| G | Status |
| H | Resposta |
| I | Data da resposta |

Quando alguém envia:

```text
Categoria: Word
Dúvida: Não consigo criar um sumário automático.
Nome: Kleber
Contato: teste
Dispositivo: Computador
```

o Apps Script grava aproximadamente:

```text
Data atual
Word
Não consigo criar um sumário automático.
Kleber
teste
Computador
Nova
vazio
vazio
```

---

# 30. O que significa "Nova"?

Toda dúvida entra com:

```text
Status = Nova
```

Depois a equipe pode usar o fluxo:

```text
Nova
  ↓
Em análise
  ↓
Respondida
```

---

# 31. O que significa "Resposta"?

A coluna:

```text
Resposta
```

é preenchida pela equipe.

Exemplo:

```text
Dúvida:
Não consigo criar um sumário automático.

Resposta:
No Word, aplique os estilos de título...
```

O aluno não precisa controlar essa coluna.

---

# 32. O que significa "Data da resposta"?

É o momento em que a equipe registra que respondeu.

Na chegada:

```text
Data da resposta = vazio
```

Depois:

```text
Data da resposta = data da resposta
```

---

# 33. Por que o Google Forms continua existindo?

Porque o Google Forms e o formulário React têm funções diferentes.

### Google Forms

Pesquisa inicial.

```text
"Quais dificuldades os alunos possuem?"
```

Resultado:

```text
Respostas ao formulário 1
```

### React

Atendimento.

```text
"Qual dúvida você tem agora?"
```

Resultado:

```text
Atendimento
```

---

# 34. Diferença entre as duas abas

## Respostas ao formulário 1

Dados da pesquisa.

Objetivo:

```text
entender as necessidades do público
```

## Atendimento

Dados do atendimento.

Objetivo:

```text
acompanhar dúvidas e respostas
```

Não é necessário misturar os dois.

---

# 35. Exemplo completo de uma dúvida

O aluno envia:

```text
Categoria:
PDF

Dúvida:
Não consigo abrir um arquivo PDF.

Nome:
João

Contato:
joao@email.com

Dispositivo:
Celular
```

### Etapa 1 — React

Guarda:

```js
{
    category: "PDF",
    message: "Não consigo abrir um arquivo PDF.",
    name: "João",
    contact: "joao@email.com",
    device: "Celular",
}
```

### Etapa 2 — Zod

Confere:

```text
categoria existe?       ✅
categoria permitida?    ✅
dúvida ≥ 10?            ✅
dúvida ≤ 2000?          ✅
dispositivo existe?     ✅
dispositivo permitido?  ✅
```

### Etapa 3 — fetch

O frontend envia um POST.

### Etapa 4 — Apps Script

O backend recebe os parâmetros.

### Etapa 5 — Apps Script valida novamente

Confere:

```text
categoria
dúvida
dispositivo
limites
honeypot
duplicação
```

### Etapa 6 — Sheets

Cria uma nova linha:

```text
Data | PDF | Não consigo... | João | ... | Celular | Nova | | 
```

### Etapa 7 — React

O formulário muda para:

```text
✓
Dúvida enviada!

Recebemos sua mensagem.

[Enviar outra dúvida]
```

---

# 36. O que acontece se alguém tentar burlar o frontend?

Imagine:

```text
category = "Hacking"
message = "x"
device = "PlayStation"
```

A pessoa ignora React e Zod.

Vai diretamente:

```text
POST
 ↓
Apps Script
```

O Apps Script verifica:

```js
CATEGORIES.includes(category)
```

e:

```js
DEVICES.includes(device)
```

e:

```js
message.length < 10
```

A entrada é rejeitada.

Isso mostra por que existe a validação do servidor.

---

# 37. O que o React sabe?

O React sabe:

```text
como desenhar o formulário
qual valor cada campo possui
qual erro mostrar
quando está enviando
quando terminou
como mostrar sucesso
```

---

# 38. O que o Zod sabe?

O Zod sabe:

```text
quais regras os dados do frontend devem obedecer
```

Ele não grava nada.

Ele não acessa Google Sheets.

Ele não é o backend.

---

# 39. O que o Apps Script sabe?

O Apps Script sabe:

```text
receber POST
validar dados
aplicar regras de segurança
abrir a planilha
gravar a linha
retornar uma resposta
```

Ele é o backend.

---

# 40. O que o Google Sheets sabe?

O Sheets sabe:

```text
guardar dados
mostrar dados
organizar dados
permitir acompanhamento pela equipe
```

Ele é o armazenamento do sistema.

---

# 41. O que o Google Forms sabe?

O Google Forms sabe:

```text
mostrar uma pesquisa
coletar respostas
enviar respostas para uma planilha
```

No projeto atual ele não é responsável pelo atendimento do portal.

---

# 42. Segurança em camadas

A arquitetura fica:

```text
┌─────────────────────────────┐
│ HTML                        │
│ required / min / max        │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ ZOD                         │
│ validação do frontend       │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ HTTP POST                   │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ APPS SCRIPT                 │
│ validação do servidor       │
│ allowlist                   │
│ limites                     │
│ honeypot                    │
│ anti-duplicação             │
│ proteção do Sheets          │
│ LockService                 │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ GOOGLE SHEETS               │
│ armazenamento               │
└─────────────────────────────┘
```

---

# 43. Segurança não significa que o sistema seja invulnerável

É importante usar uma linguagem técnica correta.

O sistema possui **proteções básicas e apropriadas ao contexto atual**, mas não é uma API empresarial.

Existem limitações:

```text
✅ validação no cliente
✅ validação no servidor
✅ allowlist
✅ limites de tamanho
✅ honeypot
✅ proteção contra fórmula
✅ anti-duplicação básico
✅ LockService
✅ separação frontend/backend

⚠ endpoint público
⚠ qualquer pessoa pode tentar chamar o endpoint
⚠ no-cors limita a confirmação pelo frontend
⚠ anti-spam não é avançado
⚠ Google Sheets não é um banco de dados tradicional
```

---

# 44. Um erro comum de iniciante

Não pense:

```text
"Usei Zod, então meu formulário está seguro."
```

Pense:

```text
Zod
→ valida o que o cliente está enviando

Apps Script
→ valida o que o servidor recebeu
```

A segunda etapa é fundamental.

---

# 45. Outro erro comum

Não pense:

```text
"Escondi o campo com CSS, então ele está protegido."
```

Qualquer pessoa pode abrir o DevTools e alterar HTML/JavaScript.

Ocultar um campo:

```css
display: none;
```

não é segurança.

Por isso o honeypot também é validado no backend.

---

# 46. Outro conceito importante: frontend e backend

Frontend:

```text
roda no computador/celular do usuário
```

Backend:

```text
roda no servidor
```

No Hauy Conecta:

```text
FRONTEND
React

BACKEND
Apps Script

STORAGE
Google Sheets
```

Essa separação é uma base importante do desenvolvimento web.

---

# 47. Código simplificado do frontend

A parte principal do envio é:

```js
const result =
    questionSchema.safeParse(form);

if (!result.success) {
    // mostrar erros
    return;
}

const validData =
    result.data;

const body =
    new URLSearchParams();

body.set(
    "category",
    validData.category,
);

body.set(
    "message",
    validData.message,
);

body.set(
    "name",
    validData.name,
);

body.set(
    "contact",
    validData.contact,
);

body.set(
    "device",
    validData.device,
);

body.set(
    "website",
    "",
);

await fetch(
    SUPPORT_ENDPOINT,
    {
        method: "POST",
        mode: "no-cors",
        body,
    },
);
```

---

# 48. Código simplificado do backend

O conceito principal é:

```js
function doPost(e) {
    const category =
        cleanText(
            e.parameter.category,
            100,
        );

    const message =
        cleanText(
            e.parameter.message,
            2000,
        );

    const device =
        cleanText(
            e.parameter.device,
            50,
        );

    if (!category) {
        throw new Error(
            "Categoria obrigatória.",
        );
    }

    if (!message) {
        throw new Error(
            "Dúvida obrigatória.",
        );
    }

    if (!CATEGORIES.includes(category)) {
        throw new Error(
            "Categoria inválida.",
        );
    }

    if (!DEVICES.includes(device)) {
        throw new Error(
            "Dispositivo inválido.",
        );
    }

    // abrir planilha
    // localizar Atendimento
    // gravar
}
```

Esse é o conceito de um endpoint backend.

---

# 49. Fluxo completo em uma única imagem mental

Imagine uma secretaria:

```text
ALUNO
  ↓
preenche formulário

RECEPCIONISTA
  ↓
React
  ↓
organiza a informação

CONFERENTE
  ↓
Zod
  ↓
confere o formulário antes do envio

TRANSPORTE
  ↓
fetch
  ↓
leva os dados ao servidor

SECRETARIA
  ↓
Apps Script
  ↓
confere novamente

ARQUIVO
  ↓
Google Sheets
  ↓
guarda a dúvida

EQUIPE
  ↓
Atendimento
  ↓
responde
```

Essa analogia é boa para memorizar as responsabilidades.

---

# 50. Como explicar o sistema para um professor

Você pode explicar assim:

> **"O Hauy Conecta possui um formulário desenvolvido em React. O frontend coleta as informações e utiliza HTML e Zod para validar os campos antes do envio. Os dados são enviados por uma requisição HTTP POST para um Google Apps Script, que funciona como backend. O Apps Script não confia na validação do navegador: ele valida novamente categoria, dispositivo, tamanho dos campos e outras regras de segurança. Depois, grava a dúvida na aba Atendimento do Google Sheets com status inicial Nova. O Google Forms é utilizado separadamente na pesquisa inicial do projeto, cuja finalidade foi identificar as principais dificuldades dos alunos."**

---

# 51. Resumo para memorizar

```text
HTML
→ regras básicas do formulário

React
→ interface + estado + UX

Zod
→ validação frontend

fetch
→ transporte HTTP

Apps Script
→ backend

Validação do Apps Script
→ segurança + regras do servidor

Google Sheets
→ armazenamento

Atendimento
→ acompanhamento

Google Forms
→ pesquisa inicial
```

---

# 52. A ideia mais importante

Não pense que existe uma única ferramenta fazendo tudo.

O projeto foi dividido em responsabilidades:

```text
React
→ "Como o usuário interage?"

Zod
→ "Os dados estão de acordo com as regras?"

Apps Script
→ "Posso confiar nesses dados no servidor?"

Google Sheets
→ "Onde guardo e acompanho os dados?"

Google Forms
→ "Como faço a pesquisa inicial?"
```

Essa separação de responsabilidades é uma das ideias fundamentais para entender aplicações web.

---

# 53. Estrutura final do projeto

Uma estrutura possível:

```text
src/
├── components/
│   ├── QuestionForm.jsx
│   └── support.js
│
├── pages/
│   └── SendQuestion.jsx
│
└── schemas/
    └── questionSchema.js
```

E fora do React:

```text
Google Apps Script
└── Code.gs

Google Sheets
├── Respostas ao formulário 1
└── Atendimento
```

---

# 54. Regra final para guardar

```text
CLIENTE NÃO CONFIÁVEL
        ↓
React + HTML + Zod
        ↓
POST
        ↓
SERVIDOR
        ↓
Apps Script valida novamente
        ↓
ARMAZENAMENTO
        ↓
Google Sheets
```

Ou, em uma frase:

> **Frontend cuida da experiência, Zod organiza a validação do cliente, o Apps Script valida e processa no servidor, e o Google Sheets armazena os dados. O Google Forms fica separado como ferramenta da pesquisa inicial.**
