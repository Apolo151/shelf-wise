import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('borrows', (table) => {
    table.increments('id').primary(); // auto-incrementing primary key
    table.integer('userId').unsigned().notNullable()
      .references('id').inTable('users')
      .onUpdate('CASCADE') // Cascade updates
      .onDelete('CASCADE'); // Cascade deletes

    table.integer('bookId').unsigned().notNullable()
      .references('id').inTable('books')
      .onUpdate('CASCADE') // Cascade updates
      .onDelete('CASCADE'); // Cascade deletes

    table.timestamp('borrowDate').defaultTo(knex.fn.now()).notNullable(); // Default current timestamp
    table.timestamp('returnDate').nullable(); // Can be null if not returned yet

    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable(); // Creation timestamp
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable(); // Update timestamp
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('borrows');
}
