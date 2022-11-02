import { ApiProperty } from '@nestjs/swagger';

export class UserSchema {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'test@email.com' })
  email: string | null;

  @ApiProperty({ example: 'email' })
  provider: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string | null;
}
