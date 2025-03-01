import type { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.table('local_identities').delete();
    await knex.table('users').delete();

    // Inserts seed entries
    const users = await knex.table('users').insert(
        [
            {
                name: 'Admin',
                email: 'admin@example.com',
            },
            {
                name: 'User',
                email: 'user@example.com',
            },
        ],
        ['id'],
    );

    await knex.table('local_identities').insert([
        {
            user_id: users[0].id,
            password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
        },
        {
            user_id: users[1].id,
            password: bcrypt.hashSync('user', bcrypt.genSaltSync(10)),
        },
    ]);
}
