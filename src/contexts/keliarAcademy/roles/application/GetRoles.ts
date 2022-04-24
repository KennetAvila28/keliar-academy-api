/**
 * @description Use case for role creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { RoleFilterRequest } from '../domain/RoleFilterRequest'
import { RoleRepository } from '../domain/RoleRepository'
import { RoleResponseModel } from '../domain/RoleRequest'

export class GetRoles {
  static async run(
    filter: RoleFilterRequest,
    repository: RoleRepository
  ): Promise<RoleResponseModel[]> {
    const result = await repository.searchByCriteria(filter)
    return fold(
      result,
      (error) => {
        throw new Error(error)
      },
      (role) => role.map((u) => u.toPrimitives())
    )
  }
}
