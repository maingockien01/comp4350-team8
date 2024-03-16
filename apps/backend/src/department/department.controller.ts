import { Controller, Get } from '@nestjs/common';
import { DepartmentDto } from '@team8/types/dtos/course/department.dto';

@Controller()
export class DepartmentController {
	@Get()
	findAll(): DepartmentDto[] {
		return [{did: 1, name: 'Computer Science'}, {did: 3, name: 'Mathematics'}]
	}
}