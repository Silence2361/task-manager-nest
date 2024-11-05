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
  isCompleted: boolean;
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
        isCompleted: { type: 'boolean', default: false },
        isArchived: { type: 'boolean', default: false },
      },
    };
  }

  static get relationMappings() {
    return {
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: 'tasks.projectId',
          to: 'projects.id',
        },
      },
      assignees: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'tasks.id',
          through: {
            from: 'taskAssignees.taskId',
            to: 'taskAssignees.userId',
          },
          to: 'users.id',
        },
      },
    };
  }
}
