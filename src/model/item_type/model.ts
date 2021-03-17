import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

class ItemType extends Model {
  id!: number;
  name!: string;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.item_type;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { ItemType };
