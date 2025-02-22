import { Module } from '@nestjs/common';
import { RecentService } from './recent.service';
import { RecentController } from './recent.controller';

@Module({
    controllers: [RecentController],
    providers: [RecentService],
})
export class RecentModule {}
