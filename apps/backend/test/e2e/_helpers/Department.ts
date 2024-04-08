
import {randomStringGenerator}
  from '@nestjs/common/utils/random-string-generator.util';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Department} from '../../../src/entities/department.entity';

/**
 * Saves a department to the database.
 * @param {any} app
 * The application instance.
 * @param {object} overrides
 * Optional overrides for the department properties.
 * @return {Promise<Department>}
 * A promise that resolves to the saved department.
 */
export function saveDepartment(app, overrides = {}) {
  return app.get(getRepositoryToken(Department)).save(
      {
        name: randomStringGenerator(),
        abbreviation: randomStringGenerator(),
        ...overrides,
      },
      {reload: true},
  );
}
