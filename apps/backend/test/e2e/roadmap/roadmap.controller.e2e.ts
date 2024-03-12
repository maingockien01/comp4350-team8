import { INestApplication } from '@nestjs/common';
import { makeApp } from '../_global/setup';
import { teardownApp } from '../_global/teardown';
import * as request from 'supertest';
import { getJWTToken } from '../_helpers/User';

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
	});
});
