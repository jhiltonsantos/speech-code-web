export type UploadResponse = {
	message: string;
	filename: string;
	chunks_indexed: number;
};

export type AskResponse = {
	answer: string;
};

export type FastApiError = {
	detail: string | { msg: string }[];
};
