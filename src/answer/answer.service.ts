import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answers } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answers)
    private answersRepository: Repository<Answers>,
  ) {}

  create(createAnswer: CreateAnswerDto, participantId?: number | null) {
    return this.answersRepository.save(
      this.answersRepository.create({ ...createAnswer, participantId }),
    );
  }
}
