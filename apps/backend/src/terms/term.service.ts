import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Term} from '../entities/term.entity';
import {TermDTO} from '@team8/types/dtos/term/term.dto';
import {Course} from '../entities/course.entity';

@Injectable()
/**
 * The TermService class is a service provider for the Term entity.
 */
export class TermService {
  /**
  * Creates an instance of the TermService class.
  * @param {Repository<Term>} termRepository
  */
  constructor(
    @InjectRepository(Term)
    private readonly termRepository: Repository<Term>,
  ) {}

  /**
   * Retrieves all terms from the database.
   * @return {Promise<TermDTO[]>}
   */
  async findAll(): Promise<TermDTO[]> {
    return await this.termRepository.find();
  }

  /**
   * Retrieves the current term from the database.
   * @return {Promise<number>}
   */
  async findCurrentTerm(): Promise<number> {
    const terms = await this.findAll();
    const maxTid = Math.max(...terms.map((term) => term.tid));
    return maxTid;
  }

  /**
   * Retrieves the courses for a specific term and department from the database
   * @param {any} tid - The ID of the term.
   * @param {number} did - The ID of the department.
   * @return {Promise<Course[]>}
   */
  async find(tid: any, did: number): Promise<Course[]> {
    const termCourse = await this.termRepository.findOne({
      relations: {
        courses: true,
      },
      where: {
        tid: tid,
        courses: {
          department: {
            did: did,
          },
        },
      },
    });
    return termCourse.courses;
  }
}
