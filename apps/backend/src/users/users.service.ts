import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '@team8/types/dtos/profile/update.dto';
import { CreateUserDto } from '../auth/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	async create(dto: CreateUserDto) {
		try {
			await this.usersRepository.save(dto);
			return await this.findOneByUsername(dto.username);
		} catch (error) {
			if (error instanceof QueryFailedError) {
				if (error.driverError.code === 'ER_DUP_ENTRY') {
					throw new ForbiddenException('Credential taken');
				}
			}
		}
	}

	async updateUserInfo(uid: number, dto: UpdateUserDto) {
		try {
			const saltOrRounds = 10;
			const user = await this.findOneById(uid);
			if (user) {
				if (dto.username !== '') user.username = dto.username;
				if (dto.fullName !== '') user.fullName = dto.fullName;
				if (dto.password !== '') user.hashPassword = await bcrypt.hash(dto.password, saltOrRounds);
				await this.usersRepository.save(user);
				return user;
			} else {
				throw new ForbiddenException('User not found!');
			}
		} catch (error) {
			if (error instanceof QueryFailedError) {
				if (error.driverError.code === 'ER_DUP_ENTRY') {
					throw new ForbiddenException('Username is already taken!');
				}
			}
		}
	}

	async findOneByUsername(username: string) {
		return this.usersRepository.findOneBy({ username });
	}

	async findOneById(uid: number) {
		return this.usersRepository.findOneBy({ uid });
	}
}
