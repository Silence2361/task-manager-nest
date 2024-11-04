import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteUserFromProjectDto {
  @ApiProperty({ description: 'ID of the user to remove from the project' })
  @IsNumber()
  userId: number;
}
