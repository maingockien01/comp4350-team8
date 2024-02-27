import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CourseDTO } from './course.dto';

@Injectable()
export class CoursesService {
	constructor(
		@InjectRepository(Course)
		private courseRepository: Repository<Course>,
	) {}

	// Responsibility: handle business logic - make DB requests
	async getCourses(department: string): Promise<CourseDTO[]> {
		//Make DB Request
		const courses = await this.courseRepository.find({
			where: {
				department,
			},
		});

		return courses;
	}
}