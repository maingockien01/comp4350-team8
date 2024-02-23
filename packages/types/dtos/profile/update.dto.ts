import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	fullName: string;
}
