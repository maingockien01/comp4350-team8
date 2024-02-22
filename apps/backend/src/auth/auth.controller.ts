import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto';
@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	logIn(@Body() logInDto: AuthDto) {
		return this.authService.logIn(logInDto);
	}
}
