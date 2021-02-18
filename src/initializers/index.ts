import { Application } from 'express';
import { Server } from 'http';
import { initMiddleware } from './middlewareInitializer';
import { initPassport } from './passportInitializer';
import { initSocketIo } from './socketIoInitializer';

interface initializeArguments {
	app: Application;
	httpServer: Server;
}

export const initialize = (context: initializeArguments) => {
	// Order is important
	const initFunctions = [initMiddleware, initPassport, initSocketIo];

	initFunctions.forEach((initFunction) => initFunction(context));
};
