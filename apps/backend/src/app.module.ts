import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoutesModule } from './routes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '/../../frontend/dist'),
			exclude: ['/rest-api*'],
		}),
		RoutesModule,
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "database",
			port: 3306,
			username: "root",
			password: "root",
			database: "app",
			autoLoadEntities: true,
			synchronize: true,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
