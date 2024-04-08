import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import {CoursesService} from './course.service';
import {CourseDTO} from '@team8/types/dtos/course/course.dto';

@Controller()
/**
 * Controller class for managing courses.
 */
export class CoursesController {
  /**
   * Creates an instance of the CoursesController.
   * @param {CoursesService} courseService
   */
  constructor(readonly courseService: CoursesService) {}

  /**
   * Retrieves all courses.
   * @param {number} termId - The term id.
   * @param {number} departmentId - The department id.
   * @return {Promise<CourseDTO[]>}
   */
  @Get()
  async findAll(
    @Query('termId') termId: number,
    @Query('departmentId') departmentId: number,
  ): Promise<CourseDTO[]> {
    return this.courseService.getCourses({
      terms: {tid: termId},
      department: {did: departmentId},
    });
  }

  /**
   * Retrieves the current term.
   * @return {Promise<number>}
   */
  @Get('searchCurrent')
  async findCurrent(): Promise<number> {
    return 1;
    // return this.courseService.findCurrentTerm();
  }

  /**
   * Retrieves a course by its id.
   * @param {number} cid - The course id.
   * @return {Promise<CourseDTO>}
   */
  @Get(':cid')
  async findCourseById(@Param('cid') cid: number): Promise<CourseDTO> {
    try {
      return await this.courseService.getCourseById(cid);
    } catch (e) {
      throw new BadRequestException('Course not found');
    }
  }
}
