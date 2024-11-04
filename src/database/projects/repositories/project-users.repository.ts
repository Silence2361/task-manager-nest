import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { Project } from '../projects.model';

@Injectable()
export class ProjectUsersRepository {
  constructor(
    @InjectModel(Project) private readonly projectModel: typeof Project,
  ) {}

  async addUserToProject(projectId: number, userId: number): Promise<void> {
    await this.projectModel.relatedQuery('users').for(projectId).relate(userId);
  }

  async deleteUserFromProject(
    projectId: number,
    userId: number,
  ): Promise<void> {
    await this.projectModel
      .relatedQuery('users')
      .for(projectId)
      .unrelate()
      .where('userId', userId);
  }

  async doesUserProjectRelationExist(
    projectId: number,
    userId: number,
  ): Promise<boolean> {
    const relationExists = await this.projectModel
      .relatedQuery('users')
      .for(projectId)
      .where('id', userId)
      .first();

    return relationExists !== undefined;
  }
}
