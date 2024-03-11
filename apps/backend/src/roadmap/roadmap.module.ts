import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { PersonalRoadmapService } from './personal.roadmap.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [RoadmapController],
	providers: [PersonalRoadmapService],
	exports: [PersonalRoadmapService],
})
export class RoadmapModule {}
