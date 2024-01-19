import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoutesModule } from './routes.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '/../../../frontend/build'),
			exclude: ['/rest-api*'],
		}),
		RoutesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
