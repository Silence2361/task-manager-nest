import { InjectModel } from 'nestjs-objection';
import { ModelClass } from 'objection';
import { Task } from './tasks.model';
import {
  IArchivedTask,
  ICreateTask,
  IDeadline,
  IStatus,
  ITask,
  IUpdateTaskById,
} from './tasks.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectModel(Task) private readonly taskModel: ModelClass<Task>,
  ) {}

  async createTask(createTask: ICreateTask): Promise<ITask> {
    return this.taskModel.query().insert(createTask);
  }

  async getTasks(): Promise<ITask[]> {
    return this.taskModel.query();
  }

  async getTaskById(taskId: number): Promise<ITask> {
    return this.taskModel.query().findById(taskId);
  }

  async getByProjectId(projectId: number): Promise<ITask[]> {
    return this.taskModel.query().where('projectId', projectId);
  }

  async getTaskByTitle(title: string): Promise<ITask> {
    return this.taskModel.query().findOne({ title });
  }

  async setDeadline(taskId: number, deadline: Date): Promise<ITask> {
    return this.taskModel.query().patchAndFetchById(taskId, { deadline });
  }

  async assignToUser(taskId: number, userId: number): Promise<ITask> {
    return this.taskModel
      .query()
      .patchAndFetchById(taskId, { assigneeId: userId });
  }

  async moveToProject(taskId: number, newProjectId: number): Promise<ITask> {
    return this.taskModel
      .query()
      .patchAndFetchById(taskId, { projectId: newProjectId });
  }

  async updateTaskById(
    taskId: number,
    updateProject: IUpdateTaskById,
  ): Promise<void> {
    await this.taskModel.query().patchAndFetchById(taskId, updateProject);
  }

  async archiveTask(taskId: number, archived: IArchivedTask): Promise<ITask> {
    const task = await this.taskModel
      .query()
      .patchAndFetchById(taskId, { isArchived: archived.isArchived });

    return task;
  }

  async setStatus(taskId: number, setStatus: IStatus): Promise<ITask> {
    return this.taskModel
      .query()
      .patchAndFetchById(taskId, { isCompleted: setStatus.status });
  }

  async deleteTaskById(taskId: number): Promise<void> {
    await this.taskModel.query().deleteById(taskId);
  }
}
