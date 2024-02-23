import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from '../src/auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
	imports: [
		HelloModule,
		AuthModule,
		RouterModule.register([
			{
				path: '/rest-api',
				children: [
					{
						path: '/hello',
						module: HelloModule,
					},
					{
						path: '/auth',
						module: AuthModule,
					},
					{
						path: '/profile',
						module: ProfileModule,
					},
				],
			},
		]),
	],
	controllers: [],
	providers: [],
})
export class RoutesModule {}
