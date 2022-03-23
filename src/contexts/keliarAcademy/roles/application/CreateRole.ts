/**
 * @description Use case for role creation
 * @author Kennet Avila
 */

import { Role } from '../domain/Role'
import { RoleRepository } from '../domain/RoleRepository'
import { RoleCreationParams } from '../domain/RoleRequest'
import { fold } from '../../../shared/core/Either'
import { RoleFailure } from '../domain/RoleFailures'

export class CreateRole {
  static async run(
    request: RoleCreationParams,
    repository: RoleRepository
  ): Promise<any> {
    const role = Role.create(request);
    const result = await repository.save(role);
    return fold<RoleFailure, Role, any>(
      result,
      (err) => {
        throw new Error(err);
      },
      (role: Role) => {
        return role.toPrimitives();
      }
    );
  }
}
