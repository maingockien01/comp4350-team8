import { Controller, Get, Post, Query } from "@nestjs/common";
import { TermService } from "./term.service";
import { CourseDTO } from "../courses/course.dto";
import { TermDTO } from "./term.dto";

@Controller()
export class TermController {
	constructor(readonly termService: TermService) {}
    
	// Responsibility: handle API requests
	@Get()
	async findAll():Promise<TermDTO[]>{
		return this.termService.findAll();
	}
	@Get('searchCurrent')
	async findCurrent(): Promise<number>{
		return this.termService.findCurrentTerm();
	}
	
	@Get('search')
	async find(
		@Query('tid') tid: number,
		@Query('department') department: string
	): Promise<CourseDTO[]>{
		return this.termService.find(tid,department);
	}
}