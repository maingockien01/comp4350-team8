import { Test } from '@nestjs/testing';
import { DegreeController } from '../../../src/degrees/degree.controller';
import { ModuleMocker } from 'jest-mock';
import { DegreeService } from '../../../src/degrees/degree.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Degree } from '../../../src/entities/degree.entity';

describe('DegreeService', () => {
	let degreeService: DegreeService;
	let degreeRepository: Repository<Degree>;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [DegreeController],
			providers: [
				DegreeService,
				{
					provide: getRepositoryToken(Degree),
					useClass: Repository,
				},
			],
		}).compile();

		degreeService = moduleRef.get<DegreeService>(DegreeService);
		degreeRepository = moduleRef.get(getRepositoryToken(Degree));
	});

	describe('getDegrees', () => {
		it('should return an array as a result', async () => {
			const criterias = { did: 1 };
			const withRecommendedCourses = false;
			const result: Degree[] = [];

			jest.spyOn(degreeRepository, 'find').mockImplementation((options: FindManyOptions<Degree>) => {
				expect(options.where).toEqual(criterias);
				expect(options.relations).toEqual({});

				return Promise.resolve(result);
			});
			expect(await degreeService.getDegrees(criterias, withRecommendedCourses)).toBeInstanceOf(Array);
		});

		it('should make request to repository with criterias and without recommended courses', async () => {
			const criterias = { did: 1 };
			const withRecommendedCourses = false;
			const result: Degree[] = [];

			jest.spyOn(degreeRepository, 'find').mockImplementation((options: FindManyOptions<Degree>) => {
				expect(options.where).toEqual(criterias);
				expect(options.relations).toEqual({});

				return Promise.resolve(result);
			});
			expect(await degreeService.getDegrees(criterias, withRecommendedCourses)).toBe(result);
		});

		it('should return array as a result', async () => {
			const criterias = { did: 1 };
			const withRecommendedCourses = true;
			const result: Degree[] = [];

			jest.spyOn(degreeRepository, 'find').mockImplementation((options: FindManyOptions<Degree>) => {
				expect(options.where).toEqual(criterias);
				expect(options.relations).toEqual({ recommendedCourses: { prerequisites: true } });

				return Promise.resolve(result);
			});
			expect(await degreeService.getDegrees(criterias, withRecommendedCourses)).toBeInstanceOf(Array);
		});

		it('should make request to repository with criterias and recommended courses', async () => {
			const criterias = { did: 1 };
			const withRecommendedCourses = true;
			const result: Degree[] = [];

			jest.spyOn(degreeRepository, 'find').mockImplementation((options: FindManyOptions<Degree>) => {
				expect(options.where).toEqual(criterias);
				expect(options.relations).toEqual({ recommendedCourses: { prerequisites: true } });

				return Promise.resolve(result);
			});
			expect(await degreeService.getDegrees(criterias, withRecommendedCourses)).toBe(result);
		});
	});
});
