import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoutesModule } from './routes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envFiles } from './config';
import { HealthModule } from './health/health.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: envFiles('apps.env', 'database.env'),
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '/../../frontend/dist'),
			exclude: ['/rest-api*', "health*"],
		}),
		RoutesModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: 'mysql',
				host: config.get<string>('DB_HOST'),
				port: 3306,
				username: "app",
				password: "password",
				database: "app",
				autoLoadEntities: true,
				synchronize: true,
			}),
		}),
		HealthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
