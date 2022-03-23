import { fold } from "../../../shared/core/Either"
import { UniqueId } from "../../../shared/domain/valueobjects/UniqueId"
import { User } from "../domain/User"
import { UserFailure } from "../domain/UserFailures"
import { UserRepository } from "../domain/UserRepository"
import { UserArchivedParams } from "../domain/UserRequest"

export class SetArchivedUser {
    static async run(id: UniqueId, request: UserArchivedParams, repository: UserRepository): Promise<any> {
        const result = await repository.changeArchived(id, request.isArchived);
        return fold<UserFailure, User, string>(
            result,
            (err) => {
                return err;
              },
            (user) => {
                return `El usuario ${user.names} ${user.lastNames} ha sido ${user.isArchived ? 'Archivado' : 'Recuperado'}`;
              }
        );
    }
}
