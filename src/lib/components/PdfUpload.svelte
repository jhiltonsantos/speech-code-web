<script lang="ts">
	import { uploadPdf } from '$lib/api/upload';
	import type { UploadResponse } from '$lib/api/types';

	let selectedFile = $state<File | null>(null);
	let uploading = $state(false);
	let result = $state<UploadResponse | null>(null);
	let error = $state<string | null>(null);

	function onFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		selectedFile = input.files?.[0] ?? null;
		result = null;
		error = null;
	}

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!selectedFile) {
			error = 'Selecione um arquivo PDF.';
			return;
		}

		uploading = true;
		error = null;
		result = null;

		try {
			result = await uploadPdf(selectedFile);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Erro ao enviar o PDF.';
		} finally {
			uploading = false;
		}
	}
</script>

<section class="panel">
	<header class="panel-header">
		<span class="badge code">{'{ }'}</span>
		<div>
			<h2>Materiais de estudo</h2>
			<p class="hint">PDF · Programação &amp; Inglês</p>
		</div>
	</header>

	<form class="upload-form" onsubmit={onSubmit}>
		<label class="file-label">
			<input type="file" accept=".pdf,application/pdf" onchange={onFileChange} disabled={uploading} />
			<span>{selectedFile ? selectedFile.name : 'Escolher PDF…'}</span>
		</label>
		<button type="submit" disabled={uploading || !selectedFile}>
			{uploading ? 'Indexando…' : 'Enviar PDF'}
		</button>
	</form>

	{#if uploading}
		<p class="status loading">Extraindo texto e gerando embeddings — pode levar alguns minutos.</p>
	{/if}

	{#if error}
		<p class="status error" role="alert">{error}</p>
	{/if}

	{#if result}
		<div class="status success">
			<p>{result.message}</p>
			<p class="meta">
				<strong>{result.filename}</strong> · {result.chunks_indexed} trechos indexados
			</p>
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

	.badge.code {
		background: color-mix(in srgb, var(--code) 20%, transparent);
		color: var(--code);
	}

	.upload-form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.file-label {
		display: block;
		cursor: pointer;
	}

	.file-label input {
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
	}

	.file-label span {
		display: block;
		padding: 0.65rem 0.85rem;
		background: var(--bg);
		border: 1px dashed var(--border);
		border-radius: var(--radius);
		font-size: 0.9rem;
		color: var(--text-muted);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.file-label:hover span {
		border-color: var(--accent);
		color: var(--text);
	}

	button {
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

	.success {
		background: color-mix(in srgb, var(--success) 12%, transparent);
		color: #86efac;
	}

	.meta {
		margin: 0.5rem 0 0;
		font-size: 0.85rem;
		color: var(--text-muted);
	}
</style>
