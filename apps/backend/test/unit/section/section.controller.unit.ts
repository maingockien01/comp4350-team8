import { Test } from '@nestjs/testing';
import { SectionController } from '../../../src/sections/section.controller';
import { ModuleMocker } from 'jest-mock';
import { SectionDTO } from '@team8/types/dtos/section/section.dto';
import { SectionService } from '../../../src/sections/section.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Section } from '../../../src/entities/section.entity';
import { Repository } from 'typeorm';

const moduleMocker = new ModuleMocker(global);

describe('SectionController', () => {
	let sectionController: SectionController;
	let sectionService: SectionService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [SectionController],
			providers: [
				SectionService,
				{
					provide: getRepositoryToken(Section),
					useClass: Repository,
				},
			],
		}).compile();

		sectionController = moduleRef.get<SectionController>(SectionController);
		sectionService = moduleRef.get<SectionService>(SectionService);
	});

	describe('findAll', () => {
		it('should return a specific Section', async () => {
			const result: Section = {
				sid: 1,
				sectionName: 'A01',
				time: 'M17:00-18:00,W17:00-18:00,F17:00-18:00',
				professor: 'Dr Doofen',
				course: null,
				term: null,
				location: null,
				users: null,
				doneUsers: null,
			};
			jest.spyOn(sectionService, 'find').mockImplementation(() => Promise.resolve(result));
			expect(await sectionController.findSection(1)).toBe(result);
		});
	});
});
