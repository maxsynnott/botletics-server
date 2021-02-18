import {
	EntitySubscriberInterface,
	EventSubscriber,
	UpdateEvent,
} from 'typeorm';
import { io } from '../initializers/socketIoInitializer';
import { Game } from '../entities/Game';

@EventSubscriber()
export class GameSubscriber implements EntitySubscriberInterface<Game> {
	listenTo() {
		return Game;
	}

	afterUpdate(event: UpdateEvent<Game>) {
		io.sockets.emit('games', event.entity);
	}
}
