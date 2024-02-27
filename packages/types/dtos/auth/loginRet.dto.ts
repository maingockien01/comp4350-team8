import { IsNotEmpty, IsString } from 'class-validator';

export class LogInRetDto {
	@IsString()
	@IsNotEmpty()
	username: string;
}
