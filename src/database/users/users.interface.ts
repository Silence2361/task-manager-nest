import { UserRole } from 'src/common/enum/user-role.enum';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
  isArchived: boolean;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export interface ICreateUserResponse {
  id: number;
}

export interface IGetAllUsersResponse {
  id: number;
  name: string;
  email: string;
  roleId: number;
}

export interface IGetUserById {
  id: number;
}

export interface IGetUserByIdResponse {
  id: number;
  name: string;
  email: string;
  roleId: number;
}

export interface IArchivedUser {
  isArchived: boolean;
}

export interface IUpdateUserById {
  name?: string;
  email?: string;
  password?: string;
  roleId?: number;
  isArchived?: boolean;
}

export interface IDeleteUserById {
  id: number;
}
