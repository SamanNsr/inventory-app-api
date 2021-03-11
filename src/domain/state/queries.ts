import { db } from '../../db/db';
import tableNames from '../../constants/table-names';

const fields = ['id', 'name', 'code'];

export const find = () => {
  return db(tableNames.state).select(fields);
};

export const findById = async (id: string) => {
  const [state]: any = await db(tableNames.state).select(fields).where({ id });

  return state;
};
