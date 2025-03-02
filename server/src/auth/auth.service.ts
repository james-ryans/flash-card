import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LocalIdentityService } from 'src/local_identity/local_identity.service';
import { FederatedIdentityService } from 'src/federated_identity/federated_identity.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private localIdentityService: LocalIdentityService,
        private federatedIdentityService: FederatedIdentityService,
    ) {}

    async validateLocalUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return null;
        }

        const identity = await this.localIdentityService.findOne(user.id);
        if (!identity || !bcrypt.compareSync(password, identity.password)) {
            return null;
        }

        return user;
    }

    async validateGoogleUser(id: string, name: string, email: string): Promise<User | undefined> {
        let user: User | undefined;
        const identity = await this.federatedIdentityService.findOneFromGoogle(id);
        if (!identity) {
            user = await this.userService.createGoogle(id, name, email);
        } else {
            user = await this.userService.findOne(identity.user_id);
        }

        return user;
    }

    async registerLocalUser(name: string, email: string, password: string): Promise<User> {
        const user = await this.userService.findOneByEmail(email);
        if (user) {
            throw new BadRequestException('This email already registered');
        }

        return await this.userService.createLocal(name, email, password);
    }
}
