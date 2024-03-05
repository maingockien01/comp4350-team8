import { IsNotEmpty, IsString } from 'class-validator';

export interface CreateUserDto {
	username: string;
	fullName: string;
	password: string;
}