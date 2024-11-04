import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponceDto {
  @ApiProperty()
  id: number;
}
