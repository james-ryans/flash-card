import { BadRequestException, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlainUser } from 'src/user/user.model';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result: boolean = await super.canActivate(context);
        await super.logIn(super.getRequest(context));
        return result;
    }

    handleRequest<TUser = PlainUser>(
        err: Error,
        user: TUser | null,
        info: any,
        context: ExecutionContext,
        status?: number,
    ): TUser {
        if (!user) {
            if (info?.message && status) {
                throw new HttpException(info.message, status);
            }
            throw new BadRequestException('Invalid credentials');
        }

        return user;
    }
}
