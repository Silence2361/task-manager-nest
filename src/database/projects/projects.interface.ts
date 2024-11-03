export interface IProject {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  createdAt: Date;
  isArchived: boolean;
}

export interface ICreareProject {
  title: string;
  description: string;
  creatorId: number;
  createdAt: Date;
}

export interface IArchivedProject {
  isArchived: boolean;
}

export interface IUpdateProject {
  title?: string;
  description?: string;
}
