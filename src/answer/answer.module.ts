import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answers } from './entities/answer.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Answers])],
  providers: [IsExist, IsNotExist, AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
