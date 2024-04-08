import {INestApplication} from '@nestjs/common';
import {randomStringGenerator}
  from '@nestjs/common/utils/random-string-generator.util';
import {Course} from '../../../src/entities/course.entity';
import {Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {saveDepartment} from './Department';

/**
 * Saves a course entity to the database.
 * @param {INestApplication} app
 * The Nest application instance.
 * @param {Partial<Course>} overrides
 * Optional overrides for the course entity.
 * @return {Promise<Course>}
 * A promise that resolves to the saved course entity.
 */
export async function saveCourse(
    app: INestApplication,
    overrides: Partial<Course> = {},
): Promise<Course> {
  const department = await saveDepartment(app);
  return app.get<Repository<Course>>(getRepositoryToken(Course)).save(
      {
        description: randomStringGenerator(),
        department,
        courseNumber: Math.random(),
        courseName: randomStringGenerator(),
        ...overrides,
      },
      {reload: true},
  );
}

/**
 * Saves multiple course entities to the database.
 * @param {INestApplication} app
 * The Nest application instance.
 * @param {number} count
 * The number of course entities to save.
 * @param {Partial<Course>} overrides
 * Optional overrides for the course entities.
 * @return {Promise<Course[]>}
 * A promise that resolves to an array of saved course entities.
 */
export async function saveCourses(
    app: INestApplication,
    count: number,
    overrides: Partial<Course> = {},
): Promise<Course[]> {
  const department = await saveDepartment(app);
  const courses = [];
  for (let i = 0; i < count; i++) {
    courses.push({
      description: randomStringGenerator(),
      department,
      courseNumber: Math.random(),
      courseName: randomStringGenerator(),
      ...overrides,
    });
  }
  return app.get<Repository<Course>>(getRepositoryToken(Course)).save(courses);
}
