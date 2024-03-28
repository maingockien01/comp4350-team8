import {Controller, Get} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
/**
 * Controller class for managing health checks.
 */
export class HealthController {
  /**
   * Creates an instance of HealthController.
   * @param {HealthCheckService} health
   * @param {TypeOrmHealthIndicator} typeorm
   * @param {ConfigService} config
   */
  constructor(
    private health: HealthCheckService,
    private typeorm: TypeOrmHealthIndicator,
    private config: ConfigService,
  ) {}

  /**
   * Checks the health of the application.
   * @return {Promise<{}>}
   */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.typeorm.pingCheck(this.config.get<string>('DB_DATABASE')),
    ]);
  }
}
