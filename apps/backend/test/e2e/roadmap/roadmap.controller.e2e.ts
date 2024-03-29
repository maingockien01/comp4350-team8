import {INestApplication} from '@nestjs/common';
import {makeApp} from '../_global/setup';
import {teardownApp} from '../_global/teardown';
import * as request from 'supertest';
import {getJWTToken, saveUser} from '../_helpers/User';
import {saveCourse, saveCourses} from '../_helpers/Course';

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
      return request(app.getHttpServer())
          .get('/rest-api/roadmap/personal')
          .expect(401);
    });

    it('should be accessable for registered user', async () => {
      return request(app.getHttpServer())
          .get('/rest-api/roadmap/personal')
          .set('Authorization', `Bearer ${await getJWTToken(app)}`)
          .expect(200);
    });

    it('should return empty roadmap for new user', async () => {
      return request(app.getHttpServer())
          .get('/rest-api/roadmap/personal')
          .set('Authorization', `Bearer ${await getJWTToken(app)}`)
          .then((response) => {
            expect(response.body).toEqual({courses: []});
          });
    });

    it('should return roadmap for existing user', async () => {
      const courses = await saveCourses(app, 2);
      const user = await saveUser(app, {plannedCourses: courses});
      const token = await getJWTToken(app, user);
      return request(app.getHttpServer())
          .get('/rest-api/roadmap/personal')
          .set('Authorization', `Bearer ${token}`)
          .then((response) => {
            expect(response.body.courses.map((course) => course.cid)).toEqual(
                courses.map((course) => course.cid),
            );
          });
    });
  });

  describe('updatePersonalRoadmap', () => {
    it('should throw unauthorized for non-existing user', async () => {
      return request(app.getHttpServer())
          .post('/rest-api/roadmap/personal')
          .expect(401);
    });

    it('should be accessable for existing user', async () => {
      const courses = await saveCourses(app, 10);
      const user = await saveUser(app, {plannedCourses: courses});
      const token = await getJWTToken(app, user);
      const newCourses = await saveCourses(app, 2);
      return request(app.getHttpServer())
          .post('/rest-api/roadmap/personal')
          .set('Authorization', `Bearer ${token}`)
          .send({courses: newCourses})
          .expect(200);
    });

    it('should update roadmap for existing user', async () => {
      const courses = await saveCourses(app, 10);
      const user = await saveUser(app, {plannedCourses: courses});
      const token = await getJWTToken(app, user);
      const newCourses = await saveCourses(app, 2);
      return request(app.getHttpServer())
          .post('/rest-api/roadmap/personal')
          .set('Authorization', `Bearer ${token}`)
          .send({courses: newCourses})
          .then((response) => {
            expect(response.body.courses.map((course) => course.cid)).toEqual(
                newCourses.map((course) => course.cid),
            );
          });
    });

    it('should throw error for invalid courses', async () => {
      const courses = await saveCourses(app, 10);
      const user = await saveUser(app, {plannedCourses: courses});
      const token = await getJWTToken(app, user);
      const newCourses = await saveCourses(app, 2);
      return request(app.getHttpServer())
          .post('/rest-api/roadmap/personal')
          .set('Authorization', `Bearer ${token}`)
          .send({
            courses: newCourses.map((course) => ({cid: course.cid + 1000})),
          })
          .expect(400);
    });

    it(
        'should throw error for invalid roadmap with invalid prerequisites',
        async () => {
          const courses = await saveCourses(app, 10);
          const user = await saveUser(app, {plannedCourses: courses});
          const token = await getJWTToken(app, user);
          const course = await saveCourse(app);
          const course2 = await saveCourse(app, {prerequisites: [course]});
          return request(app.getHttpServer())
              .post('/rest-api/roadmap/personal')
              .set('Authorization', `Bearer ${token}`)
          // course2 has a prerequisite but it's not in new roadmap
              .send({courses: [{cid: course2.cid}]})
              .expect(400);
        });
  });
});
