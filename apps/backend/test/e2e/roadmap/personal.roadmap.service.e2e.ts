import { INestApplication } from '@nestjs/common';
import { PersonalRoadmapService } from '../../../src/roadmap/personal.roadmap.service';
import { makeApp } from '../_global/setup';
import { teardownApp } from '../_global/teardown';
import { createUser } from '../_helpers/CreateUser';

describe('PersonalRoadmapService', () => {
	let app: INestApplication;
	let personalRoadmapService: PersonalRoadmapService;

	beforeAll(async () => {
		app = await makeApp();
		personalRoadmapService = app.get(PersonalRoadmapService);
	});

	afterAll(async () => {
		await teardownApp(app);
	});

	it('should return empty for new user', async () => {
		const user = await createUser(app);
		const roadmap = await personalRoadmapService.getPersonalRoadmap(user.uid);

		expect(roadmap.recommendedCourses).toEqual([]);
	});
});
