import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Game } from './Game';
import { User } from './User';

@Entity()
export class Match {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Game, (game) => game.match, { cascade: true })
	games: Game[];

	@ManyToMany(() => User, (user) => user.matches)
	users: User[];
}
