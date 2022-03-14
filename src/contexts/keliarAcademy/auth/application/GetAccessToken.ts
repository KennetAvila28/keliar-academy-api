import { fold } from "../../../shared/core/Either";
import { User } from "../../users/domain/User";
import { UserRepository } from "../../users/domain/UserRepository";
import { UserEmail } from "../../users/domain/UserValueObjects";
import { AuthParams } from "../domain/AuthTypes";

export class GetAccessToken {
    static async run(auth: AuthParams, userRepository: UserRepository) {
        const user = await userRepository.searchByEmail(new UserEmail(auth.email));

        return fold(
            user,
            (err) => {
                return new Error(err)
            },
            (user: User) => {
                return user.toPrimitives()
            }
        )
    }
}
