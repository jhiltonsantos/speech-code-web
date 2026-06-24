<section class="panel">
	<header class="panel-header">
		<span class="badge badge--code">{'{ }'}</span>
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
