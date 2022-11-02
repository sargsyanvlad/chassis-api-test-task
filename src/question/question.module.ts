import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AnswerService } from '../answer/answer.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './entities/question.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Answers } from '../answer/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questions, Answers])],
  controllers: [QuestionController],
  providers: [IsExist, IsNotExist, QuestionService, AnswerService],
  exports: [QuestionService],
})
export class QuestionModule {}
