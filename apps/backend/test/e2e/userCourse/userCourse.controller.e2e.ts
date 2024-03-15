import { INestApplication } from '@nestjs/common';
import { makeApp } from '../_global/setup';
import { teardownApp } from '../_global/teardown';
import * as request from 'supertest';
import { getJWTToken, saveUser } from '../_helpers/User';
import { saveCourse, saveCourses } from '../_helpers/Course';

describe('UserCourseController', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await makeApp();
		await app.init();
	});

	afterAll(async () => {
		await teardownApp(app);
	});

	describe('searchSection', () => {
		it('should throw unauthorized for non-existing user', async () => {
			return request(app.getHttpServer()).get('/rest-api/user/searchSection?uid=1&tid=12').expect(401);
		});

		it('should allow registered-user access the function', async () => {
			return request(app.getHttpServer())
				.get('/rest-api/user/searchSection?uid=1&tid=12')
				.set('Authorization', `Bearer ${await getJWTToken(app)}`)
				.expect(200);
		});

		it('should return something for registered-user', async () => {
			return request(app.getHttpServer())
				.get('/rest-api/user/searchSection?uid=1&tid=12')
				.set('Authorization', `Bearer ${await getJWTToken(app)}`)
				.then((response) => {
					expect(response.body).toBeInstanceOf(Array);
				});
		});
	});

	describe('searchActive', () => {
		it('should throw unauthorized for non-existing user', async () => {
			return request(app.getHttpServer()).get('/rest-api/user/searchActive?uid=1&tid=12').expect(401);
		});

		it('should allow registered user to access fuction', async () => {
			return request(app.getHttpServer())
				.get('/rest-api/user/searchActive?uid=1&tid=12')
				.set('Authorization', `Bearer ${await getJWTToken(app)}`)
				.expect(200);
		});

		it('should return something for registered-user', async () => {
			return request(app.getHttpServer())
				.get('/rest-api/user/searchActive?uid=1&tid=12')
				.set('Authorization', `Bearer ${await getJWTToken(app)}`)
				.then((response) => {
					expect(response.body).toBeInstanceOf(Array);
				});
		});
	});

	describe('add', () => {
		it('should throw unauthorized for non-existing user', async () => {
			return request(app.getHttpServer()).get('/rest-api/user/add?uid=1&tid=12').expect(401);
		});

		it('should throw exception for invalid section id', async () => {
			return request(app.getHttpServer())
				.get('/rest-api/user/add?uid=1&sid=1222')
				.set('Authorization', `Bearer ${await getJWTToken(app)}`)
				.expect(400);
		});
	});

	describe('remove', () => {
		it('should throw unauthorized for non-existing user', async () => {
			return request(app.getHttpServer()).get('/rest-api/user/remove?uid=1&tid=12').expect(401);
		});
	});
});
