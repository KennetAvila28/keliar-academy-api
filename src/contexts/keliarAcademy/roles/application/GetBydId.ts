/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { Role } from '../domain/Role'
import { RoleFailure } from '../domain/RoleFailures'
import { RoleRepository } from '../domain/RoleRepository'
import { RoleResponseModel } from '../domain/RoleRequest'

export class GetById {
  static async run(
    id: string,
    repository: RoleRepository
  ): Promise<RoleResponseModel> {
    const result = await repository.searchById(id)

    return fold<RoleFailure, Role, any>(
      result,
      (error) => {
        throw new Error(error)
      },
      (role) => role.toPrimitives()
    )
  }
}
