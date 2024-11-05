export interface ITask {
  id: number;
  title: string;
  description: string;
  projectId: number;
  assigneeId: number;
  deadline: Date;
  status: boolean;
  isCompleted: boolean;
  isArchived: boolean;
}

export interface ICreateTask {
  title: string;
  description: string;
  projectId: number;
  assigneeId: number;
}

export interface ICreateTaskResponse {
  id: number;
}

export interface IGetAllTasksResponse {
  id: number;
  title: string;
  description: string;
  projectId: number;
  assigneeId: number;
  deadline: Date;
  status: boolean;
  isCompleted: boolean;
  isArchived: boolean;
}

export interface IGetTaskById {
  id: number;
}

export interface IGetTaskByIdResponse {
  id: number;
  title: string;
  description: string;
  projectId: number;
  assigneeId: number;
  deadline: Date;
  status: boolean;
  isCompleted: boolean;
  isArchived: boolean;
}

export interface IUpdateTaskById {
  title?: string;
  description?: string;
  projectId?: number;
  assigneeId?: number;
  deadline?: Date;
  status?: boolean;
  isArchived?: boolean;
}

export interface IDeleteTaskById {
  id: number;
}

export interface IArchivedTask {
  isArchived: boolean;
}

export interface IStatus {
  status: boolean;
}

export interface IDeadline {
  deadline: Date;
}
