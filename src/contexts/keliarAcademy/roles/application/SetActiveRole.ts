import { fold } from "../../../shared/core/Either"
import { UniqueId } from "../../../shared/domain/valueobjects/UniqueId"
import { Role } from "../domain/Role"
import { RoleFailure } from "../domain/RoleFailures"
import { RoleRepository } from "../domain/RoleRepository"
import { RoleActiveParams } from "../domain/RoleRequest"

export class SetActiveRole {
    static async run(id: UniqueId, request: RoleActiveParams, repository: RoleRepository): Promise<any> {
        const result = await repository.changeState(id, request.isActive);
        return fold<RoleFailure, Role, string>(
            result,
            (err) => {
                return err;
              },
            (role) => {
                return `El usuario ${role.name} ha sido ${role.isActive ? 'Activado' : 'Desactivado'}`;
              }
        );
    }
}
