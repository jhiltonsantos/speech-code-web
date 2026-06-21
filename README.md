# speech-code-web

Frontend SvelteKit do assistente de estudos **speech-code** — UI conectada ao RAG local (FastAPI + LangChain + ChromaDB + Ollama).

## Pré-requisitos

- Node.js 20+ (20.19+ recomendado para Vite 8; este projeto usa Vite 6 para compatibilidade)
- API rodando em [speech-code-api](../speech-code-api/) (`http://127.0.0.1:8000`)
- Ollama na bandeja com `llama3` e `nomic-embed-text`

## Configuração

```powershell
cd speech-code-web
copy .env.example .env
npm install
```

Opcional — altere a URL da API em `.env`:

```
PUBLIC_API_URL=http://127.0.0.1:8000
```

## Como rodar

Terminal 1 — API:

```powershell
cd ..\speech-code-api
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Terminal 2 — Frontend:

```powershell
cd speech-code-web
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

## Estrutura

```
speech-code-web/
├── src/
│   ├── lib/
│   │   ├── api/              # config, types, uploadPdf()
│   │   └── components/       # PdfUpload, ChatPanel
│   └── routes/
│       ├── +page.svelte      # Layout principal
│       ├── +page.server.ts   # Form Action ask → POST /ask (SSR)
│       └── +layout.svelte
└── .env.example
```

## Fluxo de integração

| Ação | Onde | Como chama a API |
|------|------|------------------|
| Upload PDF | `PdfUpload.svelte` | `fetch` client-side → `POST /upload` |
| Pergunta | `ChatPanel.svelte` | Form Action SSR → `POST /ask` via `+page.server.ts` |

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (porta 5173) |
| `npm run build` | Build de produção |
| `npm run check` | Verificação TypeScript + Svelte |

## Critérios de aceite (Fases 3 e 4)

- [x] UI minimalista com upload + chat
- [x] Upload envia PDF e exibe `chunks_indexed`
- [x] Pergunta usa Form Action + `use:enhance` (sem reload completo)
- [x] Loading e mensagens de erro na UI
- [x] CORS da API permite `localhost:5173`

## Próximos passos

**Fase 5** — histórico de conversa multi-turno. Consulte [../docs/roadmap.md](../docs/roadmap.md).
