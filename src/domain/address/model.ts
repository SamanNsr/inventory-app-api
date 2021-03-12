import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

class Address extends Model {
  id!: number;
  address!: string;
  city!: string;
  state_id!: number;
  country_id!: number;
  lat?: number;
  lng?: number;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.address;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { Address };
