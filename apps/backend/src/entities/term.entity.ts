import { Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToMany,JoinTable} from 'typeorm';
import { Section } from './section.entity';
import { Course } from './course.entity';

@Entity()
export class Term {
  @PrimaryGeneratedColumn()
  tid: number;

  @Column()
  year: number;

  @Column()
  season: string;

  @OneToMany(() => Section, (section) => section.term)
  sections: Section[]

  @ManyToMany(() => Course)
  @JoinTable()
  courses: Course[]
}