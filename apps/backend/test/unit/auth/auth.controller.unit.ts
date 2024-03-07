// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from '../../../src/auth/auth.controller';
// import { AuthService } from '../../../src/auth/auth.service';
// import { ReturnDto, SignUpDto } from '@team8/types/dtos/auth';
// import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
// import { UsersService } from '../../../src/users/users.service';

// describe('AuthController', () => {
// 	let authController: AuthController;
// 	let authService: AuthService;

// 	beforeEach(async () => {
// 		const moduleRef = await Test.createTestingModule({
// 			controllers: [AuthController],
// 			providers: [AuthService],
// 		})
// 			.useMocker((token) => {
// 				const results = ['test1', 'test2'];
// 				if (token === UsersService) {
// 					return { findAll: jest.fn().mockResolvedValue(results) };
// 				}
// 			})
// 			.compile();

// 		authController = moduleRef.get<AuthController>(AuthController);
// 		authService = moduleRef.get<AuthService>(AuthService);
// 	});

// 	describe('signup should create a new user', () => {
// 		it('should return an object with status success', async () => {
// 			const signupDto: SignUpDto = {
// 				username: 'TestUsername',
// 				fullName: 'TestFullName',
// 				password: 'TestPassword',
// 			};
// 			const result: ReturnDto = {
// 				status: 'success',
// 				message: 'New user created!',
// 			};
// 			jest.spyOn(authController, 'signUp').mockImplementation(() =>
// 				Promise.resolve(result),
// 			);
// 			expect(await authController.signUp(signupDto)).toBe(result);
// 		});
// 	});
// });
