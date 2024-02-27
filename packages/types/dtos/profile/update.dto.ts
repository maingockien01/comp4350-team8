import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	fullName: string;

	pictureProfile: any;
}
