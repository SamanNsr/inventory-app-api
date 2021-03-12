import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

class Company extends Model {
  id!: number;
  name!: string;
  address_id!: number;
  thumbnail_url?: string;
  description?: string;
  website_url?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.address;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { Company };
