import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import type { Knex } from 'knex';
import { KNEX } from 'src/knex/constants';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthSerializer extends PassportSerializer {
    constructor(@Inject(KNEX) private readonly knex: Knex) {
        super();
    }

    serializeUser(user: User, done: (err: Error | null, user: string) => void): void {
        done(null, user.id);
    }

    deserializeUser(payload: string, done: (err: Error | null, user: User | null) => void): void {
        this.knex
            .table('users')
            .where('id', payload)
            .first<User>()
            .then((user: User) => {
                done(null, user);
            })
            .catch((err: Error) => {
                done(err, null);
            });
    }
}
