import { ShortMove } from 'chess.js';

export interface EndpointRequest<T = ActionRequest> {
	actions: T[];
}

interface ActionRequest {
	id: number;
	type: string;
	context: Record<string, any>;
}

export interface ChessActionRequest extends ActionRequest {
	type: 'move'; // | 'others...'
	context: ChessActionRequestContext;
}

interface ChessActionRequestContext {
	fen: string;
	history: string[];
}

export interface EndpointResponse<T = ActionResponse> {
	actions: T[];
}

interface ActionResponse {
	id: number;
	response: Record<string, any>;
}

export interface ChessActionResponse extends ActionResponse {
	response: {
		move: ShortMove;
	};
}
