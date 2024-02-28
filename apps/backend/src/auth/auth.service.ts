import {
	Injectable,
	UnauthorizedException,
	BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LogInDto, SignUpDto } from '@team8/types/dtos/auth';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './createUser.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async signUp(dto: SignUpDto): Promise<User> {
		const saltOrRounds = 10;
		const userDto = new CreateUserDto(dto);
		userDto.hashPassword = await bcrypt.hash(dto.password, saltOrRounds);
		const user = await this.usersService.create(userDto);
		if (!user) {
			throw new BadRequestException();
		}
		return user;
	}

	async logIn(dto: LogInDto): Promise<User> {
		//TODO: Return message according to error
		const user = await this.usersService.findOneByUsername(dto.username);
		if (!user) {
			throw new UnauthorizedException();
		}
		if (!(await bcrypt.compare(dto.password, user.hashPassword))) {
			throw new UnauthorizedException();
		}
		// TODO: Generate a JWT and return it here
		// instead of the user object
		return user;
	}
}
