import { ApiProperty } from '@nestjs/swagger';

export class ArchiveProjectDto {
  @ApiProperty({
    description: 'Flag indicating if the project should be archived',
    default: true,
  })
  isArchived: boolean = true;
}
