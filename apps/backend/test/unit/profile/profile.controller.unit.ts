import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../../src/users/users.service';
import { User } from '../../../src/entities/user.entity';
import { Roadmap } from '@team8/types/domain/roadmap.model';
import { ProfileController } from '../../../src/profile/profile.controller';
import { ProfileService } from '../../../src/profile/profile.service';
import { UpdateUserDto } from 'packages/types/dtos/profile/update.dto';

describe('ProfileController', () => {
	let profileController: ProfileController;
	let profileService: ProfileService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [ProfileController],
			providers: [
				ProfileService,
				UsersService,
				{
					provide: getRepositoryToken(User),
					useClass: Repository,
				},
			],
		}).compile();

		profileController = moduleRef.get<ProfileController>(ProfileController);
		profileService = moduleRef.get<ProfileService>(ProfileService);
	});

	const user: User = {
		uid: 1,
		username: 'User1',
		fullName: 'User Name 1',
		hashPassword: '12345',
		degree: {
			did: 1,
			name: 'degree',
			users: [],
			recommendedCourses: [],
			roadmap: new Roadmap([]),
		},
		sections: [],
		doneSections: [],
		plannedCourses: [],
	};

	const req = {
		user: {
			uid: 1,
		},
	};

	describe('getUserProfile', () => {
		it('should return a message with success status', async () => {
			const result = {
				message: 'Found an user!',
				status: 'success',
				user: user,
			};
			jest.spyOn(profileService, 'getUserProfile').mockImplementation((id: number) => {
				expect(id).toEqual(req.user.uid);
				return Promise.resolve(result);
			});
			expect(await profileController.getUserProfile(req)).toStrictEqual(result);
		});

		it('should return a message with fail status', async () => {
			const result = {
				message: 'User not found!',
				status: 'fail',
			};
			jest.spyOn(profileService, 'getUserProfile').mockImplementation((id: number) => {
				expect(id).toEqual(req.user.uid);
				return Promise.resolve(result);
			});
			expect(await profileController.getUserProfile(req)).toStrictEqual(result);
		});
	});

	describe('update', () => {
		it('should return a message with success status', async () => {
			const result = {
				message: 'Updated user profile successfully',
				status: 'success',
			};
			const updateDto: UpdateUserDto = {
				username: 'User1',
				password: '12345',
				fullName: 'full',
			};
			jest.spyOn(profileService, 'updateUserInfo').mockImplementation(
				(uid: number, dto: UpdateUserDto) => {
					expect(dto).toEqual(updateDto);
					expect(uid).toEqual(req.user.uid);
					return Promise.resolve(result);
				},
			);
			expect(await profileController.update(updateDto, req)).toStrictEqual(result);
		});

		it('should return a message with fail status', async () => {
			const result = {
				message: '',
				status: 'fail',
			};
			const updateDto: UpdateUserDto = {
				username: 'User1',
				password: '12345',
				fullName: 'full',
			};
			jest.spyOn(profileService, 'updateUserInfo').mockImplementation(
				(uid: number, dto: UpdateUserDto) => {
					expect(dto).toEqual(updateDto);
					expect(uid).toEqual(req.user.uid);
					return Promise.resolve(result);
				},
			);
			expect(await profileController.update(updateDto, req)).toStrictEqual(result);
		});
	});
});
