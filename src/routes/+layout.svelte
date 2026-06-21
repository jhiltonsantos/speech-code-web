<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import '../app.css';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SpeechCode · Tutor RAG</title>
	<meta name="description" content="Assistente de estudos pessoal para Engenharia de Software e Inglês" />
</svelte:head>

<div class="app-shell">
	{@render children()}
</div>

<style>
	.app-shell {
		min-height: 100vh;
		padding: 1.5rem;
		max-width: 1100px;
		margin: 0 auto;
	}
</style>
