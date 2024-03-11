import { Test } from '@nestjs/testing';
import { DegreeController } from '../../../src/degrees/degree.controller';
import { ModuleMocker } from 'jest-mock';
import { DegreeService } from '../../../src/degrees/degree.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Degree } from '../../../src/entities/degree.entity';
import { DegreeDTO } from '@team8/types/dtos/degree/degree.dto';
import { NotFoundException } from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('DegreeController', () => {
	let degreeController: DegreeController;
	let degreeService: DegreeService;

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

		degreeController = moduleRef.get<DegreeController>(DegreeController);
		degreeService = moduleRef.get<DegreeService>(DegreeService);
	});

	describe('findAll', () => {
		it('should return an array of degrees', async () => {
			const result: DegreeDTO[] = [
				{
					did: 1,
					name: 'Computer Science',
				},
			];

			jest.spyOn(degreeService, 'findAll').mockImplementation(() => Promise.resolve(result));
			expect(await degreeController.findAll()).toBe(result);
		});
	});

	describe('getDegreeWithRoadmap', () => {
		it('should return a degree with roadmap', async () => {
			const result: DegreeDTO[] = [
				{
					did: 1,
					name: 'Computer Science',
					recommendedCourses: [
						{
							cid: 1,
							courseName: 'Software Engineering',
							description: 'Learn how to develop software',
							courseNumber: 4350,
							department: 'Computer Science',
							prerequisites: [],
						},
					],
				},
			];

			jest.spyOn(degreeService, 'getDegrees').mockImplementation(
				(criterias: Partial<Degree>, withRecommendedCourses: boolean) => {
					expect(criterias).toEqual({ did: 1 });
					expect(withRecommendedCourses).toBeTruthy();

					return Promise.resolve(result);
				},
			);
			expect(await degreeController.getDegreeById(1, true)).toBe(result[0]);
		});

		it('should return a degree without roadmap', async () => {
			const result: DegreeDTO[] = [
				{
					did: 1,
					name: 'Computer Science',
				},
			];

			jest.spyOn(degreeService, 'getDegrees').mockImplementation(
				(criterias: Partial<Degree>, withRecommendedCourses: boolean) => {
					expect(criterias).toEqual({ did: 1 });
					expect(withRecommendedCourses).toBeFalsy();

					return Promise.resolve(result);
				},
			);
			expect(await degreeController.getDegreeById(1, false)).toBe(result[0]);
		});

		it('should return not found', async () => {
			const result: DegreeDTO[] = [];

			jest.spyOn(degreeService, 'getDegrees').mockImplementation(
				(criterias: Partial<Degree>, withRecommendedCourses: boolean) => {
					expect(criterias).toEqual({ did: 1 });
					expect(withRecommendedCourses).toBeFalsy();

					return Promise.resolve(result);
				},
			);
			await expect(() => degreeController.getDegreeById(1, false)).rejects.toThrow(
				new NotFoundException(`Degree with id 1 not found`),
			);
		});
	});
});
