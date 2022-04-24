import { Role } from '../domain/Role';
import { RoleRepository } from '../domain/RoleRepository'
import { RoleUpdateParams } from '../domain/RoleRequest'
import { fold } from '../../../shared/core/Either';

export class UpdatedRole {
  static async run(
    id: string,
    request: RoleUpdateParams,
    repository: RoleRepository
  ): Promise<void> {
    const result = await repository.update(id, request)
    return fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (role: Role) => {}
    )
  }
}
