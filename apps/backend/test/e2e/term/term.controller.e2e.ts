import { INestApplication } from '@nestjs/common';
import { makeApp } from '../_global/setup';
import { teardownApp } from '../_global/teardown';
import * as request from 'supertest';
import { getJWTToken, saveUser } from '../_helpers/User';

describe('UserCourseController', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await makeApp();
		await app.init();
	});

	afterAll(async () => {
		await teardownApp(app);
	});

	describe('findAll()', () => {
		it('should be accessable', async () => {
			return request(app.getHttpServer()).get('/rest-api/term').expect(200);
		});

		it('should return an array of Term', async () => {
			return request(app.getHttpServer())
				.get('/rest-api/term')
				.set('Authorization', `Bearer ${await getJWTToken(app)}`)
				.then((response) => {
					expect(response.body).toBeInstanceOf(Array);
				});
		});
	});

	describe('findCurrent()', () => {
		it('should be accessable', async () => {
			return request(app.getHttpServer()).get('/rest-api/term/searchCurrent').expect(200);
		});
	});
});
