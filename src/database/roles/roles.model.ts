import { Model } from 'objection';

export class Role extends Model {
  static tableName = 'roles';

  id: number;
  name: string;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', enum: ['ADMIN', 'EMPLOYEE'] },
      },
    };
  }
}
