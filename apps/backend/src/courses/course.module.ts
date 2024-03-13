import { Module } from '@nestjs/common';
import { CoursesController } from './course.controller';
import { CoursesService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Course])],
	controllers: [CoursesController],
	providers: [CoursesService],
	exports: [CoursesService],
})
export class CourseModule {}
