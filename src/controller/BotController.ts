import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { BotService } from '../service/BotService';

export class BotController {
	private botService = new BotService();

	async index(request: Request, response: Response, next: NextFunction) {
		const bots = await this.botService.findAll();
		return bots;
	}

	async create(request: Request, response: Response, next: NextFunction) {
		const bot = this.botService.create(request.body);
		return bot;
	}
}
