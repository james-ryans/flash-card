import type { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert([
        {
            name: 'Admin',
            email: 'admin@example.com',
            password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
        },
        {
            name: 'User',
            email: 'user@example.com',
            password: bcrypt.hashSync('user', bcrypt.genSaltSync(10)),
        },
    ]);
}
