import botRoutes from './botRoutes';
import userRoutes from './userRoutes';

const routes = [...userRoutes, ...botRoutes];

export default routes;
