import { Controller, Get, Post, Query } from "@nestjs/common";
import { TermService } from "./term.service";
import { Term } from "../entities/term.entity";
import { Course } from "../entities/course.entity";

@Controller()
export class TermController {
	constructor(readonly termService: TermService) {}
    
	// Responsibility: handle API requests
	@Get()
	async findAll():Promise<Term[]>{
		return this.termService.findAll();
	}

	@Get('search')
	async find(
		@Query('tid') tid: number,
		@Query('department') department: string
	): Promise<Course[]>{
		return this.termService.find(tid,department);
	}
}