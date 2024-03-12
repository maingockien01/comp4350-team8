import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Relation } from 'typeorm';
import { Degree } from './degree.entity';
import { Section } from './section.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	uid: number;

	@Column()
	fullName: string;

	@Column({ unique: true })
	username: string;

	@Column()
	hashPassword: string;

	@ManyToOne(() => Degree, (degree) => degree.users)
	degree: Relation<Degree>;

	@ManyToMany(() => Section, (section) => section.users)
	sections: Relation<Section[]>;
}
