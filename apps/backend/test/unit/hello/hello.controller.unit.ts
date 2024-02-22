import { Test } from '@nestjs/testing';
import { HelloController } from '../../../src/hello/hello.controller';
import { ModuleMocker } from 'jest-mock';
import { APPS_NAME } from '@team8/constants/apps';

const moduleMocker = new ModuleMocker(global);

describe('HelloController', () => {
    let helloController: HelloController;
    
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [HelloController],
        }).compile();

        helloController = moduleRef.get<HelloController>(HelloController);
    });
    
    describe('getHello', () => {
        it('should return a string', () => {
        const result = helloController.getHello();
        expect(typeof result).toBe('string');
        });
    
        it('should return a string with the APPS_NAME', () => {
        const result = helloController.getHello();
        expect(result).toContain(APPS_NAME);
        });
    });
});