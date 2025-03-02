import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isObservable, lastValueFrom } from 'rxjs';

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
}
