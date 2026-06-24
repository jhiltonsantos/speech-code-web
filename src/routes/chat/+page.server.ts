import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getApiBaseUrl } from '$lib/api/config';
import type { AskResponse, FastApiError } from '$lib/api/types';

function parseErrorDetail(body: FastApiError): string {
	if (typeof body.detail === 'string') {
		return body.detail;
	}
	if (Array.isArray(body.detail) && body.detail.length > 0) {
		return body.detail.map((item) => item.msg).join('; ');
	}
	return 'Não foi possível obter uma resposta.';
}

export const actions = {
	ask: async ({ request, fetch }) => {
		const formData = await request.formData();
		const question = formData.get('question')?.toString().trim();

		if (!question) {
			return fail(400, { error: 'Digite uma pergunta.', answer: null, question: null });
		}

		try {
			const body = new URLSearchParams({ question });
			const response = await fetch(`${getApiBaseUrl()}/ask`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body
			});

			if (!response.ok) {
				let message = `Erro na API (${response.status}). Verifique se o backend está rodando.`;
				try {
					const errorBody = (await response.json()) as FastApiError;
					message = parseErrorDetail(errorBody);
				} catch {
					// keep default message
				}
				return fail(response.status, { error: message, answer: null, question: null });
			}

			const data = (await response.json()) as AskResponse;
			return { answer: data.answer, error: null, question };
		} catch {
			return fail(503, {
				error: 'Não foi possível conectar à API em ' + getApiBaseUrl() + '.',
				answer: null,
				question: null
			});
		}
	}
} satisfies Actions;
