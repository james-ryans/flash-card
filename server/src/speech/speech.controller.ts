import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { SpeechService } from './speech.service';
import { Response } from 'express';

@Controller('speech')
export class SpeechController {
    constructor(private readonly speechService: SpeechService) {}

    @Get()
    async speech(@Res() res: Response, @Query('text') text: string) {
        const buffer = await this.speechService.audioGenerate(text);

        res.setHeader('Content-Type', 'audio/mpeg; charset=binary');
        res.status(HttpStatus.OK).send(Buffer.from(buffer));
    }
}
