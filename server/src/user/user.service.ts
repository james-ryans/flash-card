import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX } from 'src/knex/constants';
import { PlainUser, User } from './user.model';

@Injectable()
export class UserService {
    constructor(@Inject(KNEX) private readonly knex: Knex) {}

    async findOne(email: string): Promise<User | undefined> {
        return this.knex.table('users').where('email', email).first();
    }

    getPlainUser(user: User): PlainUser {
        const { password, ...result } = user;
        return result;
    }
}
