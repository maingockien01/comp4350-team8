import {UserCourseService} from '../../../src/users/user.course.service';
import {BadRequestException, INestApplication} from '@nestjs/common';
import {makeApp} from '../_global/setup';
import {teardownApp} from '../_global/teardown';
import {saveUser} from '../_helpers/User';

describe('UserCourseService', () => {
  let app: INestApplication;
  let userCourseService: UserCourseService;

  beforeAll(async () => {
    app = await makeApp();
    userCourseService = app.get(UserCourseService);
  });

  afterAll(async () => {
    await teardownApp(app);
  });

  describe('findAll()', () => {
    it('should return an array', async () => {
      const result = await userCourseService.findAll();
      expect(result).toBeInstanceOf(Array);
    });

    it('should contain specific user', async () => {
      const user = await saveUser(app);
      const result = await userCourseService.findAll();
      expect(result.map((res) => res.uid)).toContain(user.uid);
    });
  });

  describe('find()', () => {
    it('should find and return specific user', async () => {
      const user = await saveUser(app);
      const result = await userCourseService.find(user.uid);
      expect(result.uid).toBe(user.uid);
    });

    it('should return null', async () => {
      const result = await userCourseService.find(1000);
      expect(result).toBeNull();
    });
  });

  describe('findSection()', () => {
    it('should return empty ', async () => {
      await expect(() =>
        userCourseService.findSection(10000, 100000),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return an Array type', async () => {
      const result = await userCourseService.findSection(1, 1);
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findActive()', () => {
    it('should return empty', async () => {
      await expect(() =>
        userCourseService.findActive(10000, 100000),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return an Array type', async () => {
      const result = await userCourseService.findActive(1, 1);
      expect(result).toBeInstanceOf(Array);
    });
  });
});
