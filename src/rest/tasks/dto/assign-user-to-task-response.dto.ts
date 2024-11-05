import { ApiProperty } from '@nestjs/swagger';

export class AssignUserToTaskResponseDto {
  @ApiProperty()
  assigneeId: number;
}
