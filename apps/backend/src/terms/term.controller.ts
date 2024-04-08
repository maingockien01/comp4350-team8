import {Controller, Get} from '@nestjs/common';
import {TermService} from './term.service';
import {TermDTO} from '@team8/types/dtos/term/term.dto';

@Controller()
/**
 * Controller class for managing terms.
 */
export class TermController {
  /**
   * Creates an instance of TermController.
   * @param {TermService} termService
   */
  constructor(readonly termService: TermService) {}

  /**
   * Retrieves all terms.
   * @return {Promise<TermDTO[]>}
   */
  @Get()
  async findAll(): Promise<TermDTO[]> {
    return this.termService.findAll();
  }

  /**
   * Retrieves the current term.
   * @return {Promise<number>}
   */
  @Get('searchCurrent')
  async findCurrent(): Promise<number> {
    return this.termService.findCurrentTerm();
  }
}
