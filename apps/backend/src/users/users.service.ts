import { Injectable } from '@nestjs/common';
import { SignUpDto, LogInDto } from '../auth/dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly entityManager: EntityManager,
	) {}

	async create(dto: SignUpDto) {
		const user = new User(dto);
		await this.entityManager.save(user);
		return user;
	}

	async findOne(username: string) {
		return this.usersRepository.findOneBy({ username });
	}
}
