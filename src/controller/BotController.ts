import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Bot } from '../entity/Bot';

export class BotController {
	private botRepository = getRepository(Bot);

	async index(request: Request, response: Response, next: NextFunction) {
		return this.botRepository.find();
	}

	async create(request: Request, response: Response, next: NextFunction) {
		return this.botRepository.save(request.body);
	}
}
