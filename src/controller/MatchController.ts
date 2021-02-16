import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

import { MatchService } from '../service/MatchService';

export class MatchController {
	async create(req: Request, res: Response, next: NextFunction) {
		const user: Partial<User> = req.user;

		const matchService = new MatchService();
		const match = await matchService.create(user.id);

		res.json(match);
	}
}
