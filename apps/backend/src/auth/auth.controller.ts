import { Body, Controller, Post, HttpCode, HttpStatus, Res, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LogInDto, SignUpDto } from '@team8/types/dtos/auth';
import { ReturnDto } from 'packages/types/dtos/auth/Return.dto';

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	async signUp(@Body() signupDto: SignUpDto): Promise<ReturnDto> {
		return await this.authService.signUp(signupDto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async logIn(
		@Body() logInDto: LogInDto,
		@Res({ passthrough: true }) response: Response,
	): Promise<ReturnDto> {
		return await this.authService.logIn(logInDto, response);
	}
}
