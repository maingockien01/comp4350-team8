import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import {DegreeService} from './degree.service';
import {DegreeDTO} from '@team8/types/dtos/degree/degree.dto';

@Controller()
/**
 * Controller class for managing degrees.
 */
export class DegreeController {
  /**
   * Creates an instance of the DegreeController.
   * @param {DegreeService} degreeService
   */
  constructor(readonly degreeService: DegreeService) {}

  /**
   * Retrieves all degrees.
   * @return {Promise<DegreeDTO[]>}
   */
  @Get()
  async findAll(): Promise<DegreeDTO[]> {
    return this.degreeService.findAll();
  }

  /**
   * Retrieves a degree by its id.
   * @param {number} did - The degree id.
   * @param {boolean} withRoadmap - Whether to include the roadmap.
   * @return {Promise<DegreeDTO>}
   */
  @Get(':degreeId')
  async getDegreeById(
    @Param('degreeId') did: number,
    @Query('withRoadmap') withRoadmap = false,
  ): Promise<DegreeDTO> {
    const degrees = await this.degreeService.getDegrees(
        {
          did,
        },
        withRoadmap,
    );

    if (degrees.length === 0) {
      throw new NotFoundException(`Degree with id ${did} not found`);
    }

    return degrees.at(0);
  }
}
