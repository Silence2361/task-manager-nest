import { Model, RelationMappings } from 'objection';
import { Project } from '../projects/projects.model';

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export class User extends Model {
  static tableName: 'users';

  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole; //будет модель role
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
        password: { type: 'string', minLength: 8, maxLenght: 12 },
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
        modelClass: Project,
        join: {
          from: 'users.id',
          through: {
            from: 'projectUsers.userId',
            to: 'projectUsers.projectId',
          },
          to: 'projects.id',
        },
      },
    };
  }
}