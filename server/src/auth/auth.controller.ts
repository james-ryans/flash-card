import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { Request, Response } from 'express';
import { AuthUser, LoginResponse, RegisterRequest, RegisterResponse, VerifyResponse } from './entities/auth.entity';
import { Public } from 'src/guards/session.guard';
import { GoogleOAuthGuard } from 'src/guards/google.guard';
import { AuthService } from './auth.service';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

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

    @UseGuards(GoogleOAuthGuard)
    @Get('google')
    async googleAuth() {}

    @UseGuards(GoogleOAuthGuard)
    @Get('google/callback')
    googleAuthRedirect(@Res() res: Response): void {
        return res.redirect(process.env.CLIENT_BASE_URL!);
    }

    @Post('register')
    async register(@Body() req: RegisterRequest): Promise<RegisterResponse> {
        const user = await this.authService.registerLocalUser(req.name, req.email, req.password);

        return {
            data: new AuthUser(user),
            message: 'Registration successful',
            statusCode: HttpStatus.CREATED,
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
