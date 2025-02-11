import { Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(): Promise<any> {
        return {
            message: 'Login successful',
            statusCode: HttpStatus.OK,
        };
    }

    @Post('logout')
    async logout(@Req() req: Request): Promise<any> {
        req.session.destroy(() => {
            return {
                message: 'Logout successful',
                statusCode: HttpStatus.OK,
            };
        });
    }
}
