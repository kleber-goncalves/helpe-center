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

Code.gs
│
├── SPREADSHEET_ID
├── doGet()
└── doPost()
       │
       ├── Atendimento.gs
       │
       └── PesquisasSemResultado.gs


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


PesquisasSemResultado.gs
│
├── query
├── normalização
├── duplicação
├── LockService
└── gravação


Utils.gs
│
├── cleanText()
├── safeForSheet()
└── createTextResponse()