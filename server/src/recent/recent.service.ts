import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX } from 'src/knex/constants';
import { User } from 'src/user/entities/user.entity';
import { RecentResponse } from './entities/recent.entity';

@Injectable()
export class RecentService {
    constructor(@Inject(KNEX) private readonly knex: Knex) {}

    async findAll(user_id: User['id']): Promise<RecentResponse> {
        return await this.knex
            .table('histories')
            .select('text', 'translation')
            .where('user_id', user_id)
            .orderBy('created_at', 'desc')
            .limit(5)
            .then((histories) => new RecentResponse(histories));
    }
}
