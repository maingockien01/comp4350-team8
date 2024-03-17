import { Controller, Get } from '@nestjs/common';
import { DepartmentDto } from '@team8/types/dtos/course/department.dto';
import { DepartmentService } from './deparment.service';

@Controller()
export class DepartmentController {

	constructor(readonly departmentService: DepartmentService) {
	}
	@Get()
	findAll(): Promise<DepartmentDto[]> {
		return this.departmentService.findAll();
	}
}