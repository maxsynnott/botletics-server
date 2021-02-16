import { MatchController } from '../controller/MatchController';

const matchRoutes = [
	{
		method: 'post',
		route: '/matches',
		controller: MatchController,
		action: 'create',
	},
];

export default matchRoutes;
