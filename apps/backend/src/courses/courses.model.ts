import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Course {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	code: string;

  @Column()
  @OneToMany(type => Course, course => course.degree)
  degree: string;

  @Column()
  term: string;
}
