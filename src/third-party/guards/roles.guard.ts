import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesRepository } from 'src/database/roles/roles.repository';
import { UsersRepository } from 'src/database/users/users.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rolesRepository: RolesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException(
        'You must be logged in to access this resource.',
      );
    }

    const userWithRole = await this.usersRepository.getUserWithRoleById(
      user.id,
    );

    if (!userWithRole) {
      throw new NotFoundException('User not found.');
    }

    const roleIds = await Promise.all(
      requiredRoles.map(async (roleName) => {
        const role = await this.rolesRepository.findRoleByName(roleName);
        return role ? role.id : null;
      }),
    );

    const hasRole = roleIds.includes(userWithRole.roleId);
    if (!hasRole) {
      throw new ForbiddenException(
        'You do not have the required role to access this resource.',
      );
    }

    return true;
  }
}
