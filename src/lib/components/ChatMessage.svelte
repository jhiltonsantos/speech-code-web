<article class="chat-bubble chat-bubble--{message.role}" aria-label="{label}: {message.content}">
	<header class="chat-bubble__meta">
		<span class="chat-bubble__label">{label}</span>
		<time datetime={message.createdAt}>{time}</time>
	</header>
	<p class="chat-bubble__content">{message.content}</p>
</article>

<script lang="ts">
	import type { ChatMessage as ChatMessageType } from '$lib/chat/types';

	type Props = {
		message: ChatMessageType;
	};

	let { message }: Props = $props();

	const label = $derived(message.role === 'user' ? 'Você' : 'Tutor');
	const time = $derived(
		new Date(message.createdAt).toLocaleTimeString('pt-BR', {
			hour: '2-digit',
			minute: '2-digit'
		})
	);
</script>