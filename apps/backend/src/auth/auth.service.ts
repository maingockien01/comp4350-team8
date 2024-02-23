import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto, LogInDto } from './dto';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async signUp(dto: SignUpDto): Promise<any> {
		//TODO: Hash the password
		const user = await this.usersService.create(dto);
		return user;
	}

	async logIn(dto: LogInDto): Promise<any> {
		const user = await this.usersService.findOne(dto.username);
		if (user?.hashPassword !== dto.hashPassword) {
			throw new UnauthorizedException();
		}
		const { hashPassword, ...result } = user;
		// TODO: Generate a JWT and return it here
		// instead of the user object
		return result;
	}
}
