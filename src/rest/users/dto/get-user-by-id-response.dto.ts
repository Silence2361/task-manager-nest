import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  roleId: number;
}
