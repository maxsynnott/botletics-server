import { Server as SocketIoServer } from 'socket.io';

// Is there a problem with this implementation? Was hard to find
export const io = new SocketIoServer();

export const initSocketIo = ({ httpServer }) => {
	io.attach(httpServer, {
		cors: {
			origin: 'http://localhost:3000',
		},
	});

	io.on('connection', function (socket) {
		console.log('A user connected');

		socket.emit('from-server', 'hello from server :)');
	});
};
