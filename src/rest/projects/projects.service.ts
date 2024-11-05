import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateProject,
  ICreateProjectResponse,
  IDeleteProject,
  IGetAllProjectsResponse,
  IGetProjectById,
  IGetProjectByIdResponse,
  IProject,
  IUpdateProject,
} from 'src/database/projects/projects.interface';
import { Project } from 'src/database/projects/projects.model';
import { ProjectUsersRepository } from 'src/database/projects/repositories/project-users.repository';
import { ProjectsRepository } from 'src/database/projects/repositories/projects.repository';
import { UsersRepository } from 'src/database/users/users.repository';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly projectUsersRepository: ProjectUsersRepository,
  ) {}

  async createProject(params: ICreateProject): Promise<ICreateProjectResponse> {
    const { title, description, userId, createdAt } = params;

    const existingProject =
      await this.projectsRepository.getProjectByTitle(title);

    if (existingProject) {
      throw new ConflictException('Project already existed');
    }

    const creator = await this.usersRepository.getUserById(userId);

    if (!creator) {
      throw new NotFoundException(`Creator with ID ${userId} not found`);
    }

    const project: IProject = await this.projectsRepository.createProject({
      title,
      description,
      userId,
      createdAt,
    });

    return { id: project.id };
  }

  async addUserToProject(projectId: number, userId: number): Promise<void> {
    const project = await this.projectsRepository.getProjectById(projectId);

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    const userExists = await this.usersRepository.getUserById(userId);

    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const relationExists =
      await this.projectUsersRepository.doesUserProjectRelationExist(
        projectId,
        userId,
      );

    if (relationExists) {
      throw new ConflictException(
        `User with id ${userId} is already added to Project with id ${projectId}`,
      );
    }

    await this.projectUsersRepository.addUserToProject(projectId, userId);
  }

  async getProjects(): Promise<IGetAllProjectsResponse[]> {
    const projects: IProject[] = await this.projectsRepository.getProjects();

    return projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      userId: project.userId,
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
      userId: project.userId,
      createdAt: project.createdAt,
      isArchived: project.isArchived,
    };
  }

  async updateProjectById(id: number, params: IUpdateProject): Promise<void> {
    const { title, description } = params;

    const project = await this.projectsRepository.getProjectById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const existingTitle =
      await this.projectsRepository.getProjectByTitle(title);
    if (existingTitle) {
      throw new ConflictException('This title already exists ');
    }

    await this.projectsRepository.updateProjectById(id, { title, description });
  }

  async archiveProjectById(id: number): Promise<void> {
    const project = await this.projectsRepository.getProjectById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (project.isArchived) {
      throw new ConflictException(`Project with ID ${id} is already archived`);
    }

    await this.projectsRepository.updateProjectById(id, { isArchived: true });
  }

  async deleteUserFromProject(
    projectId: number,
    userId: number,
  ): Promise<void> {
    if (!projectId || !userId) {
      throw new BadRequestException('Project ID and User ID must be provided');
    }

    const project = await this.projectsRepository.getProjectById(projectId);

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    const userExists = await this.usersRepository.getUserById(userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.projectUsersRepository.deleteUserFromProject(projectId, userId);
  }

  async deleteProjectById(param: IDeleteProject): Promise<void> {
    const { id } = param;

    const project = await this.projectsRepository.getProjectById(id);

    if (!project) {
      throw new NotFoundException(`Id ${id} not found`);
    }

    await this.projectsRepository.deleteProjectById(id);
  }
}
