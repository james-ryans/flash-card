import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { FederatedIdentityService } from 'src/federated_identity/federated_identity.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private userService: UserService,
        private federatedIdentityService: FederatedIdentityService,
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            callbackURL: 'http://lvh.me:3000/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
        const { id, emails, displayName } = profile;

        let user: User | undefined;
        const identity = await this.federatedIdentityService.findOneFromGoogle(id);
        if (!identity) {
            user = await this.userService.createGoogle(id, displayName, emails![0].value);
        } else {
            user = await this.userService.findOne(identity.user_id);
            if (!user) {
                return done(null, false);
            }
        }
        return done(null, user);
    }
}
