import { Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToMany,JoinTable, Relation} from 'typeorm';
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
  sections: Relation<Section[]>;

  @ManyToMany(() => Course)
  @JoinTable()
  courses: Relation<Course[]>;
}