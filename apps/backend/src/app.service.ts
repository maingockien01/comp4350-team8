import { Injectable } from '@nestjs/common';
import { APPS_NAME } from '@team8/constants/apps';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello ${APPS_NAME}!`;
  }
}
