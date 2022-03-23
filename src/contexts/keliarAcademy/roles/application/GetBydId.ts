/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { Role } from '../domain/Role'
import { RoleFailure } from '../domain/RoleFailures'
import { RoleRepository } from '../domain/RoleRepository'

export class GetById {
  static async run(id: UniqueId, repository: RoleRepository): Promise<any> {
    const result = await repository.searchById(id);

    return fold<RoleFailure, Role, any>(
      result,
      (error) => {
        throw new Error(error);
      },
      (user) => user.toPrimitives()
    );
  }
}
