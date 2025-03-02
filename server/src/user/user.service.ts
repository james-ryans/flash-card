import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX } from 'src/knex/constants';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@Inject(KNEX) private readonly knex: Knex) {}

    async findOne(id: string): Promise<User | undefined> {
        return await this.knex.table('users').where('id', id).first<User>();
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.knex.table('users').where('email', email).first<User>();
    }

    async createGoogle(id: string, name: string, email: string): Promise<User> {
        return this.knex.transaction(async (trx) => {
            const user = await trx.table('users').insert({ name, email }).returning<User[]>('*');
            await trx.table('federated_identities').insert({ user_id: user[0].id, provider: 'google', subject: id });

            return user[0];
        });
    }
}
