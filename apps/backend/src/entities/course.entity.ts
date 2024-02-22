import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany,JoinTable, Relation } from 'typeorm';
import { Section } from './section.entity';
import { User } from './user.entity';

// TODO: PREREQUISITE of COURSES

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  cid: number;

  @Column()
  courseName: string;

  @Column()
  department: string;

  @Column()
  courseNumber: number;

  @Column()
  description: string;

  @OneToMany(() => Section, (section) => section.course)
  sections: Relation<Section[]>;

  @ManyToMany(() => User)
  @JoinTable()
  users: Relation<User[]>;
}