/**
 * @description Use case for role creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { Role } from '../domain/Role'
import { RoleFailure } from '../domain/RoleFailures'
import { RoleFilterRequest } from '../domain/RoleFilterRequest'
import { RoleRepository } from '../domain/RoleRepository'

export class GetRoles {
  static async run(filter: RoleFilterRequest, repository: RoleRepository): Promise<any[]> {
    const result = await repository.searchByCriteria(filter);
    return fold<RoleFailure, Role[], any>(
      result,
      (error) => {
        throw new Error(error);
      },
      (role) => role.map((u) => u.toPrimitives())
    );
  }
}
