import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Game } from './Game';

@Entity()
export class Match {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Game, (game) => game.match)
	games: Game[];
}
