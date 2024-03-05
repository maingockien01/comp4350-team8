import { Injectable, ForbiddenException } from '@nestjs/common';
import { SignUpDto } from '@team8/types/dtos/auth/signup.dto';
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
		const insertResult = await this.usersRepository.insert(dto);
		
		return insertResult.identifiers[0] as User;
	}

	async findOneByUsername(username: string) {
		return this.usersRepository.findOneBy({ username });
	}

	async update(dto: UpdateDto) {
		const user = await this.findOneByUsername(dto.username);
		if (dto.fullName !== null) user.fullName = dto.fullName;
		if (dto.pictureProfile !== null)
			user.pictureProfile = dto.pictureProfile;
		await this.usersRepository.save(user);
	}
}
