import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
	Relation,
} from 'typeorm';
import { Degree } from './degree.entity';
import { Course } from './course.entity';
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

	// @Column()
	// did: number;

	@Column({ default: '' })
	pictureProfile: string;

	// @ManyToOne(() => Degree, (degree) => degree.users)
	// degree: Degree;

	// @ManyToMany(() => Course)
	// @JoinTable()
	// courses: Relation<Course[]>;

	// @ManyToMany(() => Section)
	// @JoinTable()
	// sections: Relation<Section[]>;

	constructor(user: Partial<User>) {
		Object.assign(this, user);
	}
}
