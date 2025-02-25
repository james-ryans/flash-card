import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { Request } from 'express';
import { AuthUser, LoginResponse, VerifyResponse } from './auth.model';
import { Public } from 'src/guards/session.guard';

@Public()
@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request): LoginResponse {
        const user = new AuthUser(req.user!);

        return {
            data: user,
            message: 'Login successful',
            statusCode: HttpStatus.OK,
        };
    }

    @Post('logout')
    logout(@Req() req: Request): any {
        req.session.destroy((err: Error) => {
            if (err) {
                throw err;
            }
        });
        return {
            message: 'Logout successful',
            statusCode: HttpStatus.OK,
        };
    }

    @Post('verify')
    @HttpCode(HttpStatus.OK)
    verify(@Req() req: Request): VerifyResponse {
        if (req.user === undefined) {
            return {
                data: undefined,
                message: 'User not verified',
                statusCode: HttpStatus.UNAUTHORIZED,
            };
        }

        const user = new AuthUser(req.user);
        return {
            data: user,
            message: 'User verified',
            statusCode: HttpStatus.OK,
        };
    }
}
