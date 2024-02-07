import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from "./courses.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./courses.model";

@Module({
	imports: [TypeOrmModule.forFeature([Course])],
	controllers: [CoursesController],
	providers: [CoursesService],
})
export class CoursesModule {}
