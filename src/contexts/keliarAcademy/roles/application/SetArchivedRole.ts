import { fold } from "../../../shared/core/Either"
import { UniqueId } from "../../../shared/domain/valueobjects/UniqueId"
import { Role } from "../domain/Role"
import { RoleFailure } from "../domain/RoleFailures"
import { RoleRepository } from "../domain/RoleRepository"
import { RoleArchivedParams } from "../domain/RoleRequest"

export class SetArchivedRole {
    static async run(id: UniqueId, request: RoleArchivedParams, repository: RoleRepository): Promise<any> {
        const result = await repository.changeArchived(id, request.isArchived);
        return fold<RoleFailure, Role, string>(
            result,
            (err) => {
                return err;
              },
            (role) => {
                return `El usuario ${role.name} ha sido ${role.isArchived ? 'Archivado' : 'Recuperado'}`;
              }
        );
    }
}
