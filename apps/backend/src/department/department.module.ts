import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../entities/department.entity';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './deparment.service';

@Module({
	imports: [TypeOrmModule.forFeature([Department])],
	providers: [DepartmentService],
	controllers: [DepartmentController],
})
export class DepartmentModule {}