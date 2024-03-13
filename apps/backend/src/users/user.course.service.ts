import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDTO } from '@team8/types/dtos/user/user.dto';
import { Section } from '../entities/section.entity';
import { SectionService } from '../sections/section.service';
import { TermService } from '../terms/term.service';
import { CoursesService } from '../courses/course.service';
import { CourseDTO } from 'packages/types/dtos/course/course.dto';
import { SectionDTO } from 'packages/types/dtos/section/section.dto';

@Injectable()
export class UserCourseService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private readonly sectionService: SectionService,
		private readonly termService: TermService,
		private readonly courseService: CoursesService,
	) {}

	async findAll(): Promise<UserDTO[]> {
		return await this.userRepository.find();
	}

	async find(uid: number): Promise<UserDTO> {
		return await this.userRepository.findOne({
			relations: {
				sections: true,
			},
			where: {
				uid: uid,
			},
		});
	}

	async findSection(uid: number, tid: number): Promise<Section[]> {
		const userSection = await this.userRepository.findOne({
			relations: {
				sections: {
					term: true,
					location: true,
					course: true,
				},
			},
			where: {
				uid: uid,
			},
		});

		return userSection.sections.filter((SectionDTO) => SectionDTO.term.tid == tid);
	}

	async findActive(uid: number, tid: number): Promise<any[]> {
		const activeRegis = await this.findSection(uid, tid);
		let res = [];
		if (activeRegis) {
			const active = activeRegis.map((section) => ({
				courseName: section.course.courseName,
				time: section.time,
				location: section.location.building + '' + section.location.roomNumber,
			}));

			res = active;
		}

		return res;
	}

	// Helper function
	async addDoneCourse(uid: number, sid: number): Promise<void> {
		const user = await this.userRepository.findOne({
			relations: {
				doneSections: true,
			},
			where: {
				uid: uid,
			},
		});

		const section = await this.sectionService.find(sid);
		console.log('done');
		user.doneSections.push(section);
		await this.userRepository.save(user);
	}

	async registerSection(uid: number, sid: number): Promise<void> {
		const user = await this.userRepository.findOne({
			relations: {
				sections: true,
				doneSections: {
					course: true,
				},
			},
			where: {
				uid: uid,
			},
		});

		// Fetch section by ID
		const currentTerm = await this.termService.findCurrentTerm();
		const doneSec: Section[] = user.doneSections;
		const section = await this.sectionService.find(sid);
		const prerequisites = await this.courseService.getPrerequisite(section.course.cid);

		const prerequisitesCovered = prerequisites.every((prerequisite) =>
			doneSec.some((done) => done.course.cid === prerequisite.cid),
		);

		if (!prerequisitesCovered) {
			throw new BadRequestException(
				'User has not completed all the prerequisites to register this course .',
			);
		}

		if (!section || section.term.tid !== currentTerm) {
			throw new NotFoundException(
				'Invalid Section ID. Can only register the Current Term Sections (Fall 2024)',
			);
		}

		user.sections.push(section);

		// Save user with updated section to the database
		await this.userRepository.save(user);
	}

	async deleteUserFromSection(sid: number, uid: number): Promise<void> {
		const user = await this.userRepository.findOne({
			relations: {
				sections: true,
			},
			where: {
				uid: uid,
			},
		});

		user.sections = user.sections.filter((s) => s.sid != sid);
		await this.userRepository.save(user);
	}
}
