import { INestApplication } from '@nestjs/common';
import { PersonalRoadmapService } from '../../../src/roadmap/personal.roadmap.service';
import { makeApp } from '../_global/setup';
import { teardownApp } from '../_global/teardown';
import { createUser } from '../_helpers/CreateUser';
import { createCourse } from '../_helpers/CreateCourse';

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

	describe('getPersonalRoadmap', () => {
		it('should throw for non-existing user', async () => {
			await expect(personalRoadmapService.getPersonalRoadmap(0)).rejects.toThrow();
		});

		it('should return empty for new user', async () => {
			const user = await createUser(app);
			const roadmap = await personalRoadmapService.getPersonalRoadmap(user.uid);

			expect(roadmap.recommendedCourses).toEqual([]);
		});

		it('should return roadmap for user with planned courses', async () => {
			const courses = await Promise.all(Array(10).map(() => createCourse(app)));
			const user = await createUser(app, { plannedCourses: courses });
			const roadmap = await personalRoadmapService.getPersonalRoadmap(user.uid);

			expect(roadmap.recommendedCourses).toHaveLength(courses.length);
		});
	});

	describe('savePersonalRoadmap', () => {
		it('should throw for non-existing user', async () => {
			await expect(personalRoadmapService.savePersonalRoadmap(0, [])).rejects.toThrow();
		});

		it('should throw for non-existing courses', async () => {
			const user = await createUser(app);
			await expect(
				personalRoadmapService.savePersonalRoadmap(user.uid, [Number.MAX_SAFE_INTEGER]),
			).rejects.toThrow();
		});

		it('should throw for invalid roadmap', async () => {
			const user = await createUser(app);
			const course = await createCourse(app);
			const anotherCourse = await createCourse(app, { prerequisites: [course] });
			await expect(
				personalRoadmapService.savePersonalRoadmap(user.uid, [anotherCourse.cid]),
			).rejects.toThrow();
		});

		it('should save roadmap for user', async () => {
			const courses = await Promise.all(Array(10).map(() => createCourse(app)));
			const user = await createUser(app);
			await personalRoadmapService.savePersonalRoadmap(
				user.uid,
				courses.map((course) => course.cid),
			);

			const roadmap = await personalRoadmapService.getPersonalRoadmap(user.uid);
			expect(roadmap.recommendedCourses).toHaveLength(courses.length);
		});
	});
});
