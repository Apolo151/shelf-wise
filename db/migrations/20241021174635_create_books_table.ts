import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('books', (table) => {
    table.increments('id').primary(); // auto-incrementing primary key
    table.string('title').notNullable();
    table.string('author').notNullable();
    table.string('genre').nullable();
    table.integer('availableCopies').notNullable().defaultTo(1);
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('books');
}
