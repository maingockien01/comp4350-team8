import { INestApplication } from '@nestjs/common';
import { PersonalRoadmapService } from '../../../src/roadmap/personal.roadmap.service';
import { makeApp } from '../_global/setup';
import { teardownApp } from '../_global/teardown';
import { saveUser } from '../_helpers/User';
import { saveCourse, saveCourses } from '../_helpers/Course';

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
			const user = await saveUser(app);
			const roadmap = await personalRoadmapService.getPersonalRoadmap(user.uid);

			expect(roadmap.recommendedCourses).toEqual([]);
		});

		it('should return roadmap for user with planned courses', async () => {
			const courses = await saveCourses(app, 10);
			const user = await saveUser(app, { plannedCourses: courses });
			const roadmap = await personalRoadmapService.getPersonalRoadmap(user.uid);

			expect(roadmap.recommendedCourses).toHaveLength(courses.length);
		});
	});

	describe('savePersonalRoadmap', () => {
		it('should throw for non-existing user', async () => {
			await expect(personalRoadmapService.savePersonalRoadmap(0, [])).rejects.toThrow();
		});

		it('should throw for non-existing courses', async () => {
			const user = await saveUser(app);
			await expect(
				personalRoadmapService.savePersonalRoadmap(user.uid, [Number.MAX_SAFE_INTEGER]),
			).rejects.toThrow();
		});

		it('should throw for invalid roadmap', async () => {
			const user = await saveUser(app);
			const course = await saveCourse(app);
			const anotherCourse = await saveCourse(app, { prerequisites: [course] });
			await expect(
				personalRoadmapService.savePersonalRoadmap(user.uid, [anotherCourse.cid]),
			).rejects.toThrow();
		});

		it('should save roadmap for user', async () => {
			const courses = await saveCourses(app, 10);
			const user = await saveUser(app);
			await personalRoadmapService.savePersonalRoadmap(
				user.uid,
				courses.map((course) => course.cid),
			);

			const roadmap = await personalRoadmapService.getPersonalRoadmap(user.uid);
			expect(roadmap.recommendedCourses).toHaveLength(courses.length);
		});

		it('should save roadmap for user with prerequisites', async () => {
			const course = await saveCourse(app);
			const anotherCourse = await saveCourse(app, { prerequisites: [course] });
			const user = await saveUser(app);
			await personalRoadmapService.savePersonalRoadmap(user.uid, [anotherCourse.cid]);

			const roadmap = await personalRoadmapService.getPersonalRoadmap(user.uid);
			expect(roadmap.recommendedCourses).toHaveLength(1);
		});
	});
});
