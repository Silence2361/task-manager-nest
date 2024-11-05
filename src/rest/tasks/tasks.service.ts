import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectsRepository } from 'src/database/projects/repositories/projects.repository';
import {
  ICreateTask,
  ICreateTaskResponse,
  IDeadline,
  IDeleteTaskById,
  IGetAllTasksResponse,
  IGetTaskById,
  IGetTaskByIdResponse,
  ITask,
  IUpdateTaskById,
} from 'src/database/tasks/tasks.interface';
import { TasksRepository } from 'src/database/tasks/tasks.repository';
import { UsersRepository } from 'src/database/users/users.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createTask(params: ICreateTask): Promise<ICreateTaskResponse> {
    const { title, description, projectId, assigneeId } = params;

    const existingTask = await this.tasksRepository.getTaskByTitle(title);

    if (existingTask) {
      throw new ConflictException('Task with this title already exists');
    }

    const project = await this.projectsRepository.getProjectById(projectId);

    if (!project) {
      throw new NotFoundException(`Project witj id ${projectId} not found`);
    }

    const assignee = await this.usersRepository.getUserById(assigneeId);

    if (!assignee) {
      throw new NotFoundException(`User with id ${assigneeId} not found`);
    }

    const task: ITask = await this.tasksRepository.createTask({
      title,
      description,
      projectId,
      assigneeId,
    });

    return { id: task.id };
  }

  async getTasks(): Promise<IGetAllTasksResponse[]> {
    const tasks: ITask[] = await this.tasksRepository.getTasks();

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      assigneeId: task.assigneeId,
      projectId: task.projectId,
      deadline: task.deadline,
      status: task.status,
      isCompleted: task.isCompleted,
      isArchived: task.isArchived,
    }));
  }

  async getTaskById(param: IGetTaskById): Promise<IGetTaskByIdResponse> {
    const { id } = param;

    const task: ITask = await this.tasksRepository.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Id ${id} not found`);
    }
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      assigneeId: task.assigneeId,
      projectId: task.projectId,
      deadline: task.deadline,
      status: task.status,
      isCompleted: task.isCompleted,
      isArchived: task.isArchived,
    };
  }

  async updateTaskById(id: number, params: IUpdateTaskById): Promise<void> {
    const { title, description, projectId, assigneeId } = params;

    const existingTask = await this.tasksRepository.getTaskByTitle(title);

    if (existingTask) {
      throw new ConflictException('Task with this title already exists');
    }

    const project = await this.projectsRepository.getProjectById(projectId);

    if (!project) {
      throw new NotFoundException(`Project witj id ${projectId} not found`);
    }

    const assignee = await this.usersRepository.getUserById(assigneeId);

    if (!assignee) {
      throw new NotFoundException(`User with id ${assigneeId} not found`);
    }

    await this.tasksRepository.updateTaskById(id, {
      title,
      description,
      assigneeId,
      projectId,
    });
  }

  async archiveTaskById(id: number): Promise<void> {
    const task = await this.tasksRepository.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.isArchived) {
      throw new ConflictException(`Task with ID ${id} is already archived`);
    }

    await this.tasksRepository.updateTaskById(id, { isArchived: true });
  }

  async markTaskAsCompleted(id: number): Promise<void> {
    const task = await this.tasksRepository.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.tasksRepository.setStatus(task.id, { status: true });
  }

  async moveTaskToProject(id: number, newProjectId: number): Promise<ITask> {
    const task = await this.tasksRepository.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const projectExists =
      await this.projectsRepository.getProjectById(newProjectId);

    if (!projectExists) {
      throw new NotFoundException(`Project with ID ${newProjectId} not found`);
    }

    return this.tasksRepository.moveToProject(task.id, newProjectId);
  }

  async assignUserToTask(id: number, userId: number): Promise<ITask> {
    const task = await this.tasksRepository.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const userExists = await this.usersRepository.getUserById(userId);

    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.tasksRepository.assignToUser(task.id, userId);
  }

  async deadlineTaskById(id: number, deadline: Date): Promise<ITask> {
    const task: ITask = await this.tasksRepository.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.tasksRepository.setDeadline(task.id, deadline);
  }

  async deleteTaskById(param: IDeleteTaskById): Promise<void> {
    const { id } = param;

    const task: ITask = await this.tasksRepository.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Id ${id} not found`);
    }

    await this.tasksRepository.deleteTaskById(id);
  }
}
