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

		if (!userSection) {
			throw new BadRequestException('User does not exist');
		}
		if (!userSection.sections) {
			throw new BadRequestException('Invalid Section ID');
		}
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
		user.doneSections.push(section);
		await this.userRepository.save(user);
	}

	//helper function
	// time2 = being added
	compareDate(time1: string, time2: string): boolean {
		const array1 = time1.split(',');
		const array2 = time2.split(',');

		for (let i = 0; i < array1.length; i++) {
			for (let k = 0; k < array2.length; k++) {
				if (array2[k].charAt(0) === array1[i].charAt(0)) {
					let arr2First = parseFloat(
						array2[k].charAt(1) +
							array2[k].charAt(2) +
							'.' +
							array2[k].charAt(4) +
							array2[k].charAt(5),
					);

					let arr1First = parseFloat(
						array1[i].charAt(1) +
							array1[i].charAt(2) +
							'.' +
							array1[i].charAt(4) +
							array1[i].charAt(5),
					);

					let arr2Second = parseFloat(
						array2[k].charAt(7) +
							array2[k].charAt(8) +
							'.' +
							array2[k].charAt(10) +
							array2[k].charAt(11),
					);

					let arr1Second = parseFloat(
						array1[i].charAt(7) +
							array1[i].charAt(8) +
							'.' +
							array1[i].charAt(10) +
							array1[i].charAt(11),
					);

					if (arr2First < arr1Second) {
						if (arr2Second > arr1First || arr2First > arr1First) {
							throw new BadRequestException('Time overlapped with registered course');
						}
					}
				}
			}
		}

		return true;
	}

	async registerSection(uid: number, sid: number): Promise<void> {
		const user = await this.userRepository.findOne({
			relations: {
				sections: {
					course: true,
				},
				doneSections: {
					course: true,
				},
			},
			where: {
				uid: uid,
			},
		});

		const alreadyRegistered = user.sections.some((section) => section.sid == sid);

		if (alreadyRegistered) {
			throw new BadRequestException('You have already registered in this section.');
		}

		// Fetch section by ID
		const currentTerm = await this.termService.findCurrentTerm();
		const doneSec: Section[] = user.doneSections;
		const section = await this.sectionService.find(sid);
		if (!section) {
			throw new BadRequestException('Section ID does not exist');
		}
		const prerequisites = await this.courseService.getPrerequisite(section.course.cid);

		const courseRegistered = user.sections.some((sec) => sec.course.cid == section.course.cid);

		// M11:00-12:00,W11:00-12:00,F11:00-12:00
		// M10:00-12:00,W10:00-12:00,F10:00-12:00
		for (const sections of user.sections) {
			this.compareDate(sections.time, section.time);
		}

		if (courseRegistered) {
			throw new BadRequestException('You have already registered this course in another section.');
		}

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
