import { fold } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { UserRepository } from '../domain/UserRepository'
import { UserActiveParams } from '../domain/UserRequest'

export class SetActiveUser {
  static async run(
    id: UniqueId,
    request: UserActiveParams,
    repository: UserRepository
  ): Promise<void> {
    const result = await repository.changeState(id.get(), request.isActive)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (user) => {}
    )
  }
}
