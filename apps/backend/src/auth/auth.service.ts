import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
	LogInDto,
	SignUpDto,
	LogInRetDto,
	SignUpRetDto,
} from '@team8/types/dtos/auth';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async signUp(dto: SignUpDto): Promise<SignUpRetDto> {
		//TODO: Hash the password
		const user = await this.usersService.create(dto);
		const result = new SignUpRetDto();
		result.username = user.username;
		return result;
	}

	async logIn(dto: LogInDto): Promise<LogInRetDto> {
		//TODO: Return message according to error
		const user = await this.usersService.findOneByUsername(dto.username);
		if (user?.hashPassword !== dto.hashPassword) {
			throw new UnauthorizedException();
		}
		const result = new LogInRetDto();
		result.username = user.username;
		// TODO: Generate a JWT and return it here
		// instead of the user object
		return result;
	}
}
