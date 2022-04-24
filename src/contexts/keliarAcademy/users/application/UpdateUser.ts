/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { UserRepository } from '../domain/UserRepository'
import { UserUpdateParams } from '../domain/UserRequest'
export class UpdatedUser {
  static async run(
    id: UniqueId,
    request: UserUpdateParams,
    repository: UserRepository
  ): Promise<void> {
    const result = await repository.update(id.get(), request)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (user) => {}
    )
  }
}
