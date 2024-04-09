import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../../../src/app.module';
import {loadEnv} from '../../../src/config';

export const makeApp = async (): Promise<INestApplication> => {
  loadEnv();
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  return module.createNestApplication();
};
