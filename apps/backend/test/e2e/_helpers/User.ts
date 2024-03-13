import { User } from '../../../src/entities/user.entity';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { AuthService } from '../../../src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';

export function saveUser(app: INestApplication, overrides: Partial<User> = {}): Promise<User> {
	return app.get<Repository<User>>(getRepositoryToken(User)).save(
		{
			username: randomStringGenerator(),
			hashPassword: randomStringGenerator(),
			pictureProfile: randomStringGenerator(),
			fullName: randomStringGenerator(),
			...overrides,
		},
		{ reload: true },
	);
}

export async function getJWTToken(app: INestApplication, user: User = null): Promise<string> {
	if (!user) {
		user = await saveUser(app);
	}
	return app.get<AuthService>(AuthService).generateToken(user);
}
