import {INestApplication} from '@nestjs/common';
import {makeApp} from '../_global/setup';
import {teardownApp} from '../_global/teardown';
import * as request from 'supertest';
import {getJWTToken} from '../_helpers/User';

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
      return request(app.getHttpServer())
          .get('/rest-api/section/search?sid=1')
          .expect(200);
    });

    it('should return null for invalid sid', async () => {
      return request(app.getHttpServer())
          .get('/rest-api/section/search?sid=10000')
          .set('Authorization', `Bearer ${await getJWTToken(app)}`)
          .then((response) => {
            expect(response.body).toEqual({});
          });
    });
  });
});
