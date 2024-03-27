import {Injectable} from '@nestjs/common';
import {
  InvalidRoadmapException,
  Roadmap,
} from '@team8/types/domain/roadmap.model';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';
import {In, Repository} from 'typeorm';
import {Course} from '../entities/course.entity';

@Injectable()
/**
 * The class is a service provider for the personal roadmap.
 */
export class PersonalRoadmapService {
  /**
   * Creates an instance of the PersonalRoadmapService class.
   * @param {Repository<User>} userRepository
   * @param {Repository<Course>} courseRepository
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  /**
   * Retrieves the personal roadmap for the user.
   * @param {number} userId - The ID of the user.
   * @return {Promise<Roadmap>}
   */
  async getPersonalRoadmap(userId: number): Promise<Roadmap> {
    const user = await this.userRepository.findOneOrFail({
      where: {
        uid: userId,
      },
      relations: {
        plannedCourses: {
          prerequisites: true,
        },
      },
    });

    return new Roadmap(user.plannedCourses);
  }

  /**
   * Updates the personal roadmap for the user.
   * @param {number} userId - The ID of the user.
   * @param {number[]} cids - The IDs of the courses.
   * @return {Promise<Roadmap>}
   * @throws {InvalidRoadmapException} if the roadmap is invalid.
   */
  async savePersonalRoadmap(userId: number, cids: number[]): Promise<Roadmap> {
    const courses = await this.courseRepository.find({
      where: {
        cid: In(cids),
      },
      relations: {
        prerequisites: true,
      },
    });

    if (courses.length !== cids.length) {
      throw new Error('Some courses do not exist');
    }

    const roadmap = new Roadmap(courses);

    if (!roadmap.isValid()) {
      throw new InvalidRoadmapException();
    }

    const user = await this.userRepository.findOneOrFail({
      where: {
        uid: userId,
      },
    });

    user.plannedCourses = courses;

    await this.userRepository.save(user);

    return roadmap;
  }
}
