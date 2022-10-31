import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class CreateAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsExist, ['Questions', 'id'], {
    message: 'SectionNotExists',
  })
  questionId: number;

  @ApiProperty()
  @IsNotEmpty()
  answer: string;
}
