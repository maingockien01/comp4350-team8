import {User} from '../../../src/entities/user.entity';
import {INestApplication} from '@nestjs/common';
import {Repository} from 'typeorm';
import {randomStringGenerator}
  from '@nestjs/common/utils/random-string-generator.util';
import {AuthService} from '../../../src/auth/auth.service';
import {getRepositoryToken} from '@nestjs/typeorm';

/**
 * Saves a user to the database.
 *
 * @param {INestApplication} app
 * The Nest application instance.
 * @param {Partial<User>} overrides
 * Optional overrides for the user properties.
 * @return {Promise<User>}
 * A promise that resolves to the saved user.
 */
export function saveUser(
    app: INestApplication,
    overrides: Partial<User> = {},
): Promise<User> {
  return app.get<Repository<User>>(getRepositoryToken(User)).save(
      {
        username: randomStringGenerator(),
        hashPassword: randomStringGenerator(),
        fullName: randomStringGenerator(),
        ...overrides,
      },
      {reload: true},
  );
}

/**
 * Generates a JWT token for the specified user.
 * If no user is provided, a new user will be saved to the database and used.
 *
 * @param {INestApplication} app
 * The Nest application instance.
 * @param {User} user
 * The user for whom to generate the token.
 * If not provided, a new user will be saved.
 * @return {Promise<string>}
 * A promise that resolves to the generated JWT token.
 */
export async function getJWTToken(
    app: INestApplication,
    user: User = null,
): Promise<string> {
  if (!user) {
    user = await saveUser(app);
  }
  return app.get<AuthService>(AuthService).generateToken(user);
}
