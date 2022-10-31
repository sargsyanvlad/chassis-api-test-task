import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { PollService } from '../poll/poll.service';
import { Polls } from '../poll/entities/poll.entity';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sections } from './entities/section.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Sections, Polls])],
  controllers: [SectionController],
  providers: [IsExist, IsNotExist, SectionService, PollService],
  exports: [SectionService],
})
export class SectionModule {}
