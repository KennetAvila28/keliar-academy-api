import { fold } from '../../../shared/core/Either'
import { RoleRepository } from '../domain/RoleRepository'
import { RoleActiveParams } from '../domain/RoleRequest'

export class SetActiveRole {
  static async run(
    id: string,
    request: RoleActiveParams,
    repository: RoleRepository
  ): Promise<void> {
    const result = await repository.changeState(id, request.isActive)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (role) => {}
    )
  }
}
