import { BadRequestException, Body, Controller, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { Language, TranslateRequest, TranslationResponse } from './translate.model';

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) { }

  @Post()
  async translate(@Body() request: TranslateRequest): Promise<TranslationResponse> {
    return new TranslationResponse(await this.translateService.translation(request.text, request.from, request.to));
  }
}
