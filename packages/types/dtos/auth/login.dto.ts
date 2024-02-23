import { IsNotEmpty, IsString } from 'class-validator';

export class LogInDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	hashPassword: string;
}
