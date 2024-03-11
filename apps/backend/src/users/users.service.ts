import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDto } from '@team8/types/dtos/profile/update.dto';
import { CreateUserDto } from '../auth/createUser.dto';

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

	async findOneByUsername(username: string) {
		return this.usersRepository.findOneBy({ username });
	}

	async update(dto: UpdateDto) {
		const user = await this.findOneByUsername(dto.username);
		if (dto.fullName !== null) user.fullName = dto.fullName;
		if (dto.pictureProfile !== null) user.pictureProfile = dto.pictureProfile;
		await this.usersRepository.save(user);
	}
}
