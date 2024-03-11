import { Injectable } from '@nestjs/common';
import { Roadmap } from '@team8/types/domain/roadmap.model';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class PersonalRoadmapService {

	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}
	getPersonalRoadmap(userId: string): Roadmap {
		return null;
	}

	savePersonalRoadmap(userId: string): Roadmap {
		return null;
	}
}
