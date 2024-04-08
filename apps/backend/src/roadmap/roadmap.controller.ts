import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {PersonalRoadmapService} from './personal.roadmap.service';
import {JWTAuthGuard} from '../auth/jwt-auth.guard';
import {RoadmapDto} from '@team8/types/dtos/roadmap/Roadmap.dto';

@Controller()
/**
 * Controller class for managing roadmaps.
 */
export class RoadmapController {
  /**
   * Creates an instance of the RoadmapController.
   * @param {PersonalRoadmapService} personalRoadmapService
   */
  constructor(
    private readonly personalRoadmapService: PersonalRoadmapService,
  ) {}

  /**
   * Retrieves the personal roadmap for the user.
   * @param {Request} req
   * @return {Promise<RoadmapDto>}
   */
  @UseGuards(JWTAuthGuard)
  @Get('personal')
  async getPersonalRoadmap(@Request() req): Promise<RoadmapDto> {
    const userId = req.user.uid;

    const roadmap = await this.personalRoadmapService.getPersonalRoadmap(
        userId,
    );

    return roadmap.dto;
  }

  /**
   * Updates the personal roadmap for the user.
   * @param {Request} req
   * @param {RoadmapDto} newRoadmap
   * @return {Promise<RoadmapDto>}
   * @throws {BadRequestException} if the request is invalid.
   */
  @UseGuards(JWTAuthGuard)
  @Post('personal')
  @HttpCode(HttpStatus.OK)
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
