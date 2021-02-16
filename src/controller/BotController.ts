import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { BotService } from '../service/BotService';

export class BotController {
	async index(request: Request, response: Response, next: NextFunction) {
		const botService = new BotService();

		const bots = await botService.findAll();
		return bots;
	}

	async create(request: Request, response: Response, next: NextFunction) {
		const botService = new BotService();

		const bot = botService.create(request.body);
		return bot;
	}
}
