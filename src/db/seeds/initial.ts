import crypto from 'crypto';
import * as Knex from 'knex';

import orderedTableName from '../../constants/ordered-table-names';
import tableNames from '../../constants/table-names';
import { PasswordManager } from '../../services/password-manger';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await orderedTableName.reduce(async (promise, table_name) => {
    await promise;
    console.log('Clearing', table_name);

    return knex(table_name).del();
  }, Promise.resolve());

  // Inserts seed entries
  const password = crypto.randomBytes(8).toString('hex');

  const user = {
    email: '1999saman@gmail.com',
    name: 'Saman',
    password: await PasswordManager.toHash(password),
  };

  const [createdUser] = await knex(tableNames.user).insert(user).returning('*');

  console.log(
    'User created:',
    {
      password,
    },
    createdUser
  );

  await knex(tableNames.country).insert([
    {
      name: 'IR',
    },
    {
      name: 'US',
    },
    {
      name: 'UK',
    },
  ]);

  await knex(tableNames.city).insert([
    {
      name: 'tehran',
    },
  ]);
}
