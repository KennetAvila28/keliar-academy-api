import { fold } from '../../../shared/core/Either'
import { RoleRepository } from '../domain/RoleRepository'
import { RoleArchivedParams } from '../domain/RoleRequest'

export class SetArchivedRole {
  static async run(
    id: string,
    request: RoleArchivedParams,
    repository: RoleRepository
  ): Promise<void> {
    const result = await repository.changeArchived(id, request.isArchived)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (role) => {}
    )
  }
}
