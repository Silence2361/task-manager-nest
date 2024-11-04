import { UserRole } from 'src/common/enum/user-role.enum';

export interface JwtPayload {
  id: number;
  role: UserRole;
}

export interface IValidatedUser {
  id: number;
  role: UserRole;
}
