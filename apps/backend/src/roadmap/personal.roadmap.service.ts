import { Injectable } from '@nestjs/common';
import { InvalidRoadmapException, Roadmap } from '@team8/types/domain/roadmap.model';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { In, Repository } from 'typeorm';
import { Course } from '../entities/course.entity';

@Injectable()
export class PersonalRoadmapService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Course)
		private readonly courseRepository: Repository<Course>,
	) {}
	async getPersonalRoadmap(userId: number): Promise<Roadmap> {
		const user = await this.userRepository.findOneOrFail({
			where: {
				uid: userId,
			},
			relations: {
				plannedCourses: {
					prerequisites: true,
				},
			},
		});

		return new Roadmap(user.plannedCourses);
	}

	async savePersonalRoadmap(userId: number, cids: number[]): Promise<Roadmap> {
		const courses = await this.courseRepository.find({
			where: {
				cid: In(cids),
			},
			relations: {
				prerequisites: true,
			},
		});

		if (courses.length !== cids.length) {
			throw new Error('Some courses do not exist');
		}

		const roadmap = new Roadmap(courses);

		if (!roadmap.isValid()) {
			throw new InvalidRoadmapException();
		}

		const user = await this.userRepository.findOneOrFail({
			where: {
				uid: userId,
			},
		});

		user.plannedCourses = courses;

		await this.userRepository.save(user);

		return roadmap;
	}
}
