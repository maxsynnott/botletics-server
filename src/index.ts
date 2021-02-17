import { config } from 'dotenv';
config();

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { router } from './router';
import { initialize } from './initializer';
import { createServer } from 'http';
import { Server as SocketsServer, Socket } from 'socket.io';

createConnection()
	.then(async () => {
		const app = express();
		const httpServer = createServer(app);

		const io = new SocketsServer(httpServer, {
			cors: {
				origin: 'http://localhost:3000',
			},
		});

		io.on('connection', (socket: Socket) => {
			console.log('User Connected');

			socket.emit('from-server', 'Hello Client :)');
		});

		initialize(app);

		app.use(router);

		const port = process.env.PORT || 8080;
		httpServer.listen(port, () => {
			console.log(`Botletics server listening on port ${port}`);
		});
	})
	.catch((error) => console.log(error));
