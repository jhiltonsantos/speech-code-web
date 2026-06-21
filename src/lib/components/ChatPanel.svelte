<script lang="ts">
	import { enhance } from '$app/forms';

	type FormResult = {
		answer?: string | null;
		error?: string | null;
	};

	type Props = {
		form: FormResult | null | undefined;
	};

	let { form }: Props = $props();

	let submitting = $state(false);
	let question = $state('');
</script>

<section class="panel">
	<header class="panel-header">
		<span class="badge lang">Aa</span>
		<div>
			<h2>Pergunte ao tutor</h2>
			<p class="hint">Respostas com base nos seus PDFs indexados</p>
		</div>
	</header>

	<form
		method="POST"
		action="?/ask"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
		class="chat-form"
	>
		<textarea
			name="question"
			bind:value={question}
			placeholder="Ex.: Quais são os padrões de projeto mais usados?"
			rows="3"
			disabled={submitting}
			required
		></textarea>
		<button type="submit" disabled={submitting || !question.trim()}>
			{submitting ? 'Pensando…' : 'Enviar pergunta'}
		</button>
	</form>

	{#if submitting}
		<p class="status loading">Consultando ChromaDB e gerando resposta com Ollama…</p>
	{/if}

	{#if form?.error}
		<p class="status error" role="alert">{form.error}</p>
	{/if}

	{#if form?.answer}
		<div class="answer">
			<p class="answer-label">Resposta</p>
			<div class="answer-body">{form.answer}</div>
		</div>
	{/if}
</section>

<style>
	.panel {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
	}

	.panel-header {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.panel-header h2 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.hint {
		margin: 0.25rem 0 0;
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2rem;
		height: 2rem;
		border-radius: 6px;
		font-family: var(--mono);
		font-size: 0.85rem;
		font-weight: 600;
	}

	.badge.lang {
		background: color-mix(in srgb, var(--lang) 20%, transparent);
		color: var(--lang);
	}

	.chat-form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex: 1;
	}

	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--bg);
		color: var(--text);
		font-family: var(--font);
		font-size: 0.95rem;
		resize: vertical;
		min-height: 5rem;
	}

	textarea:focus {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
	}

	textarea:disabled {
		opacity: 0.6;
	}

	button {
		align-self: flex-start;
		padding: 0.65rem 1rem;
		border: none;
		border-radius: var(--radius);
		background: var(--accent);
		color: white;
		font-weight: 600;
		font-size: 0.9rem;
		cursor: pointer;
	}

	button:hover:not(:disabled) {
		background: var(--accent-dim);
	}

	button:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.status {
		margin: 0;
		padding: 0.75rem;
		border-radius: var(--radius);
		font-size: 0.9rem;
	}

	.loading {
		background: color-mix(in srgb, var(--accent) 12%, transparent);
		color: var(--text-muted);
	}

	.error {
		background: color-mix(in srgb, var(--error) 15%, transparent);
		color: #fca5a5;
	}

	.answer {
		flex: 1;
		padding: 1rem;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		overflow-y: auto;
		max-height: 24rem;
	}

	.answer-label {
		margin: 0 0 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
	}

	.answer-body {
		margin: 0;
		font-size: 0.95rem;
		white-space: pre-wrap;
		line-height: 1.6;
	}
</style>
