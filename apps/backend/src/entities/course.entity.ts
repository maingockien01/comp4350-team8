import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, Relation } from 'typeorm';
import { Section } from './section.entity';
import { HasPrerequisites } from '@team8/types/domain/roadmap.model';
import { Degree } from './degree.entity';
import { Term } from './term.entity';
import { User } from './user.entity';

// TODO: PREREQUISITE of COURSES

@Entity()
export class Course implements HasPrerequisites {
	@PrimaryGeneratedColumn()
	cid: number;

	@Column()
	department: string;

	@Column()
	courseNumber: number;

	@Column()
	courseName: string;

	@Column()
	description: string;

	@ManyToMany(() => Degree, (degree) => degree.recommendedCourses)
	degrees: Relation<Degree[]>;

	@OneToMany(() => Section, (section) => section.course)
	sections: Relation<Section[]>;

	@ManyToMany(() => Course, (course) => course.prerequisites)
	dependents: Relation<Course[]>;

	@ManyToMany(() => Course, (course) => course.dependents)
	@JoinTable({ name: 'courses_prerequisite_relation' })
	prerequisites: Relation<Course[]>;

	@ManyToMany(() => Term, (term) => term.courses)
	terms: Relation<Term[]>;

	@ManyToMany(() => User, (user) => user.plannedCourses)
	@JoinTable()
	inPlanOfUsers: Relation<User[]>;
}
