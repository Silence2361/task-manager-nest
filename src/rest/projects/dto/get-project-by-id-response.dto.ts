import { ApiProperty } from '@nestjs/swagger';

export class GetProjectByIdResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  isArchived: boolean;
}
