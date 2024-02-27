import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany,JoinTable, Relation } from 'typeorm';
import { Course } from './course.entity';
import { Location } from './location.entity';
import { Term } from './term.entity';
import { User } from './user.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  sid: number;

  @Column()
  sectionName: string;

  @Column()
  time: string;

  @Column()
  professor: string;

  @ManyToOne(() => Course, (course) => course.sections)
  course: Relation<Course>;

  @ManyToOne(() => Term, (term) => term.sections)
  term: Relation<Term>;

  @ManyToOne(() => Location, (location) => location.sections)
  location: Relation<Location>;

  @ManyToMany(() => User)
  @JoinTable()
  users: Relation<User[]>;
}