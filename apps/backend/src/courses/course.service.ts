import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CourseDTO } from '@team8/types/dtos/course/course.dto';

@Injectable()
export class CoursesService {
	constructor(
		@InjectRepository(Course)
		private courseRepository: Repository<Course>,
	) {}

	// Responsibility: handle business logic - make DB requests
	async getCoursesByDepartment(department: string): Promise<CourseDTO[]> {
		//Make DB Request
		const courses = await this.courseRepository.find({
			where: {
				department,
			},
		});

		return courses;
	}

	async getCourses(criterias: Partial<Course>, relations: string[] = []): Promise<CourseDTO[]> {
		const courses = await this.courseRepository.find({
			where: {
				...criterias,
			},
			relations,
		});

		return courses;
	}
}