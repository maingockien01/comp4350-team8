import { Repository } from "typeorm";
import { CoursesService } from "../../../src/courses/course.service";
import { CoursesController } from "../../../src/courses/course.controller";
import { Test } from "@nestjs/testing";
import { Course } from "../../../src/entities/course.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('CourseService', () => {
    let courseService: CoursesService;
    let courseRepository: Repository<Course>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CoursesController],
            providers: [CoursesService,{
                provide: getRepositoryToken(Course),
                useClass: Repository
            }]
        }).compile();

        courseService = moduleRef.get<CoursesService>(CoursesService);
        courseRepository = moduleRef.get(getRepositoryToken(Course));
    });

    describe('getCourses', () => {
        it('should make request to repository with criterias', async () => {
            const criterias = { cid: 1 };
            const result: Course[] = [];

            jest.spyOn(courseRepository, 'find').mockImplementation((options) => {
                expect(options.where).toEqual(criterias);
                expect(options.relations).toEqual([]);
                return Promise.resolve(result);
            });

            expect(await courseService.getCourses(criterias)).toBe(result);
        });

        it('should make request to repository with relations', async () => {
            const criterias = { cid: 1 };
            const result: Course[] = [];
            const relations = ['prerequisites']

            jest.spyOn(courseRepository, 'find').mockImplementation((options) => {
                expect(options.relations).toEqual(relations);
                return Promise.resolve(result);
            });

            expect(await courseService.getCourses(criterias, relations)).toBe(result);
        })
    })


});