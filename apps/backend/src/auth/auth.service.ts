import { Injectable, UnauthorizedException, BadRequestException, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LogInDto, SignUpDto } from '@team8/types/dtos/auth';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './createUser.dto';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async signUp(dto: SignUpDto): Promise<User> {
		const saltOrRounds = 10;
		const userDto = new CreateUserDto(dto);
		userDto.hashPassword = await bcrypt.hash(dto.password, saltOrRounds);
		try {
			const user = await this.usersService.create(userDto);
			if (!user) {
				throw new BadRequestException();
			}
			return user;
		} catch (error) {
			throw error;
		}
	}

	async logIn(dto: LogInDto, response: Response): Promise<User> {
		//TODO: Return message according to error
		const user = await this.usersService.findOneByUsername(dto.username);
		if (!user) {
			throw new UnauthorizedException();
		}
		if (!(await bcrypt.compare(dto.password, user.hashPassword))) {
			throw new UnauthorizedException();
		}

		const payload = { username: user.username, sub: user.uid };
		response.cookie('access_token', this.jwtService.sign(payload));
		return user;
	}

	generateToken(user: User): string {
		const payload = { username: user.username, sub: user.uid };
		return this.jwtService.sign(payload);
	}
}
