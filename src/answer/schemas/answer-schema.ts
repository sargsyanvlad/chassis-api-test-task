import { ApiProperty } from '@nestjs/swagger';
import { UserSchema } from '../../users/schema/user-schema';

export class AnswerSchema {
  @ApiProperty()
  id: number;

  @ApiProperty()
  questionId: number;

  @ApiProperty()
  answer: string;

  @ApiProperty({ example: 1 })
  participantId: number;

  @ApiProperty()
  participant: UserSchema;
}
