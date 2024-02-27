import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TermModule } from './terms/term.module';
import { DegreeModule } from './degrees/degree.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
	imports: [
		TermModule,
		DegreeModule,
		UserModule,
		AuthModule,
		RouterModule.register([
			{
				path: '/rest-api',
				children: [
					{
						path: '/auth',
						module: AuthModule,
					},
					{
						path: '/profile',
						module: ProfileModule,
					},
					{
						path: '/term',
						module: TermModule,
					},
					{
						path: '/degree',
						module: DegreeModule,
					},
					{
						path: '/user',
						module: UserModule,
					},
				],
			},
		]),
	],
	controllers: [],
	providers: [],
})
export class RoutesModule {}
