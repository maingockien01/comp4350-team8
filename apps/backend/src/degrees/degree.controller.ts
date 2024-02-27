import { Controller, Get, Post, Query } from "@nestjs/common";
import { DegreeService } from "./degree.service";
import { DegreeDTO } from "./degree.dto";

@Controller()
export class DegreeController {
	constructor(readonly degreeService: DegreeService) {}
	// Responsibility: handle API requests
	
    @Get()
    async findAll(): Promise<DegreeDTO[]>{
        return this.degreeService.findAll();
    }
}