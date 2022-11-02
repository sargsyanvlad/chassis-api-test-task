import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Param,
  Request,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AnswerService } from '../answer/answer.service';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { OptionalJwtAuthGuard } from '../auth/auth-guard';
import { AnswerSchema } from '../answer/schemas/answer-schema';

@ApiTags('Questions')
@Controller({
  path: 'questions',
  version: '1',
})
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly answerService: AnswerService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createQuestion: CreateQuestionDto) {
    return this.questionService.create(createQuestion);
  }

  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @Post('/answer')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: AnswerSchema,
  })
  answer(@Body() createAnswer: CreateAnswerDto, @Request() request) {
    const { id: participantId } = request.user;
    return this.answerService.create(createAnswer, participantId || null);
  }

  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: number, @Request() request) {
    const question = await this.questionService.get(id);
    if (!question?.section?.poll?.isPublic && !request?.user?.id) {
      return null;
    }
    return question;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id/answers')
  @HttpCode(HttpStatus.OK)
  async getAnswers(@Param('id') id: number, @Request() request) {
    const question = await this.questionService.getWithAnswers(id);
    if (question?.section?.poll?.ownerId !== request.user?.id) {
      return null;
    }
    return question;
  }
}
