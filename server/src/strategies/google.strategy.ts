import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticateOptionsGoogle, Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.BASE_URL! + '/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    authorizationParams(options: AuthenticateOptionsGoogle): AuthenticateOptionsGoogle {
        return Object.assign(options, {
            prompt: 'select_account',
        });
    }

    async validate(_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
        const { id, emails, displayName } = profile;

        let user = await this.authService.validateGoogleUser(id, displayName, emails![0].value);
        return done(null, user);
    }
}
