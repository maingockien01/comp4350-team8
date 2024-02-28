import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	fullName: string;

	@IsString()
	@IsNotEmpty()
	hashPassword: string;

	constructor(dto: Partial<CreateUserDto>) {
		Object.assign(this, dto);
	}
}
