import { v2 as translateV2 } from '@google-cloud/translate';
import { Injectable } from '@nestjs/common';
import { Language } from './translate.model';

@Injectable()
export class TranslateService {
    private translate: translateV2.Translate;

    constructor() {
        this.translate = new translateV2.Translate();
    }

    async translation(text: string, from: Language, to: Language): Promise<string> {
        const [translation] = await this.translate.translate(text, {
            from: from.toString(),
            to: to.toString(),
        });

        return translation;
    }
}
