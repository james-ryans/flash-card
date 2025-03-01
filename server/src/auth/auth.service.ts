import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LocalIdentityService } from 'src/local_identity/local_identity.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private localIdentityService: LocalIdentityService,
    ) {}

    async validateLocalUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findOne(email);
        if (!user) {
            return null;
        }

        const identity = await this.localIdentityService.findOne(user.id);
        if (!identity || !bcrypt.compareSync(password, identity.password)) {
            return null;
        }

        return user;
    }
}
