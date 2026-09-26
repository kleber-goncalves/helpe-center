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


1. ✅ Comportamento do botão flutuante
2. ✅ Painel desktop
3. ✅ Tela/painel mobile
4. ✅ Teclado + foco
5. ✅ leitor de tela
6. ✅ estados loading/error
7. ✅ reduced motion
8. ✅ SEO das páginas
9. ✅ meta tags
10. ✅ sitemap / robots / canonical
11. ✅ teste Lighthouse