import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

import { ItemInfo } from '../item_info/model';
import { ItemType } from '../item_type/model';
import { User } from '../user/model';
import { ItemImage } from '../item_image/model';

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

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: `${tableNames.user}`,
          to: `${tableNames.item}.user_id`,
        },
      },
      item_infos: {
        relation: Model.HasManyRelation,
        modelClass: ItemInfo,
        join: {
          from: `${tableNames.item}`,
          to: `${tableNames.item_info}.item_id`,
        },
      },
      item_type: {
        relation: Model.HasOneRelation,
        modelClass: ItemType,
        join: {
          from: `${tableNames.item_type}`,
          to: `${tableNames.item}.item_type_id`,
        },
      },
      item_images: {
        relation: Model.HasManyRelation,
        modelClass: ItemImage,
        join: {
          from: `${tableNames.item}`,
          to: `${tableNames.item_image}.item_id`,
        },
      },
    };
  }
}

export { Item };
