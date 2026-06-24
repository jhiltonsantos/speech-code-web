<header class="chat-page-header">
	<PageNav title="Conversa com o tutor" />
	<button type="button" class="btn-ghost" onclick={() => chatPanel?.clearHistory()}>
		Limpar
	</button>
</header>

<main class="page-content page-content--chat">
	<ChatPanel bind:this={chatPanel} {form} />
</main>

<script lang="ts">
	import ChatPanel from '$lib/components/ChatPanel.svelte';
	import PageNav from '$lib/components/PageNav.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	let chatPanel = $state<ChatPanel | undefined>(undefined);
</script>

<style>
	.chat-page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.chat-page-header :global(.page-nav) {
		margin-bottom: 0;
		flex: 1;
	}

	.btn-ghost {
		flex-shrink: 0;
		margin-top: 0.15rem;
		padding: 0.45rem 0.75rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: transparent;
		color: var(--text-muted);
		font-size: 0.85rem;
		cursor: pointer;
	}

	.btn-ghost:hover {
		border-color: var(--error);
		color: #fca5a5;
	}
</style>
