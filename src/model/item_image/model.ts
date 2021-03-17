import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

class ItemImage extends Model {
  id!: number;
  item_id!: string;
  image_url!: string;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.item_image;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { ItemImage };
