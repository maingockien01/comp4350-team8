import { User } from '../../../src/entities/user.entity';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { AuthService } from '../../../src/auth/auth.service';

export function saveUser(app: INestApplication, overrides: Partial<User> = {}): Promise<User> {
	return app.get<Repository<User>>('UserRepository').save({
		username: randomStringGenerator(),
		hashPassword: randomStringGenerator(),
		pictureProfile: randomStringGenerator(),
		fullName: randomStringGenerator(),
		...overrides,
	});
}

export async function getJWTToken(app: INestApplication, user: User = null): Promise<string> {
	if (!user) {
		user = await saveUser(app);
	}
	return app.get<AuthService>(AuthService).generateToken(user);
}
