import botRoutes from './botRoutes';
import matchRoutes from './matchRoutes';
import userRoutes from './userRoutes';

const routes = [...userRoutes, ...botRoutes, ...matchRoutes];

export default routes;
