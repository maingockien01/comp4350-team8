import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from '../dto';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async logIn(dto: AuthDto): Promise<any> {
		const user = await this.usersService.findOne(dto.username);
		if (user?.password !== dto.password) {
			throw new UnauthorizedException();
		}
		const { password, ...result } = user;
		// TODO: Generate a JWT and return it here
		// instead of the user object
		return result;
	}
}
