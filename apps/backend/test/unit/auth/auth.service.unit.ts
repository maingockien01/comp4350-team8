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
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../../src/auth/createUser.dto';

describe('AuthService', () => {
	let authService: AuthService;
	let usersService: UsersService;

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

		usersService = moduleRef.get<UsersService>(UsersService);
		authService = moduleRef.get<AuthService>(AuthService);
	});

	const user: User = {
		uid: 1,
		username: 'User1',
		fullName: 'User Name 1',
		hashPassword: bcrypt.hash('12345', 10).toString(),
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

	describe('signUp', () => {
		const signupDto: SignUpDto = {
			username: 'User1',
			fullName: 'User Name 1',
			password: '12345',
		};

		const createUserDto: CreateUserDto = {
			username: 'User1',
			fullName: 'User Name 1',
			hashPassword: bcrypt.hash('12345', 10).toString(),
		};

		it('should return a message with status success', async () => {
			const result = {
				status: 'success',
				message: 'New user created!',
			};
			jest.spyOn(usersService, 'create').mockImplementation((dto: CreateUserDto) => {
				return Promise.resolve(user);
			});
			expect(await authService.signUp(signupDto)).toStrictEqual(result);
		});

		it('should return a message with status fail', async () => {
			const result = {
				status: 'fail',
				message: 'Credential taken',
			};
			jest.spyOn(usersService, 'create').mockImplementation((dto: CreateUserDto) => {
				throw new ForbiddenException('Credential taken');
			});
			expect(await authService.signUp(signupDto)).toStrictEqual(result);
		});
	});

	describe('logIn', () => {
		const loginDto: LogInDto = {
			username: 'User1',
			password: '12345',
		};

		const mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;

		it('should return a message with fail status', async () => {
			const result = {
				status: 'fail',
				message: 'Incorrect username or password!',
			};
			jest.spyOn(usersService, 'findOneByUsername').mockImplementation((name: string) => {
				return Promise.resolve(user);
			});
			expect(await authService.logIn(loginDto, mockResponse)).toStrictEqual(result);
		});

		it('should return a message with fail status', async () => {
			const result = {
				status: 'fail',
				message: 'Incorrect username or password!',
			};
			jest.spyOn(usersService, 'findOneByUsername').mockImplementation((name: string) => {
				return Promise.resolve(null);
			});
			expect(await authService.logIn(loginDto, mockResponse)).toStrictEqual(result);
		});

		it('should fail', () => {
			expect(true).toBe(false);
		})
	});
});
