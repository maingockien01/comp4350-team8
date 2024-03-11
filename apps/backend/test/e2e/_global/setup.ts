require('ts-node').register({
  transpileOnly: true,
});

import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../src/app.module";

const setup = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  const app: INestApplication = module.createNestApplication();
  global.app = app;
  global.testingModules = module;
  await app.init();
};

export default setup;
