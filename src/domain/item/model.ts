import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

class Item extends Model {
  id!: number;
  user_id!: string;
  name!: string;
  item_type_id!: number;
  description?: string;
  manufacturer_id!: number;
  size_id?: number;
  sku?: string;
  sparks_joy?: boolean;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.item;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { Item };
