import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import type { Knex } from 'knex';
import { KNEX } from 'src/knex/constants';
import { PlainUser } from 'src/user/user.model';

@Injectable()
export class AuthSerializer extends PassportSerializer {
    constructor(@Inject(KNEX) private readonly knex: Knex) {
        super();
    }

    serializeUser(user: PlainUser, done: (err: Error | null, user: string) => void): void {
        done(null, user.id);
    }

    deserializeUser(payload: string, done: (err: Error | null, user: PlainUser | null) => void): void {
        this.knex
            .table('users')
            .where('id', payload)
            .first()
            .then((user: PlainUser) => {
                done(null, user);
            })
            .catch((err: Error) => {
                done(err, null);
            });
    }
}
