import { Injectable, Inject, Logger } from '@nestjs/common';
import { KNEX_OPTIONS } from './constants';
import { KnexOptions } from './interfaces';
import knex from 'knex';
import type { Knex } from 'knex';
import fastRedact from 'fast-redact';

interface IKnexService {
    getKnex(): Knex;
}

@Injectable()
export class KnexService implements IKnexService {
    private readonly logger: Logger;
    private _knexConnection: Knex;
    constructor(@Inject(KNEX_OPTIONS) private _knexOptions: KnexOptions) {
        this.logger = new Logger(KnexService.name);

        const redact = fastRedact({ paths: ['connection.password'], censor: '[Redacted]' });
        this.logger.log(`Options: ${redact(this._knexOptions)}`);
    }

    getKnex(): Knex {
        if (!this._knexConnection) {
            this._knexConnection = knex(this._knexOptions);
        }
        return this._knexConnection;
    }
}
