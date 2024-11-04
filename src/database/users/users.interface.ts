import { UserRole } from 'src/common/enum/user-role.enum';

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

export interface ICreateUserResponse {
  id: number;
}

export interface IGetAllUsersResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface IGetUserById {
  id: number;
}

export interface IGetUserByIdResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface IArchivedUser {
  isArchived: boolean;
}

export interface IUpdateUserById {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  isArchived?: boolean;
}

export interface IDeleteUserById {
  id: number;
}
