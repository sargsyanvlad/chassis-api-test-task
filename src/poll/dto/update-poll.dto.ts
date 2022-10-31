import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdatePollDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;
}
