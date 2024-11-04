import { InjectModel } from 'nestjs-objection';
import { ModelClass } from 'objection';
import { Project } from '../projects.model';
import {
  IArchivedProject,
  ICreateProject,
  IProject,
  IUpdateProject,
} from '../interfaces/projects.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel(Project) private readonly projectModel: ModelClass<Project>,
  ) {}

  async createProject(createProject: ICreateProject): Promise<IProject> {
    return this.projectModel.query().insert(createProject);
  }

  // async addUserToProject(projectId: number, userId: number): Promise<void> {
  //   await this.projectModel.relatedQuery('users').for(projectId).relate(userId);
  // }

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

  // async doesUserProjectRelationExist(
  //   projectId: number,
  //   userId: number,
  // ): Promise<boolean> {
  //   const relationExists = await this.projectModel
  //     .relatedQuery('users')
  //     .for(projectId)
  //     .where('id', userId)
  //     .first();

  //   return relationExists !== undefined;
  // }

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

  // async deleteUserFromProject(
  //   projectId: number,
  //   userId: number,
  // ): Promise<void> {
  //   await this.projectModel
  //     .relatedQuery('users')
  //     .for(projectId)
  //     .unrelate()
  //     .where('userId', userId);
  // }
}
