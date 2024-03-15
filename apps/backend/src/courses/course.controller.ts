import { BadRequestException, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CoursesService } from './course.service';
import { CourseDTO } from '@team8/types/dtos/course/course.dto';
import { Section } from '../entities/section.entity';

@Controller()
export class CoursesController {
	constructor(readonly courseService: CoursesService) {}

	@Get()
	async findAll(): Promise<CourseDTO[]> {
		return this.courseService.findAll();
	}
	@Get('searchCurrent')
	async findCurrent(): Promise<number> {
		return 1;
		//return this.courseService.findCurrentTerm();
	}

	@Get(':cid')
	async findCourseById(@Param('cid') cid: number): Promise<CourseDTO> {
		try {
			return await this.courseService.getCourseById(cid);
		} catch (e) {
			throw new BadRequestException('Course not found');
		}
	}
}
