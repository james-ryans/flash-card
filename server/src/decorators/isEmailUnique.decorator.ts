import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(email: string, _args: ValidationArguments): Promise<boolean> {
        const user = await this.userService.findOneByEmail(email);
        return !user;
    }

    defaultMessage(_args?: ValidationArguments): string {
        return 'A user is already registered with this email';
    }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueConstraint,
        });
    };
}
