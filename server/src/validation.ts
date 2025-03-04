import { INestApplication, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { useContainer, ValidationError } from 'class-validator';

function useValidation(app: INestApplication): void {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            stopAtFirstError: true,
            exceptionFactory: (e: ValidationError[]) => {
                const errors = e.map((error: ValidationError) => {
                    return {
                        field: error.property,
                        message: Object.values(error.constraints ?? {})[0] ?? 'Invalid',
                    };
                })
                
                return new UnprocessableEntityException(errors, errors[0].message + (errors.length > 1 ? ` (+${errors.length} more)` : ""),
                );
            },
        }),
    );
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
}

export { useValidation };
