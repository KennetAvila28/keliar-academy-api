/**
 * @description Use case for role creation
 * @author Kennet Avila
 */

import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { Role } from '../domain/Role'
import { RoleRepository } from '../domain/RoleRepository'
import { v4 } from 'uuid'
import { RoleUpdateParams } from '../domain/RoleRequest'
import { Either, fold, getOrElse } from '../../../shared/core/Either'
import { RoleFailure } from '../domain/RoleFailures'

export class UpdatedRole {
  static async run(
    id:string,
    request: RoleUpdateParams,
    repository: RoleRepository
  ): Promise<any> {
   
    const result = await repository.update(new UniqueId(id),request);
    return fold<RoleFailure, Role, any>(
      result,
      (err) => {
        return new Error(err);
      },
      (role: Role) => {
        return role.toPrimitives();
      }
    );
  }
}
