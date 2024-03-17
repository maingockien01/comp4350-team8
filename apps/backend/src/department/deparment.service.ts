import { Injectable } from '@nestjs/common';
import { Department } from '../entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class DepartmentService {
	constructor(
		@InjectRepository(Department)
		private departmentRepository: Repository<Department>,
	) {
	}

	async findAll(): Promise<Department[]> {
		return await this.departmentRepository.find();
	}
}