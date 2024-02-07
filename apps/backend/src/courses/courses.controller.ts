import { Controller, Get, Post, Query } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CoursesDto } from "./courses.dto";

@Controller()
export class CoursesController {
	constructor(readonly courseService: CoursesService) {}
	// Responsibility: handle API requests
	@Get('search') // /rest-api/courses/search?degree=BS&term=Fall
	async getCourses(
		@Query('degree') degree: string,
		@Query('term') term: string,
	): Promise<CoursesDto[]> {
		const courses = await this.courseService.getCourses(degree, term);

		const coursesWithProf: CoursesDto[] = courses.map((course) => {
			return {
				...course,
				professor: 'Dr. John Doe', //Call ProfService
			};
		});

		return coursesWithProf;
	}
}
