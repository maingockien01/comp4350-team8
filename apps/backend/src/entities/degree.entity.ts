import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany,JoinTable, Relation} from 'typeorm';
import { User } from './user.entity';
import { Course} from './course.entity';
import { InvalidRoadmapException, Roadmap } from '@team8/types/domain/roadmap.model';

@Entity()
export class Degree {
  @PrimaryGeneratedColumn()
  did: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.degree)
  users: Relation<User[]>;

  @ManyToMany(() => Course)
  @JoinTable()
  recommendedCourses: Relation<Course[]>;

  get roadmap(): Roadmap {
    return new Roadmap(this.recommendedCourses);
  }

  set roadmap(courses: Course[]) {
    const roadmap = new Roadmap(courses);
    if (roadmap.isValid()) {
      this.recommendedCourses = courses;
    } else {
      throw new InvalidRoadmapException();
    }
  }
}