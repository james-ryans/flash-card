import { v2 as translateV2 } from '@google-cloud/translate';
import { Inject, Injectable } from '@nestjs/common';
import { Language } from './entities/translate.entity';
import { Knex } from 'knex';
import { KNEX } from 'src/knex/constants';
import { PlainUser } from 'src/user/user.model';

@Injectable()
export class TranslateService {
    private readonly knex: Knex;
    private translate: translateV2.Translate;

    constructor(@Inject(KNEX) knex: Knex) {
        this.knex = knex;
        this.translate = new translateV2.Translate();
    }

    async translation(user: PlainUser, text: string, from: Language, to: Language): Promise<string> {
        const [translation] = await this.translate.translate(text, {
            from: from.toString(),
            to: to.toString(),
        });

        await this.knex.table('histories').insert({
            user_id: user.id,
            text,
            translation,
        });

        return translation;
    }
}
