import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsExist, ['Sections', 'id'], {
    message: 'SectionNotExists',
  })
  sectionId: number;
}
