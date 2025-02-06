export class Translation {
    text: string;

    constructor(text: string) {
        this.text = text;
    }
}

export class TranslationResponse {
    data: Translation;

    constructor(data: Translation) {
        this.data = data;
    }
}