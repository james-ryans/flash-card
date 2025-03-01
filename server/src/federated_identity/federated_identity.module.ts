import { Module } from '@nestjs/common';
import { FederatedIdentityService } from './federated_identity.service';

@Module({
    providers: [FederatedIdentityService],
    exports: [FederatedIdentityService],
})
export class FederatedIdentityModule {}
