import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOptionsRelations, Repository} from 'typeorm';
import {Section} from '../entities/section.entity';

@Injectable()

/**
 * Service class for managing sections.
 */
export class SectionService {
  /**
   * constructor
   * @param  {Repository<Section>} sectionRepository
   */
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
  ) {}

  /**
   * Find a section by its ID.
   * @param  {number} sid - The ID of the section.
   * @param  {FindOptionsRelations<Section>} relations
   * Optional relations to include in the query.
   * @return {Promise<Section>}
   */
  async find(
      sid: number,
      relations: FindOptionsRelations<Section> = {},
  ): Promise<Section> {
    return await this.sectionRepository.findOne({
      relations: {
        term: true,
        course: true,
        ...relations,
      },
      where: {
        sid: sid,
      },
    });
  }
}
