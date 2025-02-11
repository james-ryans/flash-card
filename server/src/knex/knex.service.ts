import { Injectable, Inject, Logger } from '@nestjs/common';
import { KNEX_OPTIONS } from './constants';
import { KnexOptions } from './interfaces';
import knex from 'knex';
import type { Knex } from 'knex';

interface IKnexService {
    getKnex(): Knex;
}

@Injectable()
export class KnexService implements IKnexService {
    private readonly logger: Logger;
    private _knexConnection: Knex;
    constructor(@Inject(KNEX_OPTIONS) private _knexOptions: KnexOptions) {
        this.logger = new Logger('KnexService');
        this.logger.log(`Options: ${JSON.stringify(this._knexOptions)}`);
    }

    getKnex(): Knex {
        if (!this._knexConnection) {
            this._knexConnection = knex(this._knexOptions);
        }
        return this._knexConnection;
    }
}
