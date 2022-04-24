/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { UserEmail, UserPassword } from '../domain/UserValueObjects'
import { v4 } from 'uuid'
import { UserCreationParams } from '../domain/UserRequest'
import { fold, getOrElse } from '../../../shared/core/Either'
import { UserFailure } from '../domain/UserFailures'

export class CreateUser {
  static async run(
    request: UserCreationParams,
    repository: UserRepository
  ): Promise<any> {
    const user = User.create(
      new UniqueId(v4()),
      new UserEmail(request.email),
      new UserPassword(request.password),
      request.names,
      request.lastNames,
      request.phone,
      request.photo,
      request.roles
    )
    const _user = getOrElse(user, (err) => {
      throw new Error(err)
    })
    const result = await repository.save(_user)
    return fold<UserFailure, User, any>(
      result,
      (err) => {
        throw new Error(err)
      },
      (user: User) => {
        return user.toPrimitives()
      }
    )
  }
}
