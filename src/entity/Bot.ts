import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

export enum BotType {
	CHESS = 'chess',
}

@Entity()
export class Bot {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	endpoint: string;

	@Column()
	type: BotType;

	@ManyToOne((type) => User, (user) => user.bots)
	user: User;
}
