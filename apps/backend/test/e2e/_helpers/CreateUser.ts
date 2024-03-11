import { User } from '../../../src/entities/user.entity';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

export function createUser(app: INestApplication, overrides: Partial<User> = {}): Promise<User> {
	return app.get<Repository<User>>('UserRepository').save({
		username: randomStringGenerator(),
		hashPassword: randomStringGenerator(),
		pictureProfile: randomStringGenerator(),
		fullName: randomStringGenerator(),
		...overrides,
	});
}
