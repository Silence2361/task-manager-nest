import { Model, RelationMappings } from 'objection';
import { User } from '../users/users.model';
import { Project } from '../projects/projects.model';

export class Task extends Model {
  static tableName = 'tasks';

  id: number;
  title: string;
  description: string;
  projectId: number;
  assigneeId: number;
  deadline: Date;
  status: boolean;
  isArchived: boolean;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'projectId', 'assigneeId'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', maxLength: 500 },
        projectId: { type: 'integer' },
        assigneeId: { type: 'integer' },
        deadline: { type: 'string', format: 'date-time' },
        status: { type: 'boolean', default: false },
        isArchived: { type: 'boolean', default: false },
      },
    };
  }
  static get relationMappings(): RelationMappings {
    return {
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: 'tasks.projectId',
          to: 'projects.id',
        },
      },
      assignee: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.assigneeId',
          to: 'users.id',
        },
      },
    };
  }
}
