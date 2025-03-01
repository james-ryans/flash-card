import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX } from 'src/knex/constants';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@Inject(KNEX) private readonly knex: Knex) {}

    async findOne(email: User['email']): Promise<User | undefined> {
        return await this.knex.table('users').where('email', email).first<User>();
    }
}
