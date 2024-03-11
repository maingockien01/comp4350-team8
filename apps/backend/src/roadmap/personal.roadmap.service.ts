import { Injectable } from '@nestjs/common';
import { Roadmap } from '@team8/types/domain/roadmap.model';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonalRoadmapService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}
	async getPersonalRoadmap(userId: number): Promise<Roadmap> {
		return null;
	}

	savePersonalRoadmap(userId: number): Roadmap {
		return null;
	}
}
