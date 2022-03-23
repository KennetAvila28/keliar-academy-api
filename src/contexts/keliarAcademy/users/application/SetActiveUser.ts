import { fold } from "../../../shared/core/Either"
import { UniqueId } from "../../../shared/domain/valueobjects/UniqueId"
import { User } from "../domain/User"
import { UserFailure } from "../domain/UserFailures"
import { UserRepository } from "../domain/UserRepository"
import { UserActiveParams } from "../domain/UserRequest"

export class SetActiveUser {
    static async run(id: UniqueId, request: UserActiveParams, repository: UserRepository): Promise<any> {
        const result = await repository.changeState(id, request.isActive);
        return fold<UserFailure, User, string>(
            result,
            (err) => {
                return err;
              },
            (user) => {
                return `El usuario ${user.names} ${user.lastNames} ha sido ${user.isActive ? 'Activado' : 'Desactivado'}`;
              }
        );
    }
}
