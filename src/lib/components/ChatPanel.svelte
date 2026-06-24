<section class="panel chat-panel">
	<div class="chat-thread" bind:this={threadEl}>
		{#if messages.length === 0}
			<p class="chat-empty">
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
