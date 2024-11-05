import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'New Task', description: 'Title of the task' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Task description',
    description: 'Description of the task',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 1, description: 'ID of the project' })
  @IsNotEmpty()
  @IsInt()
  projectId: number;

  @ApiProperty({
    example: 2,
    description: 'ID of the user assigned to the task',
    required: false,
  })
  @IsInt()
  assigneeId: number;
}
