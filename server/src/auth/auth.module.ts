import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { AuthSerializer } from './auth.serializer';
import { LocalIdentityModule } from 'src/local_identity/local_identity.module';
import { FederatedIdentityModule } from 'src/federated_identity/federated_identity.module';

@Module({
    imports: [UserModule, LocalIdentityModule, FederatedIdentityModule, PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, GoogleStrategy, AuthSerializer],
})
export class AuthModule {}
