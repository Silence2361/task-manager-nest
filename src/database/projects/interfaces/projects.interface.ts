export interface IProject {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: Date;
  isArchived: boolean;
}

export interface ICreateProject {
  title: string;
  description: string;
  userId: number;
  createdAt: Date;
}

export interface IGetAllProjectsResponse {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: Date;
  isArchived: boolean;
}

export interface IGetProjectById {
  id: number;
}

export interface IGetProjectByIdResponse {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: Date;
  isArchived: boolean;
}

export interface ICreateProjectResponse {
  id: number;
}

export interface IArchivedProject {
  isArchived: boolean;
}

export interface IUpdateProject {
  title?: string;
  description?: string;
  isArchived?: boolean;
}

export interface IDeleteProject {
  id: number;
}
