import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './courses.model';

@Injectable()
export class CoursesService {
	constructor(
		@InjectRepository(Course)
		private readonly courseRepository: Repository<Course>,
	) {}
	// Responsibility: handle business logic - make DB requests
	async getCourses(degree: string, term: string): Promise<Course[]> {
		//Make DB Request
		const courses = await this.courseRepository.find({
			where: {
				degree,
				term,
			},
		});

		return courses;
	}
}
