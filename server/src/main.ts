import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RedisStore } from 'connect-redis';
import * as redis from 'redis';
import session from 'express-session';
import passport from 'passport';
import process from 'process';
import { Logger } from 'nestjs-pino';
import { useValidation } from './validation';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    app.useLogger(app.get(Logger));
    app.enableCors({
        origin: process.env.CORS_ORIGIN ?? '*',
        credentials: process.env.CORS_CREDENTIALS === 'true',
    });

    if (process.env.SESSION_SECRET === undefined) {
        throw new Error('SESSION_SECRET is required');
    }
    const redisClient = redis.createClient({
        url: process.env.REDIS_URL ?? 'redis://localhost:6379',
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    });
    redisClient.connect().catch((err: Error) => {
        throw new Error(`Failed to connect to Redis: ${err.message}`);
    });
    const redisStore = new RedisStore({
        client: redisClient,
    });

    app.use(
        session({
            store: redisStore,
            secret: process.env.SESSION_SECRET,
            resave: Boolean(process.env.SESSION_RESAVE),
            saveUninitialized: Boolean(process.env.SESSION_SAVE_UNINITIALIZED),
            cookie: { maxAge: +(process.env.SESSION_COOKIE_MAX_AGE ?? '3600000') },
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    useValidation(app);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
    console.error('Error during bootstrap:', error);
    process.exit(1);
});
