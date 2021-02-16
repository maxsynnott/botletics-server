import { config } from 'dotenv';
config();

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { router } from './router';
import { initialize } from './initializer';

createConnection()
	.then(async () => {
		// create express app
		const app = express();

		initialize(app);

		// register express routes from defined application routes
		app.use(router);

		// start express server
		const port = process.env.PORT || 8080;
		app.listen(port, () => {
			console.log(`Botletics server listening on port ${port}`);
		});
	})
	.catch((error) => console.log(error));
