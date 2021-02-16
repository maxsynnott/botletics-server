import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { Bot } from './Bot';
import { Match } from './Match';

export enum ThirdPartyProvider {
	GOOGLE = 'google',
}

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	thirdPartyId: string;

	@Column()
	thirdPartyProvider: ThirdPartyProvider;

	@OneToMany(() => Bot, (bot) => bot.user)
	bots: Bot[];

	@ManyToMany(() => Match, (match) => match.users)
	@JoinTable()
	matches: Match[];
}
