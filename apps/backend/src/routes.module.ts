import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TermModule } from './terms/term.module';
import { DegreeModule } from './degrees/degree.module';
import { UserCourseModule } from './users/user.course.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { RoadmapModule } from './roadmap/roadmap.module';

@Module({
	imports: [
		TermModule,
		DegreeModule,
		UserCourseModule,
		AuthModule,
		RoadmapModule,
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
						module: UserCourseModule,
					},
					{
						path: '/roadmap',
						module: RoadmapModule,
					},
				],
			},
		]),
	],
	controllers: [],
	providers: [],
})
export class RoutesModule {}
