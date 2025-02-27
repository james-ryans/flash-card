import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SessionAuthGuard } from './guards/session.guard';
import { TranslateModule } from './translate/translate.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { KnexModule } from './knex/knex.module';
import { RecentModule } from './recent/recent.module';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';

@Module({
    imports: [
        LoggerModule.forRoot({
            pinoHttp: {
                logger: pino({
                    redact: ['req.headers.authorization', 'req.headers.cookie'],
                }),
            },
        }),
        ConfigModule.forRoot(),
        KnexModule.register({
            client: process.env.DB_CLIENT,
            connection: {
                host: process.env.DB_HOST,
                port: +(process.env.DB_PORT ?? '5432'),
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                ssl: process.env.DB_SSL === 'true',
            },
        }),
        UserModule,
        AuthModule,
        TranslateModule,
        RecentModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: SessionAuthGuard,
        },
    ],
})
export class AppModule {}
