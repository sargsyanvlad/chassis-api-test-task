import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Polls } from './entities/poll.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Polls])],
  controllers: [PollController],
  providers: [IsExist, IsNotExist, PollService],
  exports: [PollService],
})
export class PollModule {}
