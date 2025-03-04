import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { isObservable, lastValueFrom } from 'rxjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = await super.canActivate(context);
        await super.logIn(super.getRequest(context));

        if (isObservable(result)) {
            return lastValueFrom(result);
        }
        return result;
    }

    handleRequest<TUser = User>(err: any, user: TUser, info: any, context: ExecutionContext, status?: any): TUser {
        if (err || !user) {
            const response: Response = context.switchToHttp().getResponse();
            response.cookie('error', err.message || 'Unauthorized', { maxAge: 3000, httpOnly: false });
            response.redirect(process.env.CLIENT_BASE_URL! + '/login');
            response.end();
        }
        return user;
    }
}
