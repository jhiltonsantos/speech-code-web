<header class="flex items-start justify-between gap-4 mb-4">
	<PageNav class="!mb-0 flex-1" title="Conversa com o tutor" />
	<button
		type="button"
		class="btn btn-ghost btn-sm btn-outline btn-error shrink-0 mt-0.5"
		onclick={() => chatPanel?.clearHistory()}
	>
		Limpar
	</button>
</header>

<main class="w-full">
	<ChatPanel bind:this={chatPanel} {form} />
</main>

<script lang="ts">
	import ChatPanel from '$lib/components/ChatPanel.svelte';
	import PageNav from '$lib/components/PageNav.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	let chatPanel = $state<ChatPanel | undefined>(undefined);
</script>
