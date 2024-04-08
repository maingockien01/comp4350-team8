import {Controller, Get} from '@nestjs/common';
import {DepartmentDto} from '@team8/types/dtos/course/department.dto';
import {DepartmentService} from './deparment.service';

@Controller()
/**
 * Controller class for managing departments.
 */
export class DepartmentController {
  /**
   * Creates an instance of the DepartmentController.
   * @param {DepartmentService} departmentService
   */
  constructor(readonly departmentService: DepartmentService) {}

  /**
   * Retrieves all departments.
   * @return {Promise<DepartmentDto[]>}
   */
  @Get()
  findAll(): Promise<DepartmentDto[]> {
    return this.departmentService.findAll();
  }
}
