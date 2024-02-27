import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
	LogInDto,
	SignUpDto,
	LogInRetDto,
	SignUpRetDto,
} from '@team8/types/dtos/auth';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './createUser.dto';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async signUp(dto: SignUpDto): Promise<SignUpRetDto> {
		const saltOrRounds = 10;
		const userDto = new CreateUserDto(dto);
		userDto.hashPassword = await bcrypt.hash(dto.password, saltOrRounds);
		const user = await this.usersService.create(userDto);
		const result = new SignUpRetDto();
		result.username = user.username;
		return result;
	}

	async logIn(dto: LogInDto): Promise<LogInRetDto> {
		//TODO: Return message according to error
		const user = await this.usersService.findOneByUsername(dto.username);
		if (!(await bcrypt.compare(dto.password, user.hashPassword))) {
			throw new UnauthorizedException();
		}
		const result = new LogInRetDto();
		result.username = user.username;
		// TODO: Generate a JWT and return it here
		// instead of the user object
		return result;
	}
}
