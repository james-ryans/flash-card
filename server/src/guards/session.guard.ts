import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class SessionAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        return context.switchToHttp().getRequest<Request>().isAuthenticated();
    }
}
