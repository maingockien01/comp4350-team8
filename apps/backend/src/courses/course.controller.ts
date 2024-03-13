import { Controller, Get, Post, Query } from '@nestjs/common';
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

	@Get('one')
	async findCourseById(@Query('cid') cid: number): Promise<CourseDTO> {
		return await this.courseService.getCourseById(cid);
	}

	@Get('prerequisites')
	async findPrerequisite(@Query('cid') cid: number): Promise<CourseDTO[]> {
		return await this.courseService.getPrerequisite(cid);
	}

	@Get('sections')
	async findSection(@Query('cid') cid: number): Promise<Section[]> {
		return await this.courseService.getSections(cid);
	}
}
