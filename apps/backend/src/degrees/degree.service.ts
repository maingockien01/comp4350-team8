import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOptionsRelations, Repository} from 'typeorm';
import {Degree} from '../entities/degree.entity';
import {DegreeDTO} from '@team8/types/dtos/degree/degree.dto';

@Injectable()
/**
 * The DegreeService class is a service provider for the Degree entity.
 */
export class DegreeService {
  /**
   * Creates an instance of the DegreeService class.
   * @param {Repository<Degree>} degreeRepository
   */
  constructor(
    @InjectRepository(Degree)
    private readonly degreeRepository: Repository<Degree>,
  ) {}

  /**
   * Retrieves all degrees from the database.
   * @return {Promise<DegreeDTO[]>}
   */
  async findAll(): Promise<DegreeDTO[]> {
    return this.degreeRepository.find();
  }

  /**
   * Retrieves degrees from the database based on the provided criteria.
   * @param {Partial<Degree>} criterias
   * The criteria to filter the degrees.
   * @param {boolean} withRecommendedCourses
   * Whether to include the recommended courses.
   * @return {Promise<DegreeDTO[]>}
   */
  getDegrees(
      criterias: Partial<Degree>,
      withRecommendedCourses = false,
  ): Promise<DegreeDTO[]> {
    const relations: FindOptionsRelations<Degree> = {};
    if (withRecommendedCourses) {
      relations.recommendedCourses = {
        prerequisites: true,
      };
    }

    return this.degreeRepository.find({
      where: {
        ...criterias,
      },
      relations,
    });
  }
}
