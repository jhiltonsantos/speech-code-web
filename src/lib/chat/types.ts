export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
	id: string;
	role: ChatRole;
	content: string;
	createdAt: string;
};

export type ChatSession = {
	messages: ChatMessage[];
	updatedAt: string;
};

export function createChatMessage(role: ChatRole, content: string): ChatMessage {
	return {
		id: crypto.randomUUID(),
		role,
		content,
		createdAt: new Date().toISOString()
	};
}

export function emptyChatSession(): ChatSession {
	return {
		messages: [],
		updatedAt: new Date().toISOString()
	};
}
