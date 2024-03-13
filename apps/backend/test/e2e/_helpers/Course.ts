import { INestApplication } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Course } from '../../../src/entities/course.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

export function saveCourse(app: INestApplication, overrides: Partial<Course> = {}): Promise<Course> {
	return app.get<Repository<Course>>(getRepositoryToken(Course)).save(
		{
			description: randomStringGenerator(),
			department: randomStringGenerator(),
			courseNumber: Math.random(),
			courseName: randomStringGenerator(),
			...overrides,
		},
		{ reload: true },
	);
}

export function saveCourses(
	app: INestApplication,
	count: number,
	overrides: Partial<Course> = {},
): Promise<Course[]> {
	const courses = [];
	for (let i = 0; i < count; i++) {
		courses.push({
			description: randomStringGenerator(),
			department: randomStringGenerator(),
			courseNumber: Math.random(),
			courseName: randomStringGenerator(),
			...overrides,
		});
	}
	return app.get<Repository<Course>>(getRepositoryToken(Course)).save(courses);
}
