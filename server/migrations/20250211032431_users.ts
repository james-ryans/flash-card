import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
        table.string('name');
        table.string('email');
        table.string('password');
        table.timestamp('created_at', { useTz: true, precision: 6 }).defaultTo(knex.fn.now(6));
        table.timestamp('updated_at', { useTz: true, precision: 6 }).defaultTo(knex.fn.now(6));
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
