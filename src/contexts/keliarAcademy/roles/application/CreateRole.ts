/**
 * @description Use case for role creation
 * @author Kennet Avila
 */

import { Role } from '../domain/Role'
import { RoleRepository } from '../domain/RoleRepository'
import { RoleCreationParams } from '../domain/RoleRequest'
import { fold, getOrElse } from '../../../shared/core/Either'
import { RoleFailure } from '../domain/RoleFailures'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { v4 } from 'uuid'

export class CreateRole {
  static async run(
    request: RoleCreationParams,
    repository: RoleRepository
  ): Promise<any> {
    const role = Role.create(
      new UniqueId(v4()),
      request.name,
      request.permissions
    )
    const _role = getOrElse(role, (err) => {
      throw new Error(err)
    })
    const result = await repository.save(_role)
    return fold<RoleFailure, Role, any>(
      result,
      (err) => {
        throw new Error(err)
      },
      (role: Role) => {
        return role.toPrimitives()
      }
    )
  }
}
