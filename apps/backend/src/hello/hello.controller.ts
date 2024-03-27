import {Controller, Get} from '@nestjs/common';
import {APPS_NAME} from '@team8/constants/apps';

@Controller()
/**
 * Controller class for the hello endpoint.
 */
export class HelloController {
  /**
   * Retrieves the hello message.
   * @return {string} The hello message.
   */
  @Get()
  getHello(): string {
    return APPS_NAME;
  }
}
