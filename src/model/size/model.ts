import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

class Size extends Model {
  id!: number;
  name!: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  shape_id?: number;
  volume?: number;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.size;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { Size };
