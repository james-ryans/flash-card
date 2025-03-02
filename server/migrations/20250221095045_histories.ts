import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('histories', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('user_id').references('id').inTable('users').notNullable();
        table.string('text').notNullable();
        table.string('translation').notNullable();
        table.timestamp('created_at', { useTz: true, precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();

        table.index(['user_id', 'created_at']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('histories');
}
