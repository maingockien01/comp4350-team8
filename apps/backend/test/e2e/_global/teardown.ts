import {INestApplication} from '@nestjs/common';

export const teardownApp = async (app: INestApplication) => {
  try {
    await app.close();
  } catch (e) {}
};
