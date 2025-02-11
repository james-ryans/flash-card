import { BadRequestException, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlainUser } from 'src/user/user.model';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result: boolean = await super.canActivate(context);
        await super.logIn(super.getRequest(context));
        return result;
    }

    handleRequest<TUser = PlainUser>(
        err: Error,
        user: TUser | null,
        info: Record<'message', string> | null,
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
