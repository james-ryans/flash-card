import { BadRequestException, INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { useContainer, ValidationError } from 'class-validator';

function useValidation(app: INestApplication): void {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            stopAtFirstError: true,
            exceptionFactory: (errors: ValidationError[]) => {
                Logger.error(errors, 'ValidationPipe');
                return new BadRequestException(errors.map((error: ValidationError) => {
                    return {
                        field: error.property,
                        message: Object.values(error.constraints ?? {})[0] ?? 'Invalid',
                    }
                }), 'Invalid request data');
            },
        }),
    );
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
}

export { useValidation };
