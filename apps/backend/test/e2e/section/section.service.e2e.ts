import {SectionService} from '../../../src/sections/section.service';
import {INestApplication} from '@nestjs/common';
import {makeApp} from '../_global/setup';
import {teardownApp} from '../_global/teardown';

describe('TermService', () => {
  let app: INestApplication;
  let sectionService: SectionService;

  beforeAll(async () => {
    app = await makeApp();
    sectionService = app.get(SectionService);
  });

  afterAll(async () => {
    await teardownApp(app);
  });

  describe('findAll()', () => {
    it('should return an array', async () => {
      const result = await sectionService.find(1000);
      expect(result).toBeNull();
    });
  });
});
