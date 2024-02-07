import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	console.log(`App is running in ${configService.get('NODE_ENV') || 'dev'} mode, listening on port ${configService.get('PORT')}`);
	await app.listen(configService.get('PORT'));
}
bootstrap();
