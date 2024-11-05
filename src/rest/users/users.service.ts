import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateUser,
  ICreateUserResponse,
  IDeleteUserById,
  IGetAllUsersResponse,
  IGetUserById,
  IGetUserByIdResponse,
  IUpdateUserById,
  IUser,
} from 'src/database/users/users.interface';
import { UsersRepository } from 'src/database/users/users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(params: ICreateUser): Promise<ICreateUserResponse> {
    const { name, email, password, roleId } = params;

    const existingUser = await this.usersRepository.getUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await this.usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
      roleId,
    });

    return { id: user.id };
  }

  async getUsers(): Promise<IGetAllUsersResponse[]> {
    const users: IUser[] = await this.usersRepository.getUsers();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
    }));
  }

  async getUserById(params: IGetUserById): Promise<IGetUserByIdResponse> {
    const { id } = params;

    const user: IUser | null = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
    };
  }

  async updateUserById(userId: number, params: IUpdateUserById): Promise<void> {
    const { name, email, password, roleId } = params;

    const user: IUser | null = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    let hashedPassword: string | undefined;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateUserData = {
      name,
      email,
      password: hashedPassword || password,
      roleId,
    };

    await this.usersRepository.updateUserById(userId, updateUserData);
  }

  async archiveUserById(userId: number): Promise<void> {
    const user: IUser | null = await this.usersRepository.getUserById(userId);

    if (!user || user.isArchived) {
      throw new NotFoundException(
        `User with id ${userId} not found or already archived`,
      );
    }

    await this.usersRepository.updateUserById(userId, { isArchived: true });
  }

  async deleteUserById(params: IDeleteUserById): Promise<void> {
    const { id } = params;

    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.usersRepository.deleteUserById(id);
  }
}
