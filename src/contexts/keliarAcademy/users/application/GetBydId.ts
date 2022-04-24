/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { UserRepository } from '../domain/UserRepository'
import { UserResponseModel } from '../domain/UserRequest'

export class GetById {
  static async run(
    id: UniqueId,
    repository: UserRepository
  ): Promise<UserResponseModel> {
    const result = await repository.searchById(id.get())
    return fold(
      result,
      (error) => {
        throw new Error(error)
      },
      (user) => user.toPrimitives()
    )
  }
}
