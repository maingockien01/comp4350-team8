import { IsString } from 'class-validator';

export class UpdateUserDto {
	@IsString()
	username: string;

	@IsString()
	fullName: string;

	@IsString()
	password: string;
}
