import {Module} from '@nestjs/common';
import {TermController} from './term.controller';
import {TermService} from './term.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Term} from '../entities/term.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Term])],
  controllers: [TermController],
  providers: [TermService],
  exports: [TermService],
})
/**
 * Represents the Term module.
 */
export class TermModule {}
