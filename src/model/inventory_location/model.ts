import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

class InventoryLocation extends Model {
  id!: number;
  name!: string;
  description?: string;
  image_url?: string;
  lat?: string;
  lng?: string;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.inventory_location;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { InventoryLocation };
