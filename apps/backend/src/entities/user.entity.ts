import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany,JoinTable, Relation} from 'typeorm';
import { Degree } from './degree.entity';
import { Course} from './course.entity';
import { Section } from './section.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  fullName: string;

  @Column()
  username: string;

  @Column()
  hashPassword: string;

  @Column()
  pictureProfile: string;

  @ManyToOne(() => Degree, (degree) => degree.users)
  degree: Degree

  @ManyToMany(() => Course)
  @JoinTable()
  courses: Relation<Course[]>;

  @ManyToMany(() => Section)
  @JoinTable()
  sections: Relation<Section[]>;
}