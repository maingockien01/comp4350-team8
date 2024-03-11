import { INestApplication } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Course } from '../../../src/entities/course.entity';
import { Repository } from 'typeorm';

export function createCourse(app: INestApplication, overrides: Partial<Course> = {}): Promise<Course> {
	return app.get<Repository<Course>>('CourseRepository').save({
		title: randomStringGenerator(),
		description: randomStringGenerator(),
		...overrides,
	});
}
