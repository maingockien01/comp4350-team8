import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, Relation } from 'typeorm';
import { Section } from './section.entity';
import { User } from './user.entity';
import { HasPrerequisites } from '@team8/types/domain/roadmap.model';

// TODO: PREREQUISITE of COURSES

@Entity()
export class Course implements HasPrerequisites {
	@PrimaryGeneratedColumn()
	cid: number;

	@Column()
	courseNumber: string;

	@Column()
	courseName: string;

	@Column()
	department: string;

	@Column()
	description: string;

	@OneToMany(() => Section, (section) => section.course)
	sections: Relation<Section[]>;

	@ManyToMany(() => Course)
	@JoinTable()
	prerequisites: Relation<Course[]>;
}
