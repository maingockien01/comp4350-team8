import { Test } from '@nestjs/testing';
import { DegreeController } from '../../../src/degrees/degree.controller';
import { ModuleMocker } from 'jest-mock';
import { DegreeService } from '../../../src/degrees/degree.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Degree } from '../../../src/entities/degree.entity';
import { DegreeDTO } from '../../../src/degrees/degree.dto';

const moduleMocker = new ModuleMocker(global);

describe('DegreeController', () => {
    let degreeController: DegreeController;
    let degreeService: DegreeService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [DegreeController],
            providers: [DegreeService,{
                provide: getRepositoryToken(Degree),
                useClass: Repository
            }]
        }).compile();

        degreeController = moduleRef.get<DegreeController>(DegreeController);
        degreeService = moduleRef.get<DegreeService>(DegreeService);
    });
    
    describe('findAll', () => {
        it('should return an array of degrees', async () => {
        const result: DegreeDTO[] = [
            {
                "did": 1,
                "name": "Computer Science"
            },
        ];

        jest.spyOn(degreeService, 'findAll').mockImplementation(() => Promise.resolve(result));
        expect(await degreeController.findAll()).toBe(result);
        });
    });
});