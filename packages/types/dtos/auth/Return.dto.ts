import { IsNotEmpty, IsString } from 'class-validator';

export class ReturnDto {
	@IsString()
	@IsNotEmpty()
	status: string;

	@IsString()
	@IsNotEmpty()
	message: string;
}
