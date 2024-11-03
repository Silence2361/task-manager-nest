import { UserRole } from './users.model';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isArchived: boolean;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface IArchivedUser {
  isArchived: boolean;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
