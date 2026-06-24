# SpeechCode Web

Frontend SvelteKit do assistente de estudos **SpeechCode** — UI conectada ao RAG local (FastAPI + LangChain + ChromaDB + Ollama).

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

```shell
cd ..\speech-code-api
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Terminal 2 — Frontend:

```shell
cd speech-code-web
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Home com dois cards — upload de PDF e chat com o tutor |
| `/upload` | Envio e indexação de PDF no ChromaDB |
| `/chat` | Conversa com thread de mensagens e histórico persistido |

## Estrutura

```
speech-code-web/
├── src/
│   ├── lib/
│   │   ├── api/              # config, types, uploadPdf()
│   │   ├── chat/             # types + localStorage do histórico
│   │   └── components/       # ActionCard, ChatPanel, PdfUpload, etc.
│   └── routes/
│       ├── +page.svelte      # Home (cards de navegação)
│       ├── upload/+page.svelte
│       └── chat/
│           ├── +page.svelte
│           └── +page.server.ts   # Form Action ask → POST /ask (SSR)
└── .env.example
```

## Fluxo de integração

| Ação | Onde | Como chama a API |
|------|------|------------------|
| Upload PDF | `/upload` → `PdfUpload.svelte` | `fetch` client-side → `POST /upload` |
| Pergunta | `/chat` → `ChatPanel.svelte` | Form Action SSR → `POST /ask` via `chat/+page.server.ts` |

## Histórico de conversas

O chat em `/chat` mantém um thread de mensagens (usuário + tutor) persistido em **localStorage** (`speech-code:chat-history`).

| Comportamento | Detalhe |
|---------------|---------|
| Persistência | Mesmo navegador/dispositivo; sobrevive ao recarregar a página |
| Limpar | Botão "Limpar" remove mensagens e apaga o storage |
| Erros da API | Não entram no histórico — exibidos como alerta temporário |
| Follow-up contextual | A API ainda recebe só a pergunta atual (Fase 5 do roadmap) |

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (porta 5173) |
| `npm run build` | Build de produção |
| `npm run check` | Verificação TypeScript + Svelte |
