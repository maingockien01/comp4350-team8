import { Module } from '@nestjs/common';
import { UserCourseController } from './user.course.controller';
import { UserCourseService } from './user.course.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionModule } from '../sections/section.module';
import { TermModule } from '../terms/term.module';
import { CourseModule } from '../courses/course.module';

@Module({
	imports: [TypeOrmModule.forFeature([User]), SectionModule, TermModule, CourseModule],
	controllers: [UserCourseController],
	providers: [UserCourseService],
	exports: [UserCourseService],
})
export class UserCourseModule {}
