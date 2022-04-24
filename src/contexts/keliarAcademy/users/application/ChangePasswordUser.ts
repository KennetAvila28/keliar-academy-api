import { fold } from '../../../shared/core/Either';
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { UserRepository } from '../domain/UserRepository'
import { UserPasswordUpdateParams } from '../domain/UserRequest';
import { UserPassword } from '../domain/UserValueObjects'

export class ChangePasswordUser {
  static async run(
    id: UniqueId,
    request: UserPasswordUpdateParams,
    repository: UserRepository
  ): Promise<void> {
    const password = new UserPassword(request.password)
    if (!password.isValid()) throw new Error('INVALID_PASSWORD')
    const result = await repository.changePassword(id.get(), request.password)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (user) => {}
    )
  }
}
