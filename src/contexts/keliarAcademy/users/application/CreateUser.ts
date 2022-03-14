/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { UserEmail, UserName, UserPassword } from '../domain/UserValueObjects'
import { v4 } from 'uuid'
import { UserCreationParams, UserResponseModel } from '../domain/UserRequest'
import { Either, fold, getOrElse } from '../../../shared/core/Either'
import { UserFailure } from '../domain/UserFailures'

export class CreateUser {
  static async run(
    request: UserCreationParams,
    repository: UserRepository
  ): Promise<any> {
    const user = User.create(request)
    const result = await repository.save(user)
    return fold<UserFailure, User, any>(
      result,
      (err) => {
        return new Error(err)
      },
      (user: User) => {
        return user.toPrimitives()
      }
    )
  }
}
