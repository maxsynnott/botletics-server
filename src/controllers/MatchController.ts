import { Request, Response } from 'express';
import { User } from '../entities/User';

import { MatchService } from '../services/MatchService';

export class MatchController {
	async index(req: Request, res: Response) {
		const matchService = new MatchService();

		const matches = await matchService.findAll();

		res.json(matches);
	}

	async create(req: Request, res: Response) {
		const user: Partial<User> = req.user;

		const matchService = new MatchService();

		const match = await matchService.create(user.id, 9);

		res.json(match);
	}

	async show(req: Request, res: Response) {
		const { id } = req.params;

		const matchService = new MatchService();

		const match = await matchService.findOne(Number(id));

		res.json(match);
	}

	async run(req: Request, res: Response) {
		const { id } = req.params;

		const matchService = new MatchService();

		matchService.run(Number(id));

		res.json({ running: true });
	}
}
