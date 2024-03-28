import {Module} from '@nestjs/common';
import {SectionController} from './section.controller';
import {SectionService} from './section.service';
import {Section} from '../entities/section.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService],
})
/**
 * Represents the Section module.
 */
export class SectionModule {}
