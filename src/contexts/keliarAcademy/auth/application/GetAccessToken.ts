import { fold } from "../../../shared/core/Either";
import { User } from "../../users/domain/User";
import { UserRepository } from "../../users/domain/UserRepository";
import { UserEmail } from "../../users/domain/UserValueObjects";
import { AuthParams } from "../domain/AuthTypes";
import BCrypt from 'bcryptjs'

export class GetAccessToken {
    static async run(auth: AuthParams, userRepository: UserRepository) {
        const result = await userRepository.searchByEmail(new UserEmail(auth.email));
        return fold(result, (err) => { 
            throw new Error(err);
        }, (user) => {
                    console.log('authenticated user: ' + user);
        });
    }
}
