import { TermService } from '../../../src/terms/term.service';
import { BadRequestException, INestApplication } from '@nestjs/common';
import { makeApp } from '../_global/setup';
import { teardownApp } from '../_global/teardown';
import * as request from 'supertest';

describe('TermService', () => {
	let app: INestApplication;
	let termService: TermService;

	beforeAll(async () => {
		app = await makeApp();
		termService = app.get(TermService);
	});

	afterAll(async () => {
		await teardownApp(app);
	});

	describe('findAll()', () => {
		it('should return an array', async () => {
			const result = await termService.findAll();
			expect(result).toBeInstanceOf(Array);
		});
	});
});
