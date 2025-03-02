import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('federated_identities', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('user_id').references('id').inTable('users').notNullable();
        table.string('provider').notNullable();
        table.string('subject').notNullable();

        table.index(['provider', 'subject']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('federated_identities');
}
