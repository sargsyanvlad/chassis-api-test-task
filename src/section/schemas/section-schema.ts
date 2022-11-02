import { PollSchema } from '../../poll/schemas/poll-schema';
import { QuestionsSchema } from '../../question/schemas/question-schema';
import { ApiProperty } from '@nestjs/swagger';

export class SectionsSchema {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  pollId?: number;

  @ApiProperty()
  poll?: PollSchema | null;

  @ApiProperty()
  questions?: QuestionsSchema | null;
}
