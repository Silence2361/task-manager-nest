import { ApiProperty } from '@nestjs/swagger';

export class SetDeadlineResponseDto {
  @ApiProperty()
  deadline: Date;
}
