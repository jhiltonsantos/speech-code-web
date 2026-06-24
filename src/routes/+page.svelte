<header class="hero">
	<h1>SpeechCode</h1>
	<p>Assistente de estudos pessoal · RAG para Engenharia de Software e Inglês</p>
</header>

<main class="cards-grid">
	<ActionCard
		href="/upload"
		title="Enviar PDF"
		description="Indexe materiais de programação e inglês no ChromaDB para consultas futuras."
		badge={'{ }'}
		badgeVariant="code"
		cta="Abrir →"
	/>
	<ActionCard
		href="/chat"
		title="Conversar com o tutor"
		description="Faça perguntas com base nos documentos que você já enviou."
		badge="Aa"
		badgeVariant="lang"
		cta="Iniciar →"
	/>
</main>

<script lang="ts">
	import ActionCard from '$lib/components/ActionCard.svelte';
</script>

<style>
	.hero {
		margin-bottom: 2rem;
		text-align: center;
	}

	.hero h1 {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.hero p {
		margin: 0.5rem auto 0;
		max-width: 36rem;
		color: var(--text-muted);
		font-size: 1rem;
	}
</style>
