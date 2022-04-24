/**
 * @description Use case for role creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { RoleFilterRequest } from '../domain/RoleFilterRequest'
import { RoleRepository } from '../domain/RoleRepository'
import { RoleResponseModel } from '../domain/RoleRequest'

export class GetArchivedRoles {
  static async run(
    filter: RoleFilterRequest,
    repository: RoleRepository
  ): Promise<RoleResponseModel[]> {
    const result = await repository.getArchived(filter)
    return fold(
      result,
      (error) => {
        throw new Error(error)
      },
      (role) => role.map((r) => r.toPrimitives())
    )
  }
}
