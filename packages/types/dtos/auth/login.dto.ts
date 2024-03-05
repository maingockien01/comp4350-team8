import { IsNotEmpty, IsString } from 'class-validator';

export class LogInDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

export class LogInResDto {
	access_token: string;
}