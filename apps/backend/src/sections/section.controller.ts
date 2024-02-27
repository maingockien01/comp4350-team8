import { Controller, Get, Post, Query } from "@nestjs/common";
import { SectionService } from "./section.service";
import { SectionDTO } from "./section.dto";

@Controller()
export class SectionController {
	constructor(readonly sectionService: SectionService) {}
    

}