export interface ITask {
  id: number;
  title: string;
  description: string;
  projectId: number;
  assigneeId: number;
  deadline: Date;
  status: boolean;
  isArchived: boolean;
}

export interface ICreateTask {
  title: string;
  description: string;
  projectId: number;
  assigneeId: number;
  deadline: Date;
  status: boolean;
}

export interface IUpdateTask {
  title?: string;
  description?: string;
  projectId?: number;
  assigneeId?: number;
  deadline?: Date;
  status?: boolean;
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
