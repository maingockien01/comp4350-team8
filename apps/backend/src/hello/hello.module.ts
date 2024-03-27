import {Module} from '@nestjs/common';
import {HelloController} from './hello.controller';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [],
})
/**
 * Represents the Hello module.
 */
export class HelloModule {}
