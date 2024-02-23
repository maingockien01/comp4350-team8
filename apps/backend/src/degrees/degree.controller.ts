import { Controller, Get, Post, Query } from "@nestjs/common";
import { DegreeService } from "./degree.service";

@Controller()
export class DegreeController {
	constructor(readonly degreeService: DegreeService) {}
	// Responsibility: handle API requests
	
    @Get()
    async find(){
        return this.degreeService.findAll();
    }
}