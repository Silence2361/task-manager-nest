import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { User } from '../users/users.model';

export class Project extends Model {
  static tableName = 'projects';

  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: Date;
  isArchived: boolean;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'description', 'userId'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', maxLength: 500 },
        userId: { type: 'integer' },
        createdAt: { type: 'string', format: 'date-time' },
        isArchived: { type: 'boolean', default: false },
      },
    };
  }

  static relationMappings: RelationMappingsThunk = () => ({
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
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'projects.userId',
        to: 'users.id',
      },
    },
  });
}
