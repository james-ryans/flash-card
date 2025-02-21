import { Body, Controller, Post, Req } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { TranslateRequest, TranslationResponse } from './entities/translate.entity';
import { Request } from 'express';

@Controller('translate')
export class TranslateController {
    constructor(private readonly translateService: TranslateService) {}

    @Post()
    async translate(
        @Req() { user }: Request,
        @Body() { text, from, to }: TranslateRequest,
    ): Promise<TranslationResponse> {
        return new TranslationResponse(await this.translateService.translation(user!, text, from, to));
    }
}
