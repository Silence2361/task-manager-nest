import { InjectModel } from 'nestjs-objection';
import { ModelClass } from 'objection';
import { Project } from '../projects.model';
import {
  IArchivedProject,
  ICreateProject,
  IProject,
  IUpdateProject,
} from '../projects.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel(Project) private readonly projectModel: ModelClass<Project>,
  ) {}

  async createProject(createProject: ICreateProject): Promise<IProject> {
    return this.projectModel.query().insert(createProject);
  }

  async getProjects(): Promise<IProject[]> {
    return this.projectModel.query();
  }

  async getProjectById(projectId: number): Promise<IProject> {
    return this.projectModel.query().findById(projectId);
  }

  async getProjectByTitle(title: string): Promise<IProject | null> {
    return this.projectModel.query().findOne({ title });
  }

  async getCreatorById(id: number): Promise<IProject | null> {
    return this.projectModel.query().findById(id);
  }

  async updateProjectById(
    projectId: number,
    updateProject: IUpdateProject,
  ): Promise<void> {
    await this.projectModel.query().patchAndFetchById(projectId, updateProject);
  }

  async archiveProject(
    projectId: number,
    archived: IArchivedProject,
  ): Promise<IProject> {
    const { isArchived } = archived;

    const project = await this.projectModel
      .query()
      .patchAndFetchById(projectId, { isArchived: true });

    return project;
  }

  async deleteProjectById(projectId: number): Promise<void> {
    await this.projectModel.query().deleteById(projectId);
  }
}
