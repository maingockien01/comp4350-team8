import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from '@team8/types/dtos/auth/login.dto';
import { SignUpDto } from '@team8/types/dtos/auth/signup.dto';

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	signUp(@Body() signupDto: SignUpDto) {
		return this.authService.signUp(signupDto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	logIn(@Body() logInDto: LogInDto) {
		return this.authService.logIn(logInDto);
	}
}
