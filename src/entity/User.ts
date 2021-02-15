import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
