import { ApiProperty } from '@nestjs/swagger';

export class MoveTaskResponseDto {
  @ApiProperty()
  projectId: number;
}
