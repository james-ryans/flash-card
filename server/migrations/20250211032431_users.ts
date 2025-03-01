import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.timestamp('created_at', { useTz: true, precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
        table.timestamp('updated_at', { useTz: true, precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
