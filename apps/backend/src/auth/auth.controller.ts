import {
	Body,
	Controller,
	Post,
	HttpCode,
	HttpStatus,
	Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from '@team8/types/dtos/auth/login.dto';
import { SignUpDto } from '@team8/types/dtos/auth/signup.dto';
import { Response } from 'express';

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	signUp(@Body() signupDto: SignUpDto) {
		return this.authService.signUp(signupDto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async logIn(
		@Body() logInDto: LogInDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const user = await this.authService.logIn(logInDto);
		response.cookie('uid', user.uid);
		response.cookie('username', user.username);
		return {
			message: 'success',
		};
	}
}
