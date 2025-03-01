import { Module } from '@nestjs/common';
import { LocalIdentityService } from './local_identity.service';

@Module({
    providers: [LocalIdentityService],
    exports: [LocalIdentityService],
})
export class LocalIdentityModule {}
