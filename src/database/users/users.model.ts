import { Model, RelationMappings } from 'objection';
import { Project } from '../projects/projects.model';
import { UserRole } from 'src/common/enum/user-role.enum';
import { Role } from '../roles/roles.model';

export class User extends Model {
  static tableName = 'users';
  static schemaName = 'public';

  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
  isArchived: boolean;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password', 'role'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: {
          type: 'string',
          format: 'email',
          minLength: 5,
          maxLength: 255,
        },
        password: { type: 'string', minLength: 8, maxLength: 255 },
        role: {
          type: 'string',
          enum: Object.values(UserRole),
          default: UserRole.EMPLOYEE,
        },
        isArchived: { type: 'boolean', default: false },
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      projects: {
        relation: Model.ManyToManyRelation,
        modelClass: () => Project,
        join: {
          from: 'users.id',
          through: {
            from: 'projectUsers.userId',
            to: 'projectUsers.projectId',
          },
          to: 'projects.id',
        },
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.roleId',
          to: 'roles.id',
        },
      },
    };
  }
}
