import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { RouterModule } from '@nestjs/core';

@Module({
	imports: [
		HelloModule,
		RouterModule.register([
			{
				path: '/rest-api',
				children: [
					{
						path: '/hello',
						module: HelloModule,
					},
				],
			},
		]),
	],
	controllers: [],
	providers: [],
})
export class RoutesModule {}
