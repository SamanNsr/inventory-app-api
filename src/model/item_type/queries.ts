import { db } from '../../db/db';
import tableNames from '../../constants/table-names';

const fields = ['id', 'name'];

export const find = async () => {
  return await db(tableNames.item_type)
    .where({ deleted_at: null })
    .select(fields);
};

export const findById = async (id: string) => {
  const itemType = await db(tableNames.state)
    .select(fields)
    .where({ id, deleted_at: null })
    .first();

  return itemType;
};

export const insert = async (payload: { name: string }) => {
  const itemType = await db(tableNames.item_type).insert(payload);

  return itemType;
};
