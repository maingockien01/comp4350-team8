import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../entities/department.entity';
import { DepartmentController } from './department.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Department])],
	providers: [],
	controllers: [DepartmentController],
})
export class DepartmentModule {}