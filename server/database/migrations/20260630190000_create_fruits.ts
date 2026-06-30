import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('fruits', (table) => {
    table.increments('id').primary();
    table.string('name', 120).notNullable();
    table.string('color', 80);
    table.decimal('price', 10, 2).notNullable().defaultTo(0);
    table.integer('stock').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('fruits');
}
