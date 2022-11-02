import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Questions } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Questions)
    private questionsRepository: Repository<Questions>,
  ) {}

  create(createQuestion: CreateQuestionDto) {
    return this.questionsRepository.save(
      this.questionsRepository.create(createQuestion),
    );
  }

  get(id: number) {
    return this.questionsRepository.findOne({
      where: { id },
      relations: ['section', 'section.poll'],
    });
  }

  getWithAnswers(id: number) {
    return this.questionsRepository.findOne({
      where: { id },
      relations: ['section', 'section.poll', 'answers'],
    });
  }
}
