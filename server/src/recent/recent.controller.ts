import { Controller, Get, Req } from '@nestjs/common';
import { RecentService } from './recent.service';
import { Request } from 'express';
import { RecentResponse } from './entities/recent.entity';

@Controller('recent')
export class RecentController {
    constructor(private readonly recentService: RecentService) {}

    @Get()
    findAll(@Req() { user }: Request): Promise<RecentResponse> {
        return this.recentService.findAll(user!.id);
    }
}
