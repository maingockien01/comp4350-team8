import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Relation,
} from 'typeorm';
import {Course} from './course.entity';
import {Location} from './location.entity';
import {Term} from './term.entity';
import {User} from './user.entity';

@Entity()
/**
 * Represents a section entity.
 */
export class Section {
  @PrimaryGeneratedColumn()
    sid: number;

  @Column()
    sectionName: string;

  // Start time of the section
  @Column()
    time: string;

  @Column()
    professor: string;

  @ManyToOne(() => Course, (course) => course.sections)
    course: Relation<Course>;

  @ManyToOne(() => Term, (term) => term.sections, {
    eager: true,
  })
    term: Relation<Term>;

  @ManyToOne(() => Location, (location) => location.sections, {
    eager: true,
  })
    location: Relation<Location>;

  @ManyToMany(() => User, (user) => user.sections)
  @JoinTable({name: 'sections_contain_users_relation'})
    users: Relation<User[]>;

  @ManyToMany(() => User, (user) => user.doneSections)
  @JoinTable({name: 'doneSections_contain_users_relation'})
    doneUsers: Relation<User[]>;
}
