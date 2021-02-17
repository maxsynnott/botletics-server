import axios from 'axios';
import { Match } from '../entities/Match';
import { Chess } from 'chess.js';

export class ChessService {
	async runRound(match: Match) {
		const { games } = match;

		// TODO: Retrieve from match users
		// TODO: Make requests to both players
		const endpoint = 'http://localhost:10000/';
		const moveRequests = games
			.map(({ id, history }) => {
				const fen = history[history.length - 1];
				return { id, fen };
			})
			.filter(({ fen }) => {
				const chess = new Chess(fen);
				return !chess.game_over();
			});

		const { data: responses } = await axios.post<
			{ id: number; move: string }[]
		>(endpoint, { games: moveRequests });

		responses.forEach(({ id, move }) => {
			const { history } = games.find((game) => game.id === id);
			const fen = history[history.length - 1];
			const chess = new Chess(fen);
			chess.move(move);
			history.push(chess.fen());
		});

		match.games = games;

		return match;
	}
}
