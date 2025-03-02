import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX } from 'src/knex/constants';
import { FederatedIdentity } from './entities/federated_identity.entity';

@Injectable()
export class FederatedIdentityService {
    constructor(@Inject(KNEX) private readonly knex: Knex) {}

    async findOneFromGoogle(id: string): Promise<FederatedIdentity | undefined> {
        return await this.knex
            .table('federated_identities')
            .where('provider', 'google')
            .where('subject', id)
            .first<FederatedIdentity>();
    }
}
