import { v2 as translateV2 } from '@google-cloud/translate';
import { Injectable } from '@nestjs/common';
import { Translation } from './translate.model';

@Injectable()
export class TranslateService {
    private translate: translateV2.Translate;

    constructor() {
        this.translate = new translateV2.Translate();
    }

    async translation(text: string): Promise<Translation> {
        const [translation] = await this.translate.translate(text, {
            from: 'id',
            to: 'en'
        });

        return new Translation(translation);
    }
}
