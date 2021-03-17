import * as Knex from 'knex';
import tableNames from '../../constants/table-names';
import { addDefCol, createTableName, references, url } from '../../util/db-util';

export async function up(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.createTable(tableNames.user, (table: Knex.TableBuilder) => {
      table.increments().notNullable();
      table.string('email').notNullable().unique();
      table.string('name').notNullable();
      table.string('password', 2000).notNullable();
      table.dateTime('last_login');
      addDefCol(table);
    }),

    createTableName(knex, tableNames.item_type),
    createTableName(knex, tableNames.shape),

    knex.schema.createTable(tableNames.country, (table: Knex.TableBuilder) => {
      table.increments().notNullable();
      table.string('name').notNullable();
      table.string('code');
      addDefCol(table);
    }),

    knex.schema.createTable(tableNames.inventory_location, (table: Knex.TableBuilder) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      table.string('description', 2000);
      url(table, 'image_url');
      table.float('lat');
      table.float('lng');
      addDefCol(table);
    }),
  ]);

  await knex.schema.createTable(tableNames.state, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.string('code');
    references(table, tableNames.country);
    addDefCol(table);
  });

  await knex.schema.createTable(tableNames.address, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    table.string('address', 2000).notNullable();
    table.string('city').notNullable();
    references(table, tableNames.state);
    references(table, tableNames.country);
    table.float('lat');
    table.float('lng');
    addDefCol(table);
  });

  await knex.schema.createTable(tableNames.company, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    url(table, 'thumbnail_url');
    table.string('description', 2000);
    url(table, 'website_url');
    table.string('email');
    references(table, tableNames.address);
    addDefCol(table);
  });

  await knex.schema.createTable(tableNames.size, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.float('weight');
    table.float('length');
    table.float('width');
    table.float('height');
    references(table, tableNames.shape, false);
    table.float('volume');
    addDefCol(table);
  });

  await knex.schema.createTable(tableNames.item, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    references(table, tableNames.user);
    table.string('name').notNullable();
    references(table, tableNames.item_type);
    table.string('description', 2000);
    references(table, tableNames.company, true, 'manufacturer');
    references(table, tableNames.size, false);
    table.string('sku', 50);
    table.boolean('sparks_joy').defaultTo(true);
    addDefCol(table);
  });

  await knex.schema.createTable(tableNames.item_info, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    references(table, 'item');
    table.float('quantity').notNullable();
    table.date('purchase_date');
    table.date('expiration_date');
    references(table, tableNames.company, false, 'supplier');
    table.float('purchase_price').defaultTo(0);
    table.float('msr_price').defaultTo(0);
    table.date('last_used');
    references(table, 'inventory_location');
    addDefCol(table);
  });

  await knex.schema.createTable(tableNames.item_image, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    references(table, tableNames.item);
    url(table, 'image_url');
    addDefCol(table);
  });

  await knex.schema.createTable(tableNames.related_item, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    references(table, tableNames.item);
    references(table, tableNames.item, false, 'related_item');
    url(table, 'image_url');
    addDefCol(table);
  });
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all(
    [
      tableNames.related_item,
      tableNames.item_image,
      tableNames.item_info,
      tableNames.item,
      tableNames.size,
      tableNames.company,
      tableNames.address,
      tableNames.state,
      tableNames.user,
      tableNames.item_type,
      tableNames.country,
      tableNames.shape,
      tableNames.inventory_location,
    ].map((tableName: string) => knex.schema.dropSchemaIfExists(tableName))
  );
}
