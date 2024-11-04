import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddUserToProjectDto {
  @ApiProperty({ description: 'ID of the user to add to the project' })
  @IsNumber()
  userId: number;
}
