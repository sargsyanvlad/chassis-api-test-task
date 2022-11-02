import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateQuestionDto {
  @ApiProperty()
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty()
  @IsNotEmpty()
  section: [
    {
      description: string;
      questions: [string];
    },
  ];
}
