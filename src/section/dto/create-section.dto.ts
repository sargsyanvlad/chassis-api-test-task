import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreateSectionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsExist, ['Polls', 'id'], {
    message: 'PollNotExists',
  })
  pollId: number;
}
