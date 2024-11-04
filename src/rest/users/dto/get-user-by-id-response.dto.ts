import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/database/users/users.model';

export class GetUserByIdResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: UserRole;
}