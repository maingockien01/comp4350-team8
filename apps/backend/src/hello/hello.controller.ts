import { Controller, Get } from '@nestjs/common';
import { APPS_NAME } from '@team8/constants/apps';

@Controller()
export class HelloController {
	@Get()
	getHello(): string {
		return `Hello from ${APPS_NAME} updated!`;
	}
}
