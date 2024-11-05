import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectResponseDto } from './dto/create-project-response.dto';
import { GetAllProjectsResponseDto } from './dto/get-all-projects-response.dto';
import { GetProjectByIdResponseDto } from './dto/get-project-by-id-response.dto';
import { UpdateProjectByIdDto } from './dto/update-project.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddUserToProjectDto } from './dto/add-user-project.dto';
import { ArchiveProjectDto } from './dto/archive-project.dto';
import { JwtAuthGuard } from 'src/third-party/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created.',
    type: CreateProjectResponseDto,
  })
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<CreateProjectResponseDto> {
    return this.projectsService.createProject(createProjectDto);
  }

  @Post(':id/add-user')
  @ApiOperation({ summary: 'Add user to project' })
  @ApiResponse({
    status: 200,
    description: 'User added to project successfully',
  })
  async addUserToProject(
    @Param('id') projectId: number,
    @Body() addUserToProjectDto: AddUserToProjectDto,
  ): Promise<void> {
    const { userId } = addUserToProjectDto;
    await this.projectsService.addUserToProject(projectId, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Return all projects' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all projects.',
    type: [GetAllProjectsResponseDto],
  })
  async getProjects(): Promise<GetAllProjectsResponseDto[]> {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project details by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the details of a project.',
    type: GetProjectByIdResponseDto,
  })
  async getProjectById(
    @Param('id') id: number,
  ): Promise<GetProjectByIdResponseDto> {
    return this.projectsService.getProjectById({ id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update project by ID' })
  @ApiResponse({ status: 200, description: 'Project updated successfully' })
  async updateProjectById(
    @Param('id') id: number,
    @Body() updateProject: UpdateProjectByIdDto,
  ): Promise<void> {
    await this.projectsService.updateProjectById(id, updateProject);
  }

  @Put(':id/archive')
  @ApiOperation({ summary: 'Archiv project' })
  @ApiResponse({ status: 200, description: 'Project archived successfully' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async archiveProjectById(
    @Param('id') projectId: number,
    @Body() archiveProjectDto: ArchiveProjectDto,
  ): Promise<void> {
    await this.projectsService.archiveProjectById(projectId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project by ID' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  async deleteProjectById(@Param('id') id: number): Promise<void> {
    await this.projectsService.deleteProjectById({ id });
  }

  @Delete(':projectId/users/:userId')
  @ApiOperation({ summary: 'Delete user from project' })
  @ApiResponse({
    status: 200,
    description: 'User deleted from project successfully',
  })
  async deleteUserFromProject(
    @Param('projectId') projectId: number,
    @Param('userId') userId: number,
  ): Promise<void> {
    await this.projectsService.deleteUserFromProject(projectId, userId);
  }
}
