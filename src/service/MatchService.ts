import { getRepository } from 'typeorm';
import { Game } from '../entity/Game';
import { Match } from '../entity/Match';

export class MatchService {
	private matchRepository = getRepository(Match);

	async create(userId: string, numGames: number = 4) {
		const match = new Match();

		const games = Array.from(Array(numGames), () => new Game());
		match.games = games;

		return this.matchRepository.save(match);
	}
}
