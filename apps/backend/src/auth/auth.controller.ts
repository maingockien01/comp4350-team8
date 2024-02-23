import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, LogInDto } from './dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	signUp(@Body() signupDto: SignUpDto) {
		return this.authService.signUp(signupDto);
	}

	@Post('login')
	logIn(@Body() logInDto: LogInDto) {
		return this.authService.logIn(logInDto);
	}
}
