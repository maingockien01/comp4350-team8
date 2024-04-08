import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TerminusModule} from '@nestjs/terminus';
import {HealthController} from './health.controller';

@Module({
  imports: [TerminusModule, ConfigModule],
  controllers: [HealthController],
})
/**
 * Represents the Health module.
 */
export class HealthModule {}
