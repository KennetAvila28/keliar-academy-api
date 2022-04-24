/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { UserFilterRequest } from '../domain/UserFilterRequest'
import { UserRepository } from '../domain/UserRepository'
import { UserResponseModel } from '../domain/UserRequest'

export class GetArchivedUsers {
  static async run(
    filter: UserFilterRequest,
    repository: UserRepository
  ): Promise<UserResponseModel[]> {
    const result = await repository.getArchived(filter)
    return fold(
      result,
      (error) => {
        throw new Error(error)
      },
      (user) => user.map((u) => u.toPrimitives())
    )
  }
}
