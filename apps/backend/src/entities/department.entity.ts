import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Department {
	@PrimaryGeneratedColumn()
	did: number;

	@Column()
	name: string;

	@Column()
	abbreviation: string;
}
