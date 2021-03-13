import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

class Company extends Model {
  id!: number;
  item_id!: number;
  quantity!: number;
  purchase_date?: Date;
  expiration_date?: Date;
  supplier_id?: number;
  purchase_price?: number;
  msr_price?: number;
  last_used?: Date;
  inventory_location!: number;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.item_info;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { Company };
