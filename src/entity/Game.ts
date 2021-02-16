import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Match } from './Match';

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Match, (match) => match.games)
	match: Match;

	@Column('text', {
		array: true,
		// Equals ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]
		default: '{"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}',
	})
	history: string[];
}
