import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class SetDeadlineDto {
  @ApiProperty()
  @IsDateString()
  deadline: Date;
}
