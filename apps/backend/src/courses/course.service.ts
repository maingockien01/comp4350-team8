import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CourseDTO } from '@team8/types/dtos/course/course.dto';
import { Section } from '../entities/section.entity';

@Injectable()
export class CoursesService {
	constructor(
		@InjectRepository(Course)
		private courseRepository: Repository<Course>,
	) {}

	// Responsibility: handle business logic - make DB requests
	async findAll(): Promise<CourseDTO[]> {
		return await this.courseRepository.find();
	}

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

	async getPrerequisite(cid: number): Promise<CourseDTO[]> {
		const courses = await this.courseRepository.findOne({
			relations: {
				prerequisites: true,
			},
			where: {
				cid: cid,
			},
		});

		return courses.prerequisites;
	}

	async getSections(cid: number): Promise<Section[]> {
		const courses = await this.courseRepository.findOne({
			relations: {
				sections: {
					location: true,
					term: true,
				},
			},
			where: {
				cid: cid,
			},
		});

		return courses.sections;
	}

	async getCourseById(cid: number): Promise<CourseDTO> {
		return await this.courseRepository.findOne({
			where: {
				cid: cid,
			},
		});
	}
}
