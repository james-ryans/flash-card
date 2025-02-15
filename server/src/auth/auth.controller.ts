import { Controller, Get, HttpCode, HttpStatus, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(): any {
        return {
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
    verify(@Req() req: Request): any {
        Logger.log(req.user);
        if (req.user === undefined) {
            return {
                message: 'User not verified',
                statusCode: HttpStatus.UNAUTHORIZED,
            };
        }
        return {
            message: 'User verified',
            statusCode: HttpStatus.OK,
        };
    }
}
