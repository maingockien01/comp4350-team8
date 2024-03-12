import { Controller, Get, Post, Query } from '@nestjs/common';
import { CoursesService } from './course.service';
import { CourseDTO } from '@team8/types/dtos/course/course.dto';

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

	@Get('test')
	async findPrerequisite(@Query('cid') cid: number): Promise<CourseDTO[]> {
		return await this.courseService.getPrerequisite(cid);
	}
}
