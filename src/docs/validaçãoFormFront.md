o QuestionForm com Zod no frontend + validação no Apps Script + acessibilidade + UX, mas com uma separação importante:

SEO pertence à página SendQuestion, não ao componente QuestionForm.
O formulário é um componente da página; colocar <title> e <meta> dentro dele mistura responsabilidades.


               FRONTEND
┌──────────────────────────────┐
│ HTML                         │
│ required / maxLength         │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ Zod                          │
│ valida UX                    │
└──────────────┬───────────────┘
               ↓
             fetch
               ↓
               ↓
               ↓
              BACKEND
┌──────────────────────────────┐
│ Apps Script                  │
│                              │
│ valida categoria             │
│ valida dispositivo           │
│ valida tamanho               │
│ honeypot                     │
│ anti-duplicação              │
│ proteção Sheets              │
│ LockService                  │
└──────────────┬───────────────┘
               ↓
        Google Sheets