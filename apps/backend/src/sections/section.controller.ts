import { Controller, Get, Post, Query } from "@nestjs/common";
import { SectionService } from "./section.service";
import { SectionDTO } from "@team8/types/dtos/section/section.dto";
import { Section } from "../entities/section.entity";

@Controller()
export class SectionController {
	constructor(readonly sectionService: SectionService) {}
    
	@Get('search')
	async findSection(@Query('sid') sid: number): Promise<Section> {
		return this.sectionService.find(sid);
	}

}