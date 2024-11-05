import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from 'src/rest/projects/dto/create-project.dto';

export class UpdateTaskByIdDto extends PartialType(CreateProjectDto) {}
