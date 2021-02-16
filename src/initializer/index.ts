import { initMiddleware } from './middlewareInitializer';
import { initPassport } from './passportInitializer';

export const initialize = (app) => {
	// Order is important
	const initFunctions = [initMiddleware, initPassport];

	initFunctions.forEach((initFunction) => initFunction(app));
};
