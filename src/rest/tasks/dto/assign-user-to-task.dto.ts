import { ApiProperty } from '@nestjs/swagger';

export class AssignUserToTaskDto {
  @ApiProperty()
  assigneeId: number;
}
