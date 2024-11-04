import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectResponseDto } from './dto/create-project-response.dto';
import { GetAllProjectsResponseDto } from './dto/get-all-projects-response.dto';
import { GetProjectByIdResponseDto } from './dto/get-project-by-id-response.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<CreateProjectResponseDto> {
    return this.projectsService.createProject(createProjectDto);
  }

  @Get()
  async getProjects(): Promise<GetAllProjectsResponseDto[]> {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  async getProjectById(
    @Param('id') id: number,
  ): Promise<GetProjectByIdResponseDto> {
    return this.projectsService.getProjectById({ id });
  }
}
