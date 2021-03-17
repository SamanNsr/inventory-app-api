import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

class Country extends Model {
  id!: number;
  name!: string;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.country;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { Country };
