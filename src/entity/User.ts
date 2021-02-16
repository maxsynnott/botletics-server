import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bot } from './Bot';

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

	@OneToMany((type) => Bot, (bot) => bot.user)
	bots: Bot[];
}
