import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { RouterModule } from '@nestjs/core';
import { TermModule } from './terms/term.module';
import { DegreeModule } from './degrees/degree.module';
import { Degree } from './entities/degree.entity';

@Module({
	imports: [
		HelloModule,
		TermModule,
		DegreeModule,
		RouterModule.register([
			{
				path: '/rest-api',
				children: [
					{
						path: '/hello',
						module: HelloModule,
					},
					{
						path:'/term',
						module: TermModule,
					},
					{
						path:'/degree',
						module: DegreeModule,
					},
				],
			},
		]),
	],
	controllers: [],
	providers: [],
})
export class RoutesModule {}
