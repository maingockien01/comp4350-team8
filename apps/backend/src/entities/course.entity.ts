import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Relation,
  ManyToOne,
} from 'typeorm';
import {Section} from './section.entity';
import {Degree} from './degree.entity';
import {Term} from './term.entity';
import {Department} from './department.entity';

@Entity()
/**
 * Represents a course entity.
 */
export class Course {
  @PrimaryGeneratedColumn()
    cid: number;

  @ManyToOne(() => Department, {
    eager: true,
  })
  @JoinTable()
    department: Relation<Department>;

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
  @JoinTable({name: 'courses_prerequisite_relation'})
    prerequisites: Relation<Course[]>;

  @ManyToMany(() => Term, (term) => term.courses)
    terms: Relation<Term[]>;
}
