import { KNEX } from './constants';
import { KnexService } from './knex.service';

export const connectionFactory = {
    provide: KNEX,
    useFactory: async (knexService) => {
        return knexService.getKnex();
    },
    inject: [KnexService],
};
