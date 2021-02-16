import { getRepository } from 'typeorm';
import { Game } from '../entity/Game';
import { Match } from '../entity/Match';
import { ChessService } from './ChessService';

export class MatchService {
	private matchRepository = getRepository(Match);

	async create(userId: number, numGames: number = 4) {
		const match = new Match();

		const games = Array.from(Array(numGames), () => new Game());
		match.games = games;

		return this.matchRepository.save(match);
	}

	async findOne(id: number) {
		return this.matchRepository.findOne(id, { relations: ['games'] });
	}

	async runRound(id: number) {
		const chessService = new ChessService();

		let match = await this.matchRepository.findOne(id, {
			relations: ['games'],
		});
		match = await chessService.runRound(match);

		return this.matchRepository.save(match);
	}
}
