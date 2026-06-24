<div
	class="chat {message.role === 'user' ? 'chat-end' : 'chat-start'}"
	aria-label="{label}: {message.content}"
>
	<div class="chat-header text-xs opacity-70">
		{label}
		<time class="text-xs" datetime={message.createdAt}>{time}</time>
	</div>
	<div
		class="chat-bubble whitespace-pre-wrap leading-relaxed {message.role === 'user'
			? 'chat-bubble-primary'
			: 'chat-bubble-neutral'}"
	>
		{message.content}
	</div>
</div>

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
