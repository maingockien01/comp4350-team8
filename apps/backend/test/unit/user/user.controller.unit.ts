import { Test } from '@nestjs/testing';
import { UserController } from '../../../src/users/user.course.controller';
import { APPS_NAME } from '@team8/constants/apps';
import { UserService } from '../../../src/users/user.course.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../src/entities/user.entity';

describe('UserController', () => {
    let userController: UserController;
    let userService:UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers:[UserService,{
                provide: getRepositoryToken(User),
                useClass: Repository
            }],
        }).compile();

        userController = moduleRef.get<UserController>(UserController);
        userService = moduleRef.get<UserService>(UserService);
    });
    
    describe('find', () => {
        it('should return a User with matched uid', async () => {
        const result = {"uid":1,"fullName":"Jack Nguyen","username":"jacknguyen","hashPassword":"jack123","pictureProfile":"default"}
        jest.spyOn(userService, 'find').mockImplementation(() => Promise.resolve(result));
        expect(await userController.findOne(1)).toBe(result);
        });
    });

    describe('find', () => {
        it('should return an array of Courses with time and building with matched uid and tid', async () => {
        const result = [{"courseName":"COMP 702","time":"11:00 AM","location":"T501"},{"courseName":"COMP 1202","time":"11:00 AM","location":"D401"}]
        jest.spyOn(userService, 'findActive').mockImplementation(() => Promise.resolve(result));
        expect(await userController.findActive(1,10)).toBe(result);
        });
    });
});