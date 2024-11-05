export interface IRegister {
  name: string;
  email: string;
  password: string;
  roleName: string;
}

export interface IRegisterResponse {
  id: number;
  name: string;
  email: string;
  roleId: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}
