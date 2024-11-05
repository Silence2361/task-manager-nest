import { InjectModel } from 'nestjs-objection/dist';
import { Role } from './roles.model';
import { ModelClass } from 'objection';
import { Injectable } from '@nestjs/common';
import { IRole } from './roles.interface';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectModel(Role) private readonly rolesModel: ModelClass<Role>,
  ) {}

  async findRoleByName(name: string): Promise<IRole | null> {
    return this.rolesModel.query().findOne({ name });
  }
}
