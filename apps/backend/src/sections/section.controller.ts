import {Controller, Get, Query} from '@nestjs/common';
import {SectionService} from './section.service';
import {Section} from '../entities/section.entity';

@Controller()
/**
 * Controller class for managing sections.
 */
export class SectionController {
  /**
   *
   * @param {SectionService} sectionService
   */
  constructor(readonly sectionService: SectionService) {}

  /**
   * Retrieves a section by its ID.
   * @param {number} sid
   * @return {Promise<Section>} section matching the ID.
   */
  @Get('search')
  async findSection(@Query('sid') sid: number): Promise<Section> {
    return this.sectionService.find(sid);
  }
}
