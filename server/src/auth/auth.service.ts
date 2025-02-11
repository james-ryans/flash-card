import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PlainUser } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(email: string, password: string): Promise<PlainUser | null> {
        const user = await this.userService.findOne(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            return this.userService.getPlainUser(user);
        }
        return null;
    }
}
