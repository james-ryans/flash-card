import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX } from 'src/knex/constants';
import { PlainUser, User } from './user.model';

@Injectable()
export class UserService {
    constructor(@Inject(KNEX) private readonly knex: Knex) {}

    async findOne(email: string): Promise<User | undefined> {
        return await this.knex.table('users').where('email', email).first<User>();
    }

    getPlainUser(user: User): PlainUser {
        return user as PlainUser;
    }
}
