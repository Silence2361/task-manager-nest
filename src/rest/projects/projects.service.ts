import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateProject,
  ICreateProjectResponse,
  IGetAllProjectsResponse,
  IGetProjectById,
  IGetProjectByIdResponse,
  IProject,
} from 'src/database/projects/projects.interface';
import { ProjectsRepository } from 'src/database/projects/projects.repository';
import { GetAllProjectsResponseDto } from './dto/get-all-projects-response.dto';
import { timeStamp } from 'console';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async createProject(params: ICreateProject): Promise<ICreateProjectResponse> {
    const { title, description, creatorId, createdAt } = params;

    const existingProject =
      await this.projectsRepository.getProjectByTitle(title);

    if (existingProject) {
      throw new ConflictException('Project already existed');
    }

    // const creatorExists =
    //   await this.projectsRepository.getCreatorById(creatorId);

    // if (!creatorExists) {
    //   throw new NotFoundException(`Id ${creatorId} not found`);
    // }

    const project: IProject = await this.projectsRepository.createProject({
      title,
      description,
      creatorId,
      createdAt,
    });

    return { id: project.id };
  }

  async getProjects(): Promise<IGetAllProjectsResponse[]> {
    const projects: IProject[] = await this.projectsRepository.getProjects();

    return projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      creatorId: project.creatorId,
      createdAt: project.createdAt,
      isArchived: project.isArchived,
    }));
  }

  async getProjectById(
    param: IGetProjectById,
  ): Promise<IGetProjectByIdResponse> {
    const { id } = param;

    const project: IProject = await this.projectsRepository.getProjectById(id);

    if (!project) {
      throw new NotFoundException(`Id ${id} not found`);
    }

    return {
      id: project.id,
      title: project.title,
      description: project.description,
      creatorId: project.creatorId,
      createdAt: project.createdAt,
      isArchived: project.isArchived,
    };
  }
}
