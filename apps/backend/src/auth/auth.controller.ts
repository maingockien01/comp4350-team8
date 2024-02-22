import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	signUp(@Body() logInDto: AuthDto) {
		return this.authService.signUp(logInDto);
	}

	@Post('login')
	logIn(@Body() logInDto: AuthDto) {
		return this.authService.logIn(logInDto);
	}
}
