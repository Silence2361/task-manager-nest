import { InjectModel } from 'nestjs-objection';
import { ModelClass } from 'objection';
import { Task } from './tasks.model';
import {
  IArchivedTask,
  ICreateTask,
  IDeadline,
  IStatus,
  ITask,
  IUpdateTask,
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

  async setStatus(taskId: number, setStatus: IStatus): Promise<ITask> {
    const { status } = setStatus;
    return this.taskModel.query().patchAndFetchById(taskId, { status });
  }

  async setDeadline(taskId: number, setDeadline: IDeadline): Promise<ITask> {
    const { deadline } = setDeadline;
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
    updateProject: IUpdateTask,
  ): Promise<void> {
    await this.taskModel.query().patchAndFetchById(taskId, updateProject);
  }

  async archiveTask(taskId: number, archived: IArchivedTask): Promise<ITask> {
    const { isArchived } = archived;

    const task = await this.taskModel
      .query()
      .patchAndFetchById(taskId, { isArchived: true });

    return task;
  }

  async deleteTaskById(taskId: number): Promise<void> {
    await this.taskModel.query().deleteById(taskId);
  }
}
