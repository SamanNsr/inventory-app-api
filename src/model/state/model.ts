import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

class State extends Model {
  id!: number;
  name!: string;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.state;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { State };
