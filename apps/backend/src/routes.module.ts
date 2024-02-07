import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { RouterModule } from '@nestjs/core';
import { CoursesModule } from './courses/courses.module';

@Module({
	imports: [
		HelloModule,
		CoursesModule,
		RouterModule.register([
			{
				path: '/rest-api',
				children: [
					{
						path: '/hello',
						module: HelloModule,
					},
					{
						path: '/courses',
						module: CoursesModule,
					},
				],
			},
		]),
	],
	controllers: [],
	providers: [],
})
export class RoutesModule {}
