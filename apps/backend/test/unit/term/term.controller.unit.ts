import {Test} from '@nestjs/testing';
import {TermController} from '../../../src/terms/term.controller';
import {TermDTO} from '@team8/types/dtos/term/term.dto';
import {TermService} from '../../../src/terms/term.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Term} from '../../../src/entities/term.entity';
import {Repository} from 'typeorm';

describe('TermController', () => {
  let termController: TermController;
  let termService: TermService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TermController],
      providers: [
        TermService,
        {
          provide: getRepositoryToken(Term),
          useClass: Repository,
        },
      ],
    }).compile();

    termController = moduleRef.get<TermController>(TermController);
    termService = moduleRef.get<TermService>(TermService);
  });

  describe('findAll', () => {
    it('should return an array', async () => {
      const result: TermDTO[] = [
        {
          tid: 1,
          year: 2014,
          season: 'Winter',
        },
      ];

      jest
          .spyOn(termService, 'findAll')
          .mockImplementation(() => Promise.resolve(result));
      expect(await termController.findAll()).toBeInstanceOf(Array);
    });

    it('should return an array of Terms', async () => {
      const result: TermDTO[] = [
        {
          tid: 1,
          year: 2014,
          season: 'Winter',
        },
        {
          tid: 2,
          year: 2014,
          season: 'Spring',
        },
        {
          tid: 3,
          year: 2014,
          season: 'Summer',
        },
        {
          tid: 4,
          year: 2014,
          season: 'Fall',
        },
        {
          tid: 5,
          year: 2015,
          season: 'Winter',
        },
        {
          tid: 6,
          year: 2015,
          season: 'Spring',
        },
        {
          tid: 7,
          year: 2015,
          season: 'Summer',
        },
        {
          tid: 8,
          year: 2015,
          season: 'Fall',
        },
        {
          tid: 9,
          year: 2016,
          season: 'Winter',
        },
        {
          tid: 10,
          year: 2016,
          season: 'Spring',
        },
      ];

      jest
          .spyOn(termService, 'findAll')
          .mockImplementation(() => Promise.resolve(result));
      expect(await termController.findAll()).toBe(result);
    });
  });

  describe('findCurrentTerm', () => {
    it('it should return a tid of the current Term', async () => {
      const result = 10; // current term have tid = 10
      jest
          .spyOn(termService, 'findCurrentTerm')
          .mockImplementation(() => Promise.resolve(result));
      expect(await termController.findCurrent()).toBe(result);
    });
  });
});
