import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	fullName: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
