import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

class RelatedItem extends Model {
  id!: number;
  item_id!: string;
  related_item_id!: string;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.related_item;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { RelatedItem };
