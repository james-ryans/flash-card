import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { TranslateRequest, TranslationResponse } from './translate.model';
import { SessionAuthGuard } from 'src/guards/session.guard';

@Controller('translate')
export class TranslateController {
    constructor(private readonly translateService: TranslateService) {}

    @UseGuards(SessionAuthGuard)
    @Post()
    async translate(@Body() request: TranslateRequest): Promise<TranslationResponse> {
        return new TranslationResponse(await this.translateService.translation(request.text, request.from, request.to));
    }
}
