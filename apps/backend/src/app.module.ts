import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoutesModule } from './routes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envFiles } from './config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { JwtModule } from '@nestjs/jwt';

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
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET') || 'secret',
				signOptions: { expiresIn: '7d' },
			}),
			inject: [ConfigService],
			global: true,
		}),
		RoutesModule,
		DatabaseModule,
		HealthModule,
		AuthModule,
		UsersModule,
		ProfileModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
