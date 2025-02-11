import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { AuthSerializer } from './auth.serializer';

@Module({
    imports: [UserModule, PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, AuthSerializer],
})
export class AuthModule {}
