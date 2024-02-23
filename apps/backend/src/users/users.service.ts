import { Injectable, ForbiddenException } from '@nestjs/common';
import { SignUpDto } from '../auth/dto';
import { EntityManager, Repository, QueryFailedError } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDto } from '../profile/dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly entityManager: EntityManager,
	) {}

	async create(dto: SignUpDto) {
		try {
			const user = new User(dto);
			await this.entityManager.save(user);
			return user;
		} catch (error) {
			if (error instanceof QueryFailedError) {
				if (error.driverError.code === 'ER_DUP_ENTRY') {
					throw new ForbiddenException('Credential taken');
				}
			}
		}
	}

	async findOne(username: string) {
		return this.usersRepository.findOneBy({ username });
	}

	async update(dto: UpdateDto) {
		const user = await this.findOne(dto.username);
		user.fullName = dto.fullName;
		await this.entityManager.save(user);
	}
}
