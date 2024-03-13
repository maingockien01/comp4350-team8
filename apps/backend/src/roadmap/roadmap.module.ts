import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { PersonalRoadmapService } from './personal.roadmap.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Course } from '../entities/course.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, Course])],
	controllers: [RoadmapController],
	providers: [PersonalRoadmapService],
	exports: [],
})
export class RoadmapModule {}
