/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { UserEmail, UserName, UserPassword } from '../domain/UserValueObjects'
import { v4 } from 'uuid'
import { UserUpdateParams } from '../domain/UserRequest'
import { Either, fold, getOrElse } from '../../../shared/core/Either'
import { UserFailure } from '../domain/UserFailures'

export class UpdatedUser {
  static async run(
    id:string,
    request: UserUpdateParams,
    repository: UserRepository
  ): Promise<any> {
   
    const result = await repository.update(new UniqueId(id),request);
    return fold<UserFailure, User, any>(
      result,
      (err) => {
        return new Error(err);
      },
      (user: User) => {
        return user.toPrimitives();
      }
    );
  }
}
