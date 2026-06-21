<script lang="ts">
	import ChatPanel from '$lib/components/ChatPanel.svelte';
	import PdfUpload from '$lib/components/PdfUpload.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<header class="hero">
	<h1>SpeechCode</h1>
	<p>Assistente de estudos pessoal · RAG para Engenharia de Software e Inglês</p>
</header>

<main class="grid">
	<PdfUpload />
	<ChatPanel {form} />
</main>

<style>
	.hero {
		margin-bottom: 1.5rem;
	}

	.hero h1 {
		margin: 0;
		font-size: 1.75rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.hero p {
		margin: 0.35rem 0 0;
		color: var(--text-muted);
		font-size: 0.95rem;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		align-items: stretch;
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
