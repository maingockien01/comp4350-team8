require('ts-node').register({
  transpileOnly: true,
});

import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing";
import { AppModule } from "../../../src/app.module";

const setup = async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  const app: INestApplication = module.createNestApplication();
  global.app = app;
  global.testingModules = module;
  await app.init();
};

export default setup;
