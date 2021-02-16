import { getRepository } from 'typeorm';
import { Bot } from '../entity/Bot';

export class BotService {
	private botRepository = getRepository(Bot);

	async findAll() {
		return this.botRepository.find();
	}

	async save(bot: Bot) {
		return this.botRepository.save(bot);
	}

	async create(attributes: Bot) {
		const bot = new Bot();
		Object.assign(bot, attributes);

		return this.botRepository.save(bot);
	}
}
