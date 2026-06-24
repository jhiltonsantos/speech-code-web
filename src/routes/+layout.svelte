<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SpeechCode · Tutor RAG</title>
	<meta name="description" content="Assistente de estudos pessoal para Engenharia de Software e Inglês" />
</svelte:head>

<div class="app-shell">
	{@render children()}
</div>

<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import '../app.css';

	let { children }: LayoutProps = $props();
</script>
