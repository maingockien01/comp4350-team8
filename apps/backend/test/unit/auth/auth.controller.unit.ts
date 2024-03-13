import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../../../src/auth/auth.service';
import { AuthController } from '../../../src/auth/auth.controller';
import { UsersService } from '../../../src/users/users.service';
import { User } from '../../../src/entities/user.entity';
import { LogInDto, SignUpDto } from '@team8/types/dtos/auth';
import { JwtService } from '@nestjs/jwt';
import { Roadmap } from '@team8/types/domain/roadmap.model';
import { BadRequestException } from '@nestjs/common';
import { Response } from 'express';

describe('AuthController', () => {
	let authController: AuthController;
	let authService: AuthService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				AuthService,
				UsersService,
				{
					provide: getRepositoryToken(User),
					useClass: Repository,
				},
				JwtService,
			],
		}).compile();

		authController = moduleRef.get<AuthController>(AuthController);
		authService = moduleRef.get<AuthService>(AuthService);
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
	};

	describe('signUp', () => {
		const signupDto: SignUpDto = {
			username: 'User1',
			fullName: 'User Name 1',
			password: '12345',
		};

		it('should return a message with success status', async () => {
			const result = {
				status: 'success',
				message: 'New user created!',
			};
			jest.spyOn(authService, 'signUp').mockImplementation((dto: SignUpDto) => {
				expect(dto).toEqual(signupDto);
				return Promise.resolve(user);
			});
			expect(await authController.signUp(signupDto)).toStrictEqual(result);
		});

		it('should return a message with fail status', async () => {
			const result = {
				status: 'fail',
				message: 'Credential Taken!',
			};
			jest.spyOn(authService, 'signUp').mockImplementation((dto: SignUpDto) => {
				throw new BadRequestException();
			});
			expect(await authController.signUp(signupDto)).toStrictEqual(result);
		});
	});

	describe('logIn', () => {
		it('should return a message with success status', async () => {
			const result = {
				status: 'success',
				message: 'Login successfully!',
			};
			const loginDto: LogInDto = {
				username: 'User1',
				password: '12345',
			};
			const mockResponse = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			} as unknown as Response;
			jest.spyOn(authService, 'logIn').mockImplementation((dto: LogInDto, res: Response) => {
				expect(dto).toEqual(loginDto);
				return Promise.resolve(user);
			});
			expect(await authController.logIn(loginDto, mockResponse)).toStrictEqual(result);
		});
	});
});
