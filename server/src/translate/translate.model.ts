import { IsEnum, IsNotEmpty } from "class-validator";

export enum Language {
    EN = "en",
    ID = "id",
}

export class TranslateRequest {
    @IsNotEmpty({ message: 'Text is required' })
    text: string;
    @IsEnum(Language, { message: 'Invalid language' })
    from: Language;
    @IsEnum(Language, { message: 'Invalid language' })
    to: Language;

    constructor(text: string, from: Language, to: Language) {
        this.text = text;
        this.from = from;
        this.to = to;
    }
}

export class TranslationResponse {
    data: {
        text: string;
    };

    constructor(text: string) {
        this.data = {
            text
        };
    }
}