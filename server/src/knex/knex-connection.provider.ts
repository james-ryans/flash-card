import type { Knex } from 'knex';
import { KNEX } from './constants';
import { KnexService } from './knex.service';

export const connectionFactory = {
    provide: KNEX,
    useFactory: (knexService: KnexService): Knex => {
        return knexService.getKnex();
    },
    inject: [KnexService],
};
