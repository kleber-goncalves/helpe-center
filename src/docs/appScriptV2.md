# Google Apps Script — Estrutura e Fluxo

## Visão geral

O Google Apps Script funciona como uma camada responsável por **receber as requisições, identificar o tipo de informação recebida, encaminhar os dados para o processamento correto e realizar as gravações necessárias**.

O fluxo principal começa em uma requisição `POST` que chega ao arquivo `Code.gs`.

A partir dessa requisição, o sistema verifica o valor de:

```text
e.parameter.type
```

Esse valor determina qual fluxo deverá ser executado.

```text
                    POST
                     │
                     ▼
                  Code.gs
                     │
             lê e.parameter.type
                     │
             ┌───────┴────────┐
             │                │
             ▼                ▼
     search-no-result       vazio
             │                │
             ▼                ▼
PesquisasSemResultado.gs  Atendimento.gs
             │                │
             ▼                ▼
      Pesquisa sem        Enviar dúvida
        resultado
```

---

# 1. `Code.gs`

O `Code.gs` funciona como o **ponto central de entrada** do Apps Script.

Ele possui:

```text
Code.gs
│
├── SPREADSHEET_ID
├── doGet()
└── doPost()
```

### `SPREADSHEET_ID`

Identifica a planilha utilizada pelo sistema.

### `doGet()`

É a função responsável pelo tratamento das requisições `GET`.

### `doPost()`

É a principal função utilizada no fluxo de envio de dados.

Quando recebe uma requisição `POST`, ela analisa:

```text
e.parameter.type
```

A partir desse valor, o processamento é direcionado para o arquivo responsável pelo tipo de solicitação recebido.

---

# 2. Roteamento pelo `type`

O `doPost()` utiliza o parâmetro `type` para diferenciar os dois fluxos existentes.

Atualmente, o documento apresenta dois caminhos principais:

```text
doPost()
    │
    ├── type = "search-no-result"
    │        ↓
    │   PesquisasSemResultado.gs
    │
    └── type vazio
             ↓
       Atendimento.gs
```

Assim, uma única entrada (`doPost()`) pode encaminhar diferentes tipos de dados para seus respectivos processamentos.

---

# 3. `Atendimento.gs`

O `Atendimento.gs` concentra o fluxo relacionado ao **envio de dúvidas**.

Sua estrutura é:

```text
Atendimento.gs
│
├── categorias
├── dispositivos
├── DDDs
├── validação
├── honeypot
├── duplicação
├── LockService
└── gravação
```

Cada parte possui uma função dentro desse fluxo.

### Categorias

Contém a verificação relacionada às categorias utilizadas no atendimento.

### Dispositivos

Contém a validação relacionada ao dispositivo informado.

### DDDs

Contém as informações utilizadas na validação dos DDDs.

### Validação

Realiza as verificações necessárias antes que os dados sejam armazenados.

### Honeypot

Participa do mecanismo de proteção contra envios automatizados.

### Duplicação

Verifica possíveis envios duplicados.

### LockService

Ajuda a controlar o acesso durante operações que precisam evitar conflitos de execução.

### Gravação

Após as validações necessárias, os dados são gravados na planilha.

O fluxo pode ser representado como:

```text
Enviar dúvida
      │
      ▼
Validações
      │
      ├── categorias
      ├── dispositivos
      ├── DDDs
      ├── honeypot
      └── duplicação
      │
      ▼
LockService
      │
      ▼
Gravação
```

---

# 4. `PesquisasSemResultado.gs`

O arquivo `PesquisasSemResultado.gs` é responsável pelo fluxo de **pesquisas que não encontraram resultado**.

Sua estrutura é:

```text
PesquisasSemResultado.gs
│
├── query
├── normalização
├── duplicação
├── LockService
└── gravação
```

### `query`

Representa a pesquisa realizada pelo usuário que não encontrou um conteúdo correspondente.

### Normalização

Realiza a preparação da informação para que a pesquisa possa ser tratada de maneira consistente.

### Duplicação

Verifica se a mesma pesquisa já foi registrada anteriormente.

### LockService

Ajuda a evitar conflitos durante a operação.

### Gravação

Registra a pesquisa sem resultado na planilha.

O fluxo pode ser representado assim:

```text
Pesquisa sem resultado
          │
          ▼
        query
          │
          ▼
     normalização
          │
          ▼
      duplicação
          │
          ▼
      LockService
          │
          ▼
       gravação
```

---

# 5. `Utils.gs`

O `Utils.gs` reúne funções auxiliares utilizadas no processamento.

Sua estrutura é:

```text
Utils.gs
│
├── cleanText()
├── safeForSheet()
└── createTextResponse()
```

### `cleanText()`

Responsável pela limpeza do texto recebido.

### `safeForSheet()`

Responsável por preparar os dados para utilização segura na planilha.

### `createTextResponse()`

Responsável pela criação das respostas de texto retornadas pelo Apps Script.

Essas funções ficam separadas para evitar que comportamentos auxiliares precisem ser repetidos diretamente nos arquivos principais.

---

# 6. Organização dos arquivos

A estrutura geral do Apps Script pode ser visualizada assim:

```text
Apps Script
│
├── Code.gs
│   ├── SPREADSHEET_ID
│   ├── doGet()
│   └── doPost()
│        │
│        ├── Atendimento.gs
│        │
│        └── PesquisasSemResultado.gs
│
├── Atendimento.gs
│   ├── categorias
│   ├── dispositivos
│   ├── DDDs
│   ├── validação
│   ├── honeypot
│   ├── duplicação
│   ├── LockService
│   └── gravação
│
├── PesquisasSemResultado.gs
│   ├── query
│   ├── normalização
│   ├── duplicação
│   ├── LockService
│   └── gravação
│
└── Utils.gs
    ├── cleanText()
    ├── safeForSheet()
    └── createTextResponse()
```

---

# 7. Fluxo completo

Considerando o fluxo apresentado no documento, o funcionamento geral pode ser resumido desta forma:

```text
                    REQUISIÇÃO POST
                           │
                           ▼
                       Code.gs
                           │
                     doPost()
                           │
                  lê e.parameter.type
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
   "search-no-result"                  vazio
             │                           │
             ▼                           ▼
PesquisasSemResultado.gs          Atendimento.gs
             │                           │
             ▼                           ▼
         query                       categorias
             │                       dispositivos
             ▼                       DDDs
      normalização                  validação
             │                       honeypot
             ▼                       duplicação
       duplicação                  LockService
             │                       gravação
             ▼                           │
        LockService                      │
             │                           │
             ▼                           │
         gravação                        │
             │                           │
             └─────────────┬─────────────┘
                           ▼
                    GOOGLE SHEETS
```

---

# 8. Resumo da arquitetura

O Apps Script pode ser entendido em três níveis principais:

```text
ENTRADA
   ↓
Code.gs
   ↓
identifica o tipo da requisição


PROCESSAMENTO
   ↓
Atendimento.gs
ou
PesquisasSemResultado.gs


APOIO
   ↓
Utils.gs
```

O `Code.gs` centraliza a entrada e o direcionamento das requisições. O `Atendimento.gs` cuida do fluxo de envio de dúvidas, enquanto `PesquisasSemResultado.gs` cuida do registro de pesquisas sem resultado. O `Utils.gs` reúne funções auxiliares utilizadas no processamento.

Essa divisão mantém cada responsabilidade em seu próprio arquivo e deixa o funcionamento do Apps Script mais fácil de visualizar e manter.
