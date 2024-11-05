import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { User } from './users.model';
import { ModelClass } from 'objection';
import {
  IArchivedUser,
  ICreateUser,
  IUpdateUserById,
  IUser,
} from './users.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User) private readonly userModel: ModelClass<User>,
  ) {}

  async createUser(createUser: ICreateUser): Promise<IUser> {
    return this.userModel.query().insert(createUser);
  }

  async getUsers(): Promise<IUser[]> {
    return this.userModel.query();
  }

  async getUserById(userId: number): Promise<IUser | null> {
    return this.userModel.query().findById(userId);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return this.userModel.query().findOne({ email });
  }

  async findUserWithRoleById(userId: number): Promise<User | null> {
    return this.userModel.query().findById(userId).withGraphFetched('role');
  }

  async updateUserById(
    userId: number,
    updateUser: IUpdateUserById,
  ): Promise<void> {
    await this.userModel.query().patchAndFetchById(userId, updateUser);
  }

  async archiveUser(userId: number, archived: IArchivedUser): Promise<IUser> {
    const { isArchived } = archived;

    const project = await this.userModel
      .query()
      .patchAndFetchById(userId, { isArchived: true });

    return project;
  }

  async deleteUserById(userId: number): Promise<void> {
    await this.userModel.query().deleteById(userId);
  }
}
