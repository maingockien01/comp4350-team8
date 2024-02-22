import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany,JoinTable} from 'typeorm';
import { User } from './user.entity';
import { Course} from './course.entity';

@Entity()
export class Degree {
  @PrimaryGeneratedColumn()
  did: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.degree)
  users: User[]

  @ManyToMany(() => Course)
  @JoinTable()
  courses: Course[]
}