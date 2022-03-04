/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { UserEmail, UserName, UserPassword } from '../domain/UserValueObjects'
import { v4 } from 'uuid'
import { UserCreationParams } from '../domain/UserRequest'
import { fold } from '../../../shared/core/Either'

export class CreateUser {
  static async run(
    request: UserCreationParams,
    repository: UserRepository
  ): Promise<void> {
    const user = User.create(
      new UniqueId(v4()),
      new UserName(request.names),
      new UserName(request.lastNames),
      new UserEmail(request.email),
      new UserPassword(request.password)
    )
    const result = await repository.save(user)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (user) => {}
    )
  }
}
