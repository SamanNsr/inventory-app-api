import { db } from '../../db/db';
import tableNames from '../../constants/table-names';

const fields = ['id', 'name', 'description', 'image_url', 'lat', 'lng'];

export const find = async () => {
  return await db(tableNames.inventory_location)
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

export const insert = async (payload: {
  name: string;
  description?: string;
  image_url?: string;
  lat?: number;
  lng?: number;
}) => {
  const itemType = await db(tableNames.inventory_location).insert(payload);

  return itemType;
};
