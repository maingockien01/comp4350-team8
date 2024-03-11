import { INestApplication } from '@nestjs/common';
import { PersonalRoadmapService } from '../../../src/roadmap/personal.roadmap.service';

const app: INestApplication = global.app;

describe('PersonalRoadmapService', () => {
	const service = app.get<PersonalRoadmapService>(PersonalRoadmapService);

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
