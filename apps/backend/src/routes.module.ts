import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TermModule } from './terms/term.module';
import { DegreeModule } from './degrees/degree.module';
import { UserCourseModule } from './users/user.course.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CourseModule } from './courses/course.module';
import { SectionModule } from './sections/section.module';

@Module({
	imports: [
		TermModule,
		DegreeModule,
		UserCourseModule,
		AuthModule,
		CourseModule,
		SectionModule,
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
						path: '/course',
						module: CourseModule,
					},
					{
						path: '/section',
						module: SectionModule,
					},
				],
			},
		]),
	],
	controllers: [],
	providers: [],
})
export class RoutesModule {}
