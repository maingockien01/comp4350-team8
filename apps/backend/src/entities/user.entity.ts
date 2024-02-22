import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany,JoinTable} from 'typeorm';
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
  did: number;

  @Column()
  pictureProfile: string;

  @ManyToOne(() => Degree, (degree) => degree.users)
  degree: Degree

  @ManyToMany(() => Course)
  @JoinTable()
  courses: Course[]

  @ManyToMany(() => Section)
  @JoinTable()
  sections: Section[]
}