import { UserRole } from 'src/common/enum/user-role.enum';

export interface IRegister {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface IRegisterResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}
