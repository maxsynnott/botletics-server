import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Match {
	@PrimaryGeneratedColumn()
	id: number;
}
