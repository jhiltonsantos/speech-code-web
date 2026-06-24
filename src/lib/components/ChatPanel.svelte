<section class="card bg-base-200 border border-base-300 min-h-112">
	<div class="card-body gap-4">
		<div
			class="flex-1 flex flex-col gap-3 min-h-64 max-h-112 overflow-y-auto p-1"
			bind:this={threadEl}
		>
			{#if messages.length === 0}
				<p class="m-auto max-w-80 text-center text-sm text-base-content/60">
					Nenhuma mensagem ainda. Faça uma pergunta sobre os PDFs que você indexou.
				</p>
			{:else}
				{#each messages as message (message.id)}
					<ChatMessage {message} />
				{/each}
			{/if}
		</div>

		<form
			method="POST"
			action="?/ask"
			use:enhance={() => {
				submitting = true;
				return async ({ result, update }) => {
					await update();
					submitting = false;

					if (result.type === 'success') {
						const data = result.data as FormResult;
						if (data.answer && data.question) {
							appendExchange(data.question, data.answer);
							question = '';
						}
					}
				};
			}}
			class="flex flex-col gap-3"
		>
			<textarea
				name="question"
				class="textarea textarea-bordered w-full min-h-20 resize-y bg-base-100"
				bind:value={question}
				placeholder="Ex.: Quais são os padrões de projeto mais usados?"
				rows="3"
				disabled={submitting}
				required
			></textarea>
			<button
				type="submit"
				class="btn btn-primary self-start"
				disabled={submitting || !question.trim()}
			>
				{submitting ? 'Pensando…' : 'Enviar pergunta'}
			</button>
		</form>

		{#if submitting}
			<div role="status" class="alert alert-info text-sm">
				<span class="loading loading-spinner loading-sm"></span>
				<span>Consultando ChromaDB e gerando resposta com Ollama…</span>
			</div>
		{/if}

		{#if form?.error}
			<div role="alert" class="alert alert-error text-sm">
				<span>{form.error}</span>
			</div>
		{/if}
	</div>
</section>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { clearChatSession, loadChatSession, saveChatSession } from '$lib/chat/storage';
	import { createChatMessage, type ChatMessage as ChatMessageType } from '$lib/chat/types';
	import ChatMessage from './ChatMessage.svelte';

	type FormResult = {
		answer?: string | null;
		error?: string | null;
		question?: string | null;
	};

	type Props = {
		form: FormResult | null | undefined;
	};

	let { form }: Props = $props();

	let submitting = $state(false);
	let question = $state('');
	let messages = $state<ChatMessageType[]>([]);
	let threadEl = $state<HTMLElement | null>(null);

	onMount(() => {
		messages = loadChatSession().messages;
	});

	$effect(() => {
		if (!threadEl || messages.length === 0) return;
		threadEl.scrollTop = threadEl.scrollHeight;
	});

	export function clearHistory() {
		if (!confirm('Limpar todo o histórico desta conversa?')) {
			return;
		}
		messages = [];
		clearChatSession();
	}

	function persistMessages(next: ChatMessageType[]) {
		messages = next;
		saveChatSession({ messages: next, updatedAt: new Date().toISOString() });
	}

	function appendExchange(userContent: string, assistantContent: string) {
		persistMessages([
			...messages,
			createChatMessage('user', userContent),
			createChatMessage('assistant', assistantContent)
		]);
	}
</script>
