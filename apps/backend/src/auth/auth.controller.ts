import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	logIn(@Body() signInDto: any) {
		console.log(signInDto);
		return this.authService.logIn(signInDto.username, signInDto.password);
	}
}
