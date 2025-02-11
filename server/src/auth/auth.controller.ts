import { Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
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
}
