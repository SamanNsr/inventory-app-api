import { db } from '../../db/db';
import tableNames from '../../constants/table-names';

const fields = ['id', 'name', 'code'];

export const find = async () => {
  return await db(tableNames.state).where({ deleted_at: null }).select(fields);
};

export const findById = async (id: string) => {
  const state = await db(tableNames.state)
    .select(fields)
    .where({ id, deleted_at: null })
    .first();

  return state;
};

export const insert = async (payload: { name: string; country_id: number }) => {
  const state = await db(tableNames.state).insert(payload);

  return state;
};
