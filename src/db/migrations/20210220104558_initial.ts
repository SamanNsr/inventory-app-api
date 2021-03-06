import * as Knex from 'knex';
import tableNames from '../../constants/table-names';

const addDefCol = (table: Knex.TableBuilder) => {
  table.timestamps(false, true);
  table.dateTime('deleted_at');
};

const createTableName = (knex: Knex, tableName: string) => {
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    addDefCol(table);
  });
};

const url = (table: Knex.TableBuilder, columnName: string) => {
  table.string(columnName, 2000);
};

const references = (table: Knex.TableBuilder, tableName: string) => {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');
};

export async function up(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.createTable(tableNames.user, (table: Knex.TableBuilder) => {
      table.increments().notNullable();
      table.string('email').notNullable().unique();
      table.string('name').notNullable();
      table.string('password', 100).notNullable();
      table.dateTime('last_login');
      addDefCol(table);
    }),

    createTableName(knex, tableNames.item_type),
    createTableName(knex, tableNames.country),
    createTableName(knex, tableNames.city),
    createTableName(knex, tableNames.shape),

    knex.schema.createTable(tableNames.location, (table: Knex.TableBuilder) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      table.string('description', 2000);
      url(table, 'image_url');
      table.float('lat');
      table.float('lng');
      addDefCol(table);
    }),
  ]);

  await knex.schema.createTable(
    tableNames.address,
    (table: Knex.TableBuilder) => {
      table.increments().notNullable();
      table.string('address', 2000).notNullable();
      references(table, 'city');
      references(table, 'country');
      table.float('lat');
      table.float('lng');
      addDefCol(table);
    }
  );

  await knex.schema.createTable(
    tableNames.manufacturer,
    (table: Knex.TableBuilder) => {
      table.increments().notNullable();
      table.string('name').notNullable();
      url(table, 'thumbnail_url');
      table.string('description', 2000);
      url(table, 'website_url');
      table.string('email');
      references(table, 'address');
      addDefCol(table);
    }
  );

  await knex.schema.createTable(tableNames.size, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    table.float('weight').notNullable();
    table.float('length').notNullable();
    table.float('width').notNullable();
    table.float('height').notNullable();
    references(table, 'shape');
    table.float('volume').notNullable();
    addDefCol(table);
  });

  await knex.schema.createTable(tableNames.item, (table: Knex.TableBuilder) => {
    table.increments().notNullable();
    references(table, 'user');
    table.string('name').notNullable();
    references(table, 'item_type');
    table.string('description', 2000);
    references(table, 'manufacturer');
    references(table, 'size');
    table.boolean('sparks_joy').defaultTo(false);
    addDefCol(table);
  });

  await knex.schema.createTable(
    tableNames.item_info,
    (table: Knex.TableBuilder) => {
      table.increments().notNullable();
      references(table, 'item');
      table.date('purchase_date');
      table.date('expiration_date');
      table.string('purchase_location', 2000);
      table.float('price').notNullable();
      table.date('last_used');
      references(table, 'location');
      addDefCol(table);
    }
  );

  await knex.schema.createTable(
    tableNames.item_image,
    (table: Knex.TableBuilder) => {
      table.increments().notNullable();
      references(table, 'item');
      url(table, 'image_url');
      addDefCol(table);
    }
  );

  await knex.schema.createTable(
    tableNames.related_item,
    (table: Knex.TableBuilder) => {
      table.increments().notNullable();
      references(table, 'item');
      table
        .integer('related_item_id')
        .unsigned()
        .references('id')
        .inTable('item')
        .onDelete('cascade');
      url(table, 'image_url');
      addDefCol(table);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all(
    [
      tableNames.related_item,
      tableNames.item_image,
      tableNames.item_info,
      tableNames.item,
      tableNames.size,
      tableNames.manufacturer,
      tableNames.address,
      tableNames.user,
      tableNames.item_type,
      tableNames.country,
      tableNames.city,
      tableNames.shape,
      tableNames.location,
    ].map((tableName: string) => knex.schema.dropSchema(tableName))
  );
}
