import { INestApplication, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { useContainer, ValidationError } from 'class-validator';

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function useValidation(app: INestApplication): void {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            stopAtFirstError: true,
            exceptionFactory: (e: ValidationError[]) => {
                const errors = e.map((error: ValidationError) => {
                    return {
                        field: error.property,
                        message: capitalizeFirstLetter(Object.values(error.constraints ?? {})[0] ?? 'invalid'),
                    };
                });

                return new UnprocessableEntityException(
                    errors,
                    capitalizeFirstLetter(
                        errors[0].message + (errors.length > 1 ? ` (+${errors.length - 1} more)` : ''),
                    ),
                );
            },
        }),
    );
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
}

export { useValidation };
