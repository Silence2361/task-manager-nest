import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Title of the project',
    example: 'Project Alpha',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the project',
    example: 'This is a sample project description.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'User ID of the project creator', example: 1 })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Creation date of the project',
    example: '2023-04-01T00:00:00Z',
  })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}
