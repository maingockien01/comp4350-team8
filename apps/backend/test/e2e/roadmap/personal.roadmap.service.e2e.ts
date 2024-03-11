import { INestApplication } from '@nestjs/common';
import { PersonalRoadmapService } from '../../../src/roadmap/personal.roadmap.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../src/entities/user.entity';
import { TestingModule } from '@nestjs/testing';

const app: INestApplication = global.app;
const testingModules: TestingModule = global.testingModules;

describe('PersonalRoadmapService', () => {
	it('should be defined', () => {
		expect(app.get(getRepositoryToken(User))).toBeDefined();
		expect(testingModules.get(PersonalRoadmapService)).toBeDefined();
	});
});
