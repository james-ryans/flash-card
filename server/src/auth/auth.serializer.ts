import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { KNEX } from 'src/knex/constants';

@Injectable()
export class AuthSerializer extends PassportSerializer {
    constructor(@Inject(KNEX) private readonly knex) {
        super();
    }

    serializeUser(user: any, done: (err: Error | null, user: any) => void): void {
        done(null, user.id);
    }

    deserializeUser(payload: string, done: (err: Error | null, payload: any) => void): void {
        this.knex
            .table('users')
            .where('id', payload)
            .first('id', 'name', 'email')
            .then((users) => {
                done(null, users);
            })
            .catch((err: Error) => {
                done(err, null);
            });
    }
}
