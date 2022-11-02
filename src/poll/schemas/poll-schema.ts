import { ApiProperty } from '@nestjs/swagger';

export class PollSchema {
  @ApiProperty({ example: true })
  isPublic: boolean;

  @ApiProperty({ example: 1 })
  id: number;
}
