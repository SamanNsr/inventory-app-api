import { db } from '../../db/db';
import tableNames from '../../constants/table-names';

const fields = ['id', 'name', 'code'];

export const find = () => {
  return db(tableNames.city).select(fields);
};

export const findById = async (id: string) => {
  const [city]: any = await db(tableNames.city).select(fields).where({ id });

  return city;
};
