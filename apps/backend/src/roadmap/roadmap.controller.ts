import { Controller, Get, Post } from '@nestjs/common';
import { PersonalRoadmapService } from './personal.roadmap.service';

@Controller()
export class RoadmapController {
	constructor(private readonly personalRoadmapService: PersonalRoadmapService) {}
	@Get('personal')
	getPersonalRoadmap() {
		return 'This is your personal roadmap';
	}

	@Post('personal')
	updatePersonalRoadmap() {
		return 'This is your updated personal roadmap';
	}
}
