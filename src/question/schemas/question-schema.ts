import { ApiProperty } from '@nestjs/swagger';
import { Answers } from '../../answer/entities/answer.entity';

export class QuestionsSchema {
  @ApiProperty()
  id: number;

  @ApiProperty()
  question: string;

  @ApiProperty()
  sectionId: number;

  @ApiProperty()
  answers?: Answers[] | null;
}
