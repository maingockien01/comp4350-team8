import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Department } from '../../../src/entities/department.entity';

export function saveDepartment(app, overrides = {}) {
	return app.get(getRepositoryToken(Department)).save({
		name: randomStringGenerator(),
		abbreviation: randomStringGenerator(),
		...overrides,
	}, { reload: true });
}