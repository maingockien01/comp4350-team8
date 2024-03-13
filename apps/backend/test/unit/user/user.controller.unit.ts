import { Test } from '@nestjs/testing';
import { UserCourseController } from '../../../src/users/user.course.controller';
import { UserCourseService } from '../../../src/users/user.course.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../src/entities/user.entity';
import { SectionDTO } from 'packages/types/dtos/section/section.dto';
import { Section } from '../../../src/entities/section.entity';
import { Term } from '../../../src/entities/term.entity';
import { Course } from '../../../src/entities/course.entity';
import { SectionService } from '../../../src/sections/section.service';
import { TermService } from '../../../src/terms/term.service';
import { CoursesService } from '../../../src/courses/course.service';

describe('UserController', () => {
	let userController: UserCourseController;
	let userService: UserCourseService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [UserCourseController],
			providers: [
				UserCourseService,
				{
					provide: getRepositoryToken(User),
					useClass: Repository,
				},
				SectionService,
				{
					provide: getRepositoryToken(Section),
					useClass: Repository,
				},
				TermService,
				{
					provide: getRepositoryToken(Term),
					useClass: Repository,
				},
				CoursesService,
				{
					provide: getRepositoryToken(Course),
					useClass: Repository,
				},
			],
		}).compile();

		userController = moduleRef.get<UserCourseController>(UserCourseController);
		userService = moduleRef.get<UserCourseService>(UserCourseService);
	});

	describe('find', () => {
		it('should return a User with matched uid', async () => {
			const result = {
				uid: 1,
				fullName: 'Jack Nguyen',
				username: 'jacknguyen',
				hashPassword: 'jack123',
				pictureProfile: 'default',
			};
			jest.spyOn(userService, 'find').mockImplementation(() => Promise.resolve(result));
			expect(
				await userController.findOne({
					user: {
						uid: 1,
					},
				}),
			).toBe(result);
		});
	});

	describe('find', () => {
		it('should return an array of Courses with time and building with matched uid and tid', async () => {
			const result = [
				{ courseName: 'COMP 702', time: '11:00 AM', location: 'T501' },
				{ courseName: 'COMP 1202', time: '11:00 AM', location: 'D401' },
			];
			jest.spyOn(userService, 'findActive').mockImplementation(() => Promise.resolve(result));
			expect(
				await userController.findActive(10, {
					user: {
						uid: 1,
					},
				}),
			).toBe(result);
		});
	});

	describe('findAll', () => {
		it('should return an array of all Users', async () => {
			const result = [
				{
					uid: 1,
					fullName: 'Jack Nguyen',
					username: 'jacknguyen',
					hashPassword: 'jack123',
					pictureProfile: 'default',
				},
			];
			jest.spyOn(userService, 'findAll').mockImplementation(() => Promise.resolve(result));
			expect(await userController.findAll()).toBe(result);
		});
	});
});
