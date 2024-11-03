import { Model, RelationMappings } from 'objection';
import { User } from '../users/users.model';

export class Project extends Model {
  static tableName = 'projects';

  id: number;
  title: string;
  description: string;
  creatorId: number;
  createdAt: Date;
  isArchived: boolean;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'description', 'creatorId'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', maxLength: 500 },
        creatorId: { type: 'integer' },
        createdAt: { type: 'string', format: 'date-time' },
        isArchived: { type: 'boolean', default: false },
      },
    };
  }

  static relationMappings: RelationMappings = {
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'projects.id',
        through: {
          from: 'projectUsers.projectId',
          to: 'projectUsers.userId',
        },
        to: 'users.id',
      },
    },
  };
}
