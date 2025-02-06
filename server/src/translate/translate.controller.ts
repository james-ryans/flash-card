import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { TranslationResponse } from './translate.model';

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) { }

  @Post()
  async translate(@Body('text') text: string): Promise<TranslationResponse> {
    if (!text) {
      throw new BadRequestException('Text is required');
    }
    return new TranslationResponse(await this.translateService.translation(text));
  }
}
