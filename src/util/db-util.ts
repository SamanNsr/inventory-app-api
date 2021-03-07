import * as Knex from 'knex';

export const addDefCol = (table: Knex.TableBuilder) => {
  table.timestamps(false, true);
  table.dateTime('deleted_at');
};

export const createTableName = (knex: Knex, tableName: string) => {
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    addDefCol(table);
  });
};

export const url = (table: Knex.TableBuilder, columnName: string) => {
  table.string(columnName, 2000);
};

export const references = (
  table: Knex.TableBuilder,
  tableName: string,
  notNullable: boolean = true,
  columnName: string = ''
) => {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');

  if (notNullable) {
    definition.notNullable();
  }

  return definition;
};
