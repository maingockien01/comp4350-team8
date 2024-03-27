import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOptionsRelations, FindOptionsWhere, Repository} from 'typeorm';
import {Course} from '../entities/course.entity';
import {CourseDTO} from '@team8/types/dtos/course/course.dto';

@Injectable()
/**
 * The CoursesService class is a service provider for the Course entity.
 */
export class CoursesService {
  /**
   * Creates an instance of the CoursesService class.
   * @param {Repository<Course>} courseRepository
   */
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  /**
   * Retrieves all courses from the database.
   * @return {Promise<CourseDTO[]>}
   */
  async findAll(): Promise<CourseDTO[]> {
    return await this.courseRepository.find({
      relations: {
        prerequisites: true,
        department: true,
      },
    });
  }

  /**
   * Retrieves the current term from the database.
   * @param {string} departmentName - The name of the department.
   * @return {Promise<number>}
   */
  async getCoursesByDepartment(departmentName: string): Promise<Course[]> {
    return this.getCourses({department: {name: departmentName}});
  }

  /**
   * Retrieves all courses from the database based on the provided criteria.
   * @param {Partial<Course>} criteria - The criteria to filter the courses.
   * @param {FindOptionsRelations<Course>} overrideRelations
   * @return {Promise<CourseDTO[]>}
   */
  async getCourses(
      criteria: FindOptionsWhere<Course>,
      overrideRelations: FindOptionsRelations<Course> = {},
  ): Promise<Course[]> {
    return await this.courseRepository.find({
      where: {
        ...criteria,
      },
      relations: {
        department: true,
        prerequisites: true,
        ...overrideRelations,
      },
    });
  }

  /**
   * Retrieves a course by its id.
   * @param {number} cid - The course id.
   * @return {Promise<CourseDTO>}
   */
  getCourseById(cid: number): Promise<Course> {
    return this.getCourse({cid});
  }

  /**
   * Retrieves a course from the database based on the provided criteria.
   * @param {Partial<Course>} criteria - The criteria to filter the course.
   * @param {FindOptionsRelations<Course>} overrideRelations
   * @return {Promise<CourseDTO>}
   */
  async getCourse(
      criteria: FindOptionsWhere<Course>,
      overrideRelations: FindOptionsRelations<Course> = {},
  ): Promise<Course> {
    return await this.courseRepository.findOneOrFail({
      where: {
        ...criteria,
      },
      relations: {
        prerequisites: true,
        department: true,
        sections: true,
        terms: true,
        ...overrideRelations,
      },
    });
  }
}
