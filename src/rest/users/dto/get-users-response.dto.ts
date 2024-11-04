import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/common/enum/user-role.enum';

export class GetUsersResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: UserRole;
}
