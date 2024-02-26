import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpRetDto {
	@IsString()
	@IsNotEmpty()
	username: string;
}
