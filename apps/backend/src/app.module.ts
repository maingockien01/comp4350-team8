import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoutesModule } from './routes.module';
import { ConfigModule } from '@nestjs/config';
import { envFiles } from './config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { RoadmapModule } from './roadmap/roadmap.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: envFiles('apps.env', 'database.env'),
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '/../../frontend/dist'),
			exclude: ['/rest-api*', 'health*'],
		}),
		RoutesModule,
		DatabaseModule,
		HealthModule,
		AuthModule,
		UsersModule,
		ProfileModule,
		RoadmapModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
