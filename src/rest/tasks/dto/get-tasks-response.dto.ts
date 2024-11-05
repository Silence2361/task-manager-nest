import { ApiProperty } from '@nestjs/swagger';

export class GetTasksResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  assigneeId: number;

  @ApiProperty()
  deadline: Date;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  isCompleted: boolean;

  @ApiProperty()
  isArchived: boolean;
}
