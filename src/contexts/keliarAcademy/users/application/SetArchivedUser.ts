import { fold } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { UserRepository } from '../domain/UserRepository'
import { UserArchivedParams } from '../domain/UserRequest'

export class SetArchivedUser {
  static async run(
    id: UniqueId,
    request: UserArchivedParams,
    repository: UserRepository
  ): Promise<void> {
    const result = await repository.changeArchived(id.get(), request.isArchived)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (user) => {}
    )
  }
}
