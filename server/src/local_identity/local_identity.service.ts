import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX } from 'src/knex/constants';

@Injectable()
export class LocalIdentityService {
    constructor(@Inject(KNEX) private readonly knex: Knex) {}

    async findOne(userId: LocalIdentity['user_id']): Promise<LocalIdentity | undefined> {
        return await this.knex.table('local_identities').where({ user_id: userId }).first<LocalIdentity>();
    }
}
