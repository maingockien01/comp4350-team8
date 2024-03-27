import {Injectable} from '@nestjs/common';
import {Department} from '../entities/department.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
/**
 * The DepartmentService class is a service provider for the Department entity.
 */
export class DepartmentService {
  /**
   * Creates an instance of the DepartmentService class.
   * @param {Repository<Department>} departmentRepository
   */
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  /**
   * Retrieves all departments from the database.
   * @return {Promise<Department[]>}
   */
  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }
}
