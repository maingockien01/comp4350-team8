import {
	Body,
	Controller,
	Post,
	HttpCode,
	HttpStatus,
	Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LogInDto, SignUpDto } from '@team8/types/dtos/auth';
import { ReturnDto } from 'packages/types/dtos/auth/Return.dto';

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	async signUp(@Body() signupDto: SignUpDto): Promise<ReturnDto> {
		try {
			await this.authService.signUp(signupDto);
			return {
				status: 'success',
				message: 'New user created!',
			};
		} catch (error) {
			return {
				status: 'fail',
				message: 'Invalid username or password!',
			};
		}
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async logIn(
		@Body() logInDto: LogInDto,
		@Res({ passthrough: true }) response: Response,
	): Promise<ReturnDto> {
		try {
			const user = await this.authService.logIn(logInDto);
			response.cookie('uid', user.uid);
			response.cookie('username', user.username);

			return {
				status: 'success',
				message: 'Login successfully!',
			};
		} catch (error) {
			return {
				status: 'fail',
				message: 'Credential Taken!',
			};
		}
	}
}
