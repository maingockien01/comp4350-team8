import { Module } from '@nestjs/common';
import { UserCourseController } from './user.course.controller';
import { UserCourseService } from "./user.course.service";
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserCourseController],
	providers: [UserCourseService],
	exports: [UserCourseService]
})
export class UserCourseModule {}