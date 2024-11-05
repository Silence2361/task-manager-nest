import { ApiProperty } from '@nestjs/swagger';

export class MoveTaskDto {
  @ApiProperty()
  projectId: number;
}
