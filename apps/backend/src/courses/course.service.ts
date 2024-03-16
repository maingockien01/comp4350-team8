import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
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
		return await this.courseRepository.find({
			relations: {
				prerequisites: true,
				department: true,
			}
		});
	}

	async getCoursesByDepartment(departmentName: string): Promise<Course[]> {
		return this.getCourses({ department: { name: departmentName } });
	}

	async getCourses(criteria: FindOptionsWhere<Course>, overrideRelations: FindOptionsRelations<Course> = {}): Promise<Course[]> {
		return await this.courseRepository.find({
			where: {
				...criteria,
			},
			relations: {
				department: true,
				prerequisites: true,
				...overrideRelations
			}
		});
	}

	getCourseById(cid: number): Promise<Course> {
		return this.getCourse({ cid });
	}
	async getCourse(criteria: FindOptionsWhere<Course>, overrideRelations: FindOptionsRelations<Course> = {}): Promise<Course> {
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
