import { BotController } from '../controller/BotController';

const botRoutes = [
	{
		method: 'get',
		route: '/bots',
		controller: BotController,
		action: 'index',
	},
	{
		method: 'post',
		route: '/bots',
		controller: BotController,
		action: 'create',
	},
];

export default botRoutes;
