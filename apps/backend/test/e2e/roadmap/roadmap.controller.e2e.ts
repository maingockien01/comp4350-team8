import { INestApplication } from '@nestjs/common';
import { makeApp } from '../_global/setup';
import { teardownApp } from '../_global/teardown';
import * as request from 'supertest';
import { getJWTToken, saveUser } from '../_helpers/User';
import { saveCourse, saveCourses } from '../_helpers/Course';

describe('RoadmapController', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await makeApp();
		await app.init();
	});

	afterAll(async () => {
		await teardownApp(app);
	});

	describe('getPersonalRoadmap', () => {
		it('should throw unauthorized for non-existing user', async () => {
			return request(app.getHttpServer()).get('/rest-api/roadmap/personal').expect(401);
		});

		it('should return empty roadmap for new user', async () => {
			return request(app.getHttpServer())
				.get('/rest-api/roadmap/personal')
				.set('Authorization', `Bearer ${await getJWTToken(app)}`)
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual({ courses: [] });
				});
		});

		it('should return roadmap for existing user', async () => {
			const courses = await saveCourses(app, 10);
			const user = await saveUser(app, { plannedCourses: courses });
			const token = await getJWTToken(app, user);
			return request(app.getHttpServer())
				.get('/rest-api/roadmap/personal')
				.set('Authorization', `Bearer ${token}`)
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual({
						courses: user.plannedCourses.map((course) => {
							return { cid: course.cid };
						}),
					});
				});
		});
	});

	// describe('updatePersonalRoadmap', () => {
	// 	it('should throw unauthorized for non-existing user', async () => {
	// 		return request(app.getHttpServer()).post('/rest-api/roadmap/personal').expect(401);
	// 	});
	//
	// 	it('should update roadmap for existing user', async () => {
	// 		const courses = await saveCourses(app, 10);
	// 		console.log(courses);
	// 		const user = await saveUser(app, { plannedCourses: courses });
	// 		console.log(user);
	// 		const token = await getJWTToken(app, user);
	// 		console.log(token);
	// 		const newCourses = await saveCourses(app, 2);
	// 		console.log(newCourses);
	// 		return request(app.getHttpServer())
	// 			.post('/rest-api/roadmap/personal')
	// 			.set('Authorization', `Bearer ${token}`)
	// 			.send({ courses: newCourses })
	// 			.expect(200)
	// 			.then((response) => {
	// 				expect(response.body).toEqual({
	// 					courses: newCourses.map((course) => {
	// 						return { cid: course.cid };
	// 					}),
	// 				});
	// 			});
	// 	});
	//
	// 	it('should throw error for invalid courses', async () => {
	// 		const courses = await saveCourses(app, 10);
	// 		const user = await saveUser(app, { plannedCourses: courses });
	// 		const token = await getJWTToken(app, user);
	// 		const newCourses = await saveCourses(app, 2);
	// 		return request(app.getHttpServer())
	// 			.post('/rest-api/roadmap/personal')
	// 			.set('Authorization', `Bearer ${token}`)
	// 			.send({ courses: newCourses.map((course) => ({ cid: course.cid + 1000 })) })
	// 			.expect(400);
	// 	});
	//
	// 	it('should throw error for invalid roadmap with invalid prerequisites', async () => {
	// 		const courses = await saveCourses(app, 10);
	// 		const user = await saveUser(app, { plannedCourses: courses });
	// 		const token = await getJWTToken(app, user);
	// 		const course = await saveCourse(app);
	// 		const course2 = await saveCourse(app, { prerequisites: [course] });
	// 		return request(app.getHttpServer())
	// 			.post('/rest-api/roadmap/personal')
	// 			.set('Authorization', `Bearer ${token}`)
	// 			.send({ courses: [{ cid: course2.cid }] }) // course2 has a prerequisite but it's not in new roadmap
	// 			.expect(400);
	// 	});
	// });
});
