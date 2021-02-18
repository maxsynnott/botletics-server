import axios from 'axios';
import { Match } from '../entities/Match';
import { Chess } from 'chess.js';
import { getRepository } from 'typeorm';
import { Game } from '../entities/Game';
import {
	ChessActionRequest,
	ChessActionResponse,
	EndpointRequest,
	EndpointResponse,
} from '../types';

export class ChessService {
	private gameRepository = getRepository(Game);

	// TODO: Optimize for performance
	async run(match: Match): Promise<void> {
		let { games } = match;

		// TODO: Retrieve from match users
		// TODO: Make requests to both players
		const url = 'http://localhost:10000/';

		let moveCount = 0;
		const moveLimit = 300;
		while (games.length && moveCount < moveLimit) {
			console.log('Move count: ', moveCount);
			console.log('Game length: ', games.length);

			const requestBody = this.getRequestBody(games);

			const {
				data: { actions },
			} = await axios.post<EndpointResponse<ChessActionResponse>>(
				url,
				requestBody,
			);

			games = await Promise.all<Game>(
				games.map((game) => {
					const action = actions.find(
						(action) => action.id === game.id,
					);

					if (!action) return Promise.resolve(game);

					const { history } = game;
					const fen = history[0];
					const chess = new Chess(fen);
					chess.move(action.response.move);
					history.unshift(chess.fen());

					return this.gameRepository.save(game);
				}),
			);

			games = games.filter((game) => !this.isGameOver(game));

			moveCount++;
		}
	}

	private getRequestBody(games: Game[]): EndpointRequest<ChessActionRequest> {
		const actionRequests = games.reduce<ChessActionRequest[]>(
			(requests, game) => {
				if (this.isGameOver(game)) return requests;

				const { id, history } = game;
				return [
					...requests,
					{
						id,
						type: 'move',
						context: {
							fen: history[0],
							history: history.slice(1),
						},
					},
				];
			},
			[],
		);

		return {
			actions: actionRequests,
		};
	}

	private isGameOver({ history }: Game) {
		const chess = new Chess(history[0]);
		return chess.game_over();
	}
}
