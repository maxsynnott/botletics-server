import { config } from 'dotenv';
config();

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { router } from './routers';
import { initialize } from './initializers';
import { createServer } from 'http';

createConnection()
	.then(async () => {
		const app = express();
		const httpServer = createServer(app);

		initialize({ app, httpServer });

		app.use(router);

		const port = process.env.PORT || 8080;
		httpServer.listen(port, () => {
			console.log(`Botletics server listening on port ${port}`);
		});
	})
	.catch((error) => console.log(error));
