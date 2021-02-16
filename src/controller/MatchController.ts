import { NextFunction, Request, Response } from 'express';

import { MatchService } from '../service/MatchService';

export class MatchController {
	private matchService = new MatchService();

	async create(request: Request, response: Response, next: NextFunction) {
		const match = await this.matchService.create(request.user.id);
		return match;
	}
}
