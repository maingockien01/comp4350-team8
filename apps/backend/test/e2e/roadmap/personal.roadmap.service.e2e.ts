import { INestApplication } from '@nestjs/common';
import { PersonalRoadmapService } from '../../../src/roadmap/personal.roadmap.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../src/entities/user.entity';
import { makeApp } from '../_global/setup';

describe('PersonalRoadmapService', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await makeApp();
	});

	it('should be defined', () => {
		expect(app.get(getRepositoryToken(User))).toBeDefined();
		expect(app.get(PersonalRoadmapService)).toBeDefined();
	});
});
