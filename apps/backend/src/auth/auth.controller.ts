import {
	Body,
	Controller,
	Post,
	HttpCode,
	HttpStatus,
	Res,
	UnauthorizedException,
	ConflictException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LogInDto, LogInResDto } from '@team8/types/dtos/auth/login.dto';
import { SignUpDto } from '@team8/types/dtos/auth/signup.dto';
import { ResponseDto } from '@team8/types/dtos/response.dto';

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post('signup')
	async signUp(@Body() signupDto: SignUpDto, @Res() res: Response): Promise<ResponseDto> {
		try {
			await this.authService.signUpOrFail(signupDto);
			return {
				status: 'success',
				message: 'New user created!',
			};
		} catch (error) {

			throw new ConflictException('Credential already exists!');
		}
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async logIn(
		@Body() logInDto: LogInDto,
		@Res({ passthrough: true }) response: Response,
	): Promise<ResponseDto<LogInResDto>> {
		try {
			const loginResponse = await this.authService.logInOrFail(logInDto);
			response.cookie('access_token', loginResponse.access_token, {
				httpOnly: true,
				sameSite: 'strict',
			});
			
			return {
				status: 'success',
				message: 'Login successfully!',
				data: loginResponse,
			};
		} catch (error) {
			throw new UnauthorizedException('Invalid credentials');
		}
	}
}
