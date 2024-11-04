import { ApiProperty } from '@nestjs/swagger';

export class GetAllProjectsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  creatorId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  isArchived: boolean;
}
