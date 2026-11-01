> **Contexto vigente (2026-11-01):** este diagrama representa a parte externa de processamento no Google Apps Script. No fluxo atual do site, o formulário React não chama o Apps Script diretamente: envia para `POST /api/support` na Vercel, que valida novamente e encaminha para `SUPPORT_APPS_SCRIPT_ENDPOINT`. A API também recebe pesquisas sem resultado. O código do Apps Script é mantido fora deste repositório.

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



                INTERNET
                   │
                   ▼
              Vercel API
                   │
          ┌────────┼────────┐
          │        │        │
        Zod    Rate limit  Origin
          │
          ▼
        Apps Script
          │
      ┌───┼────┐
      │   │    │
    Zod  Honeypot  Duplicate
      │
      ▼
   Google Sheets
