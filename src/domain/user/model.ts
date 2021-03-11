import { Model } from 'objection';

import tableNames from '../../constants/table-names';
import schema from './schema.json';

// interface IUser {
//   id: number;
//   email: string;
//   name: string;
//   password: string;
//   created_at?: Date;
//   updated_at?: Date;
// }

// interface User extends IUser {}

class User extends Model {
  id!: number;
  email!: string;
  name!: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;

  static get tableName() {
    return tableNames.user;
  }

  static get jsonSchema() {
    return schema;
  }
}

export { User };
