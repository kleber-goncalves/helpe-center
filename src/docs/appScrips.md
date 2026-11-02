# Fluxo atual do envio de dúvidas — referência técnica

> **Revisão:** 01/11/2026. O código do frontend, schema e API Vercel está versionado neste repositório. O projeto Google Apps Script e a planilha ficam fora deste GitHub; seus detalhes internos precisam ser conferidos no projeto Google atualmente implantado.

```text
NAVEGADOR
   │
   ▼
QuestionForm
   │ HTML + Zod (UX)
   ▼
POST /api/support
   │
   ├── valida Origin
   ├── limita o body
   ├── honeypot
   ├── rate limit em memória (melhor esforço)
   ├── Zod server-side
   ▼
SUPPORT_APPS_SCRIPT_ENDPOINT
   ▼
Google Apps Script (externo ao repositório)
   ▼
Google Sheets (externo ao repositório)
```

A página `SendQuestion` cuida de SEO e composição; `QuestionForm` cuida dos campos, estados, validação e envio. A API Vercel está em `api/support.js`. Não presumir que regras internas de anti-duplicação, LockService, proteção contra fórmulas, abas ou status continuam ativas sem verificar a implantação externa.