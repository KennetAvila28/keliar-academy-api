import { fold } from "../../../shared/core/Either"
import { UniqueId } from "../../../shared/domain/valueobjects/UniqueId"
import { User } from "../domain/User"
import { UserFailure } from "../domain/UserFailures"
import { UserRepository } from "../domain/UserRepository"
import { UserArchivedParams, UserPasswordUpdateParams } from "../domain/UserRequest"
import { UserPassword } from "../domain/UserValueObjects"

export class ChangePasswordUser {
    static async run(id: UniqueId, request: UserPasswordUpdateParams, repository: UserRepository): Promise<any> {
        const result = await repository.changePassword(id, new UserPassword(request.password));
        console.log(result)
        return fold<UserFailure, User, string>(
            result,
            (err) => {
                throw err;
              },
            (user) => {
                return `La contraseña del usuario ${user.names} ${user.lastNames} ha sido actualizada`;
              }
        );
    }
}
