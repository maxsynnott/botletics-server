import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { BotService } from '../services/BotService';

export class BotController {
	async index(req: Request, res: Response) {
		const botService = new BotService();

		const bots = await botService.findAll();

		res.json(bots);
	}

	async create(req: Request, res: Response) {
		const botService = new BotService();

		const bot = await botService.create(req.body);

		res.json(bot);
	}
}
