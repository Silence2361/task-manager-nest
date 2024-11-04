import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectResponseDto {
  @ApiProperty()
  id: number;
}
