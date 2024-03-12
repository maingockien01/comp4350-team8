import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { PersonalRoadmapService } from './personal.roadmap.service';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { RoadmapDto } from '@team8/types/dtos/roadmap/Roadmap.dto';

@Controller()
export class RoadmapController {
	constructor(private readonly personalRoadmapService: PersonalRoadmapService) {}
	@UseGuards(JWTAuthGuard)
	@Get('personal')
	async getPersonalRoadmap(@Request() req): Promise<RoadmapDto> {
		const userId = req.user.uid;

		const roadmap = await this.personalRoadmapService.getPersonalRoadmap(userId);

		return roadmap.dto;
	}

	@UseGuards(JWTAuthGuard)
	@Post('personal')
	async updatePersonalRoadmap(@Request() req, @Body() newRoadmap: RoadmapDto) {
		const userId = req.user.uid;

		try {
			const roadmap = await this.personalRoadmapService.savePersonalRoadmap(
				userId,
				newRoadmap.courses.map((course) => course.cid),
			);
			return roadmap.dto;
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}
}
