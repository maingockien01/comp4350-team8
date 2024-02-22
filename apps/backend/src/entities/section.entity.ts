import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany,JoinTable } from 'typeorm';
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
  locationID: number;

  @Column()
  tid: number;

  @Column()
  time: string;

  @Column()
  cid: number;

  @Column()
  professor: string;

  @ManyToOne(() => Course, (course) => course.sections)
  course: Course

  @ManyToOne(() => Term, (term) => term.sections)
  term: Term

  @ManyToOne(() => Location, (location) => location.sections)
  location: Location

  @ManyToMany(() => User)
  @JoinTable()
  users: User[]
}