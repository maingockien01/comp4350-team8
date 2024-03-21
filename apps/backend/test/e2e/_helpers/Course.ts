import { INestApplication } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Course } from '../../../src/entities/course.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { saveDepartment } from './Department';

export async function saveCourse(app: INestApplication, overrides: Partial<Course> = {}): Promise<Course> {
	const department = await saveDepartment(app);
	return app.get<Repository<Course>>(getRepositoryToken(Course)).save(
		{
			description: randomStringGenerator(),
			department,
			courseNumber: Math.random(),
			courseName: randomStringGenerator(),
			...overrides,
		},
		{ reload: true },
	);
}

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
