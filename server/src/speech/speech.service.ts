import { Injectable } from '@nestjs/common';
import { Speechify } from '@speechify/api-sdk';

@Injectable()
export class SpeechService {
    private speechify: Speechify;
    constructor() {
        this.speechify = new Speechify({
            apiKey: process.env.SPEECHIFY_API_KEY,
        });
    }

    async audioGenerate(text: string): Promise<ArrayBuffer> {
        const speech = await this.speechify.audioGenerate({
            input: text,
            voiceId: 'lisa',
            audioFormat: 'mp3',
        });

        return await speech.audioData.arrayBuffer();
    }
}
