recebe
 ↓
valida
 ↓
protege contra fórmula de planilha
 ↓
pega data do servidor
 ↓
grava
 ↓
Status = Nova


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