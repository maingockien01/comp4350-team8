import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (config: ConfigService) => ({
				type: 'mysql',
				host: config.getOrThrow<string>('DB_HOST'),
				port: config.getOrThrow<number>('DB_PORT'),
				username: config.getOrThrow<string>('DB_USER'),
				password: config.getOrThrow<string>('DB_PASSWORD'),
				database: config.getOrThrow<string>('DB_DATABASE'),
				autoLoadEntities: config.getOrThrow<boolean>(
					'DB_AUTOLOAD_ENTITIES',
				),
				synchronize: config.getOrThrow<boolean>('DB_SYNCHRONIZE'),
				entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
			}),
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
